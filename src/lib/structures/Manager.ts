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
import { WebSocketManager, WebSocketManagerEvents, Intents } from '@klasa/ws';
import { REST } from '@klasa/rest';
import { RedisLock } from './RedisLock';
import { ManagerConfig } from '../types/ManagerConfig';
import { ShardIdentifyLockKey } from '../../constants/redis';

export class Manager extends WebSocketManager {

	public config: ManagerConfig;
	public id: number;
	public redis: Redis;
	public identifyLock: RedisLock;

	public constructor(config: ManagerConfig, redis: Redis) {
		const rest = new REST({
			userAgentAppendix: 'GAwesomeBot',
		});
		super(rest, {
			totalShards: config.totalShards,
			shards: config.shards,
			intents: Intents.DEFAULT_WITH_MEMBERS,
		});

		this.config = config;
		this.redis = redis;
		this.identifyLock = new RedisLock(this.redis, ShardIdentifyLockKey);

		this.id = this.config.managerId;
		this.token = this.config.token;
		this.on(WebSocketManagerEvents.Debug, console.log);
		this.on(WebSocketManagerEvents.Error, console.log);
	}

	public async spawn() {
		console.log('attempting persistent lock');
		await this.identifyLock.persistentLock();
		console.log('spawning shards');
		await super.spawn();
		console.log('releasing lock');
		await this.identifyLock.release();
	}

}
