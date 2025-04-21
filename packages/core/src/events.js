"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventBus = exports.EventEmitter = exports.ChatMessageEventSchema = void 0;
const types_1 = require("./types");
// Chat message event
exports.ChatMessageEventSchema = types_1.ChatMessageSchema;
// Simple in-memory event emitter
class EventEmitter {
    handlers = new Map();
    on(subject, handler) {
        if (!this.handlers.has(subject)) {
            this.handlers.set(subject, []);
        }
        this.handlers.get(subject)?.push(handler);
        // Return unsubscribe function
        return () => {
            const handlers = this.handlers.get(subject);
            if (handlers) {
                const index = handlers.indexOf(handler);
                if (index !== -1) {
                    handlers.splice(index, 1);
                }
            }
        };
    }
    emit(subject, payload) {
        const event = {
            subject,
            payload,
            ts: Date.now(),
        };
        // Call all handlers for this subject
        this.handlers.get(subject)?.forEach(handler => handler(event));
        // Also call wildcard handlers
        this.handlers.get('*')?.forEach(handler => handler(event));
    }
}
exports.EventEmitter = EventEmitter;
// Default singleton instance
exports.eventBus = new EventEmitter();
//# sourceMappingURL=events.js.map