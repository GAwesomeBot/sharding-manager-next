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

import { WebSocketEvents } from '@klasa/ws';

export interface GenericWorkerMessageData {
	id?: string;
}
export interface WorkerMessage<D extends GenericWorkerMessageData> {
	event: WebSocketEvents;
	shard: number;
	data: D;
}

export interface GuildCreateMessageData extends GenericWorkerMessageData {
	id?: string;
	guild_id: string;
}

export interface MessageCreateMessageData extends GenericWorkerMessageData {
	id?: string;
	guild_id: string;
}
