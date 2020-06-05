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

import { WebSocketEvents, MessageUpdateDispatch } from '@klasa/ws';
import { EventHandler } from '../lib/structures/EventHandler';
import { pushWorkerMessage } from '../services/queue';
import { patchMessage } from '../services/channel';
import { PartialMessageUpdateData } from '../lib/types/PartialData';

export class MessageUpdate extends EventHandler {

	public constructor() {
		super(WebSocketEvents.MessageUpdate);
	}

	public async handler(data: MessageUpdateDispatch): Promise<void> {
		await this.patchMessage(data.d);
		await this.pushMessage(data.shard_id, data.d);
	}

	private async patchMessage(message: PartialMessageUpdateData) {
		await patchMessage(this.redis, message);
	}

	private async pushMessage(shard: number, message: PartialMessageUpdateData) {
		await pushWorkerMessage<PartialMessageUpdateData>(
			this.redis,
			WebSocketEvents.MessageUpdate,
			shard,
			message,
		);
	}

}
