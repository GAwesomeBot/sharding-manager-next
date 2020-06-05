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
import { APIGuildData, APIGuildMemberData, APIRoleData, APIEmojiData } from '@klasa/dapi-types/dist';
import * as RedisConstants from '../constants/redis';

export async function addUnavailableGuilds(redis: Redis, unavailableGuildIds: string[]) {
	await redis.sadd(RedisConstants.StateUnavailableGuildsSetKey, unavailableGuildIds);
}

export async function makeGuildAvailable(redis: Redis, guildId: string) {
	return redis.srem(RedisConstants.StateUnavailableGuildsSetKey, guildId);
}

export async function updateGuild(redis: Redis, guild: APIGuildData) {
	const payload = JSON.stringify(guild);
	await redis.hset(RedisConstants.GetCacheGuildHashmapKey(), guild.id, payload);
}

export async function resetRoles(redis: Redis, guild: APIGuildData) {
	await redis.del(RedisConstants.GetCacheGuildRolesHashmapKey(guild.id));
}

export async function updateRole(redis: Redis, guild: APIGuildData, role: APIRoleData) {
	const payload = JSON.stringify(role);
	await redis.hset(RedisConstants.GetCacheGuildRolesHashmapKey(guild.id), role.id, payload);
}

export async function resetMembers(redis: Redis, guild: APIGuildData) {
	await redis.del(RedisConstants.GetCacheGuildMembersHashmapKey(guild.id));
}

export async function updateMember(redis: Redis, guild: APIGuildData, member: APIGuildMemberData) {
	if (!member.user) return;
	const payload = JSON.stringify(member);
	await redis.hset(RedisConstants.GetCacheGuildMembersHashmapKey(guild.id), member.user.id, payload);
}

export async function bulkUpdateMembers(redis: Redis, guildId: string, members: APIGuildMemberData[]) {
	const payload: string[] = [];
	for (const member of members) {
		if (!member.user) continue;
		payload.push(member.user.id, JSON.stringify(member));
	}
	await redis.hmset(RedisConstants.GetCacheGuildMembersHashmapKey(guildId), payload);
}

export async function resetEmojis(redis: Redis, guild: APIGuildData) {
	await redis.del(RedisConstants.GetCacheGuildEmojisHashmapKey(guild.id));
}

export async function updateEmoji(redis: Redis, guild: APIGuildData, emoji: APIEmojiData) {
	if (!emoji.id) return;
	const payload = JSON.stringify(emoji);
	await redis.hset(RedisConstants.GetCacheGuildEmojisHashmapKey(guild.id), emoji.id, payload);
}
