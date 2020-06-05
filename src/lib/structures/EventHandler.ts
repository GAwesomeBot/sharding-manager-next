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

import { Manager } from './Manager';
import { WebSocketEvents } from '@klasa/ws';
import * as Types from '@klasa/ws/dist/src/types/InternalWebSocket';

export abstract class EventHandler {

	public manager: Manager | null;
	public event: WebSocketEvents;

	protected constructor(event: WebSocketEvents) {
		this.manager = null;
		this.event = event;
	}

	abstract async handler(data: Types.DispatchPayload | string | Error): Promise<void>;

	public listen(manager: Manager) {
		this.manager = manager;
		this.manager.on(this.event, this.handler.bind(this));
	}

	public get redis() {
		if (!this.manager) throw Error('Must call listen first.');
		return this.manager.redis;
	}

}
