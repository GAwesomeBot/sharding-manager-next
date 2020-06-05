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
import { sleep } from '../../utils/sleep';

export class RedisLock {

	private redis: Redis;
	private readonly key: string;

	public constructor(redis: Redis, key: string) {
		this.redis = redis;
		this.key = key;
	}

	/**
	 * Persistently attempt to lock this RedisLock.
	 */
	public async persistentLock(): Promise<void> {
		if (await this.lock()) return;
		await sleep(1000);
		return this.persistentLock();
	}

	/**
	 * Attempt to lock this RedisLock.
	 */
	public async lock(): Promise<boolean> {
		const result = await this.redis.getset(this.key, 1);
		return result === '0';
	}

	public async release() {
		await this.redis.set(this.key, 0);
	}

}
