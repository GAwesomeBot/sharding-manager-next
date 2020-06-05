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

import { WebSocketEvents, GuildMembersChunkDispatch } from '@klasa/ws';
import { APIGuildMemberData } from '@klasa/dapi-types';
import { EventHandler } from '../lib/structures/EventHandler';
import { bulkUpdateMembers } from '../services/guild';
import { bulkUpdateUsers } from '../services/user';

export class GuildMembersChunk extends EventHandler {

	public constructor() {
		super(WebSocketEvents.GuildMembersChunk);
	}

	public async handler(data: GuildMembersChunkDispatch): Promise<void> {
		await this.updateMembers(data.d.guild_id, data.d.members);
	}

	private async updateMembers(guildId: string, members: APIGuildMemberData[]) {
		await bulkUpdateMembers(this.redis, guildId, members);
		await bulkUpdateUsers(this.redis, members.map(member => member.user));
	}

}
