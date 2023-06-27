import { emitterCallback } from '../types/functions';
import { gameState } from '../types/types';

export class EventEmitter {
  private static instance: EventEmitter;
  events!: Record<string, emitterCallback[]>;

  constructor() {
    if (typeof EventEmitter.instance === 'object') {
      return EventEmitter.instance;
    } else {
      this.events = {};
      EventEmitter.instance = this;
      return this;
    }
  }

  subscribe(name: string, func: emitterCallback) {
    if (!this.events[name]) {
      this.events[name] = [];
    }

    this.events[name].push(func);
  }

  emit(name: string, data: gameState | number | null) {
    const event = this.events[name];
    if (event) {
      event.forEach((func: emitterCallback) => {
        func(data);
      });
    }
  }
}
