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

export const enum Namespaces {
	State = 'state',
	Cache = 'cache',
	Queue = 'queue',
}

export const ShardIdentifyLockKey = `${Namespaces.State}:lock.identify`;
export const StateUnavailableGuildsSetKey = `${Namespaces.State}:unavailable_guilds`;

export const GetCacheGuildHashmapKey = () => `${Namespaces.Cache}:guilds`;
export const GetCacheGuildRolesHashmapKey = (guildId: string) => `${Namespaces.Cache}:guilds.${guildId}.roles`;
export const GetCacheGuildEmojisHashmapKey = (guildId: string) => `${Namespaces.Cache}:guilds.${guildId}.emojis`;
export const GetCacheGuildMembersHashmapKey = (guildId: string) => `${Namespaces.Cache}:guilds.${guildId}.members`;
export const GetCacheUserHashmapKey = () => `${Namespaces.Cache}:users`;
export const GetCacheChannelHashmapKey = () => `${Namespaces.Cache}:channels`;
export const GetCacheChannelMessagesHashmapKey = (channelId: string) => `${Namespaces.Cache}:channels.${channelId}.messages`;
export const GetCacheChannelMessageReactionsSetKey = (channelId: string, messageId: string) => `${Namespaces.Cache}:channels.${channelId}.messages.${messageId}.reactions`;

export const QueueWorkersBacklogKey = `${Namespaces.Queue}:workers.backlog`;
export const QueueWorkersProcessingKey = `${Namespaces.Queue}:workers.processing`;
export const QueueWSChannelKey = `${Namespaces.Queue}:ws`;
export const GetQueueShardChannelKey = (shardId: string) => `${Namespaces.Queue}:shards.${shardId}`;
