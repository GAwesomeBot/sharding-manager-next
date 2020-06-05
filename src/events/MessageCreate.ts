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

import { WebSocketEvents, MessageCreateDispatch } from '@klasa/ws';
import { EventHandler } from '../lib/structures/EventHandler';
import { MessageCreateMessageData } from '../lib/types/Queue';
import { pushWorkerMessage } from '../services/queue';

export class MessageCreate extends EventHandler {

	public constructor() {
		super(WebSocketEvents.MessageCreate);
	}

	public async handler(data: MessageCreateDispatch): Promise<void> {
		if (!data.d.guild_id) return;
		await this.pushMessage(data.shard_id, data.d.guild_id);
	}

	private async pushMessage(shard: number, guildId: string) {
		await pushWorkerMessage<MessageCreateMessageData>(
			this.redis,
			WebSocketEvents.MessageCreate,
			shard,
			{
				guild_id: guildId,
			},
		);
	}

}
