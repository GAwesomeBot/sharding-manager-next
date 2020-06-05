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

import { Redis } from 'ioredis';
import * as RedisConstants from '../constants/redis';
import * as QueueTypes from '../lib/types/Queue';
import { WebSocketEvents } from '@klasa/ws';

export async function pushWorkerMessage<D extends QueueTypes.GenericWorkerMessageData>(redis: Redis, event: WebSocketEvents, shard: number, data: D): Promise<void> {
	const message: QueueTypes.WorkerMessage<D> = {
		event,
		shard,
		data,
	};
	const payload = JSON.stringify(message);
	await redis.lpush(RedisConstants.QueueWorkersBacklogKey, payload);
}
