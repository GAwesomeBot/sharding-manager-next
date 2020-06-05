/*
 * GAwesomeBot - Simple, Awesome Discord Bot
 * Copyright (C) 2020  GAwesomeBot Team
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

import { WebSocketEvents, GuildCreateDispatch, RequestGuildMembers, OpCodes } from '@klasa/ws';
import { APIGuildData, APIRoleData, APIEmojiData, APIGuildMemberData, APIChannelData } from '@klasa/dapi-types';
import { EventHandler } from '../lib/structures/EventHandler';
import {
	makeGuildAvailable, updateGuild,
	updateEmoji, updateMember, updateRole,
	resetEmojis, resetMembers, resetRoles,
} from '../services/guild';
import { updateChannel } from '../services/channel';
import { pushWorkerMessage } from '../services/queue';

export class GuildCreate extends EventHandler {

	public constructor() {
		super(WebSocketEvents.GuildCreate);
	}

	public async handler(data: GuildCreateDispatch): Promise<void> {
		const unavailable = await makeGuildAvailable(this.redis, data.d.id);
		await this.saveGuild(data.d);
		await this.requestGuildMembers(data);
		if (!unavailable) await this.pushMessage(data);
	}

	private async pushMessage(data: GuildCreateDispatch) {
		await pushWorkerMessage<APIGuildData>(
			this.redis,
			WebSocketEvents.GuildCreate,
			data.shard_id,
			data.d,
		);
	}

	private async requestGuildMembers(data: GuildCreateDispatch) {
		const request: RequestGuildMembers = {
			op: OpCodes.REQUEST_GUILD_MEMBERS,
			d: {
				guild_id: data.d.id,
				limit: 0,
				query: '',
			},
		};

		const shard = this.manager?.shards.get(data.shard_id);
		if (!shard) throw new Error('Unknown shard from GUILD_CREATE dispatch');
		await shard.send(request);
	}

	private async saveGuild(guild: APIGuildData) {
		const { roles, emojis, members, channels } = guild;
		delete guild.roles;
		delete guild.channels;
		delete guild.emojis;
		delete guild.members;

		await updateGuild(this.redis, guild);
		await this.saveRoles(guild, roles);
		await this.saveMembers(guild, members || []);
		await this.saveEmojis(guild, emojis);
		await this.updateChannels(guild, channels || []);
	}

	private async saveRoles(guild: APIGuildData, roles: APIRoleData[]) {
		await resetRoles(this.redis, guild);
		const promises = roles.map(role => updateRole(this.redis, guild, role));
		await Promise.all(promises);
	}

	private async saveMembers(guild: APIGuildData, members: APIGuildMemberData[]) {
		await resetMembers(this.redis, guild);
		const promises = members.map(member => updateMember(this.redis, guild, member));
		await Promise.all(promises);
	}

	private async saveEmojis(guild: APIGuildData, emojis: APIEmojiData[]) {
		await resetEmojis(this.redis, guild);
		const promises = emojis.map(emoji => updateEmoji(this.redis, guild, emoji));
		await Promise.all(promises);
	}

	private async updateChannels(guild: APIGuildData, channels: APIChannelData[]) {
		const promises = channels.map(channel => {
			if (!channel.guild_id) channel.guild_id = guild.id;
			return updateChannel(this.redis, channel);
		});
		await Promise.all(promises);
	}

}
