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

import { config } from './config';
import events from './events';
import { Manager } from './lib/structures/Manager';
import IORedis from 'ioredis';

const redis = new IORedis(config.redis);

const manager = new Manager(config.manager, redis);

for (const event of events) {
	event.listen(manager);
}
manager.spawn().then(() => {
	console.log('connected to discord');
}).catch(err => {
	console.error(err);
	process.exit(1);
});
