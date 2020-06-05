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
import { APIChannelData, APIMessageData } from '@klasa/dapi-types/dist';
import { unpackRedisObject } from '../utils';
import { PartialMessageUpdateData } from '../lib/types/PartialData';
import * as RedisConstants from '../constants/redis';

export async function getMessage(redis: Redis, channelId: string, messageId: string): Promise<APIMessageData | null> {
	const cachedMessageString = await redis.get(RedisConstants.GetCacheChannelMessageKey(channelId, messageId));
	if (!cachedMessageString) return null;
	return unpackRedisObject<APIMessageData>(cachedMessageString);
}

export async function updateChannel(redis: Redis, channel: APIChannelData) {
	const payload = JSON.stringify(channel);
	await redis.hset(RedisConstants.GetCacheChannelHashmapKey(), channel.id, payload);
}

export async function updateMessage(redis: Redis, message: APIMessageData) {
	const payload = JSON.stringify(message);
	await redis.setex(RedisConstants.GetCacheChannelMessageKey(message.channel_id, message.id), RedisConstants.CacheChannelMessageTTL, payload);
}

export async function refreshMessage(redis: Redis, channelId: string, messageId: string) {
	await redis.expire(RedisConstants.GetCacheChannelMessageKey(channelId, messageId), RedisConstants.CacheChannelMessageTTL);
}

/**
 * Returns boolean indicating whether the message was patched successfully.
*/
export async function patchMessage(redis: Redis, message: PartialMessageUpdateData): Promise<boolean> {
	const cachedMessage = await getMessage(redis, message.channel_id, message.id);
	if (!cachedMessage) return false;
	const patchedMessage = { ...cachedMessage, ...message };
	await updateMessage(redis, patchedMessage);
	return true;
}
