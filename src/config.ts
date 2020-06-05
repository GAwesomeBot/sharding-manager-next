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

import { Config } from './lib/types/Config';
import { getShardConfig, getShardManagerId } from './utils';

const totalShards = Number(process.env.TOTAL_SHARDS);
const totalManagers = Number(process.env.TOTAL_MANAGERS);
const managerId = getShardManagerId() || 0;
const token = process.env.DISCORD_TOKEN;

if (!token) throw new Error('Missing Discord token.');

export const config: Config = {
	manager: {
		totalShards,
		totalManagers,
		managerId,
		shards: getShardConfig(totalShards, totalManagers, managerId),
		token,
	},
	redis: {},
};
