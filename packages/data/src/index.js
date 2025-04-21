"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.testDb = void 0;
exports.createDb = createDb;
const libsql_1 = require("drizzle-orm/libsql");
const client_1 = require("@libsql/client");
const schema = __importStar(require("./schema"));
exports.schema = schema;
// Create a libsql client
function createDb(dbUrl = 'file:data.db', authToken) {
    const client = (0, client_1.createClient)({ url: dbUrl, authToken });
    // Enable WAL mode (Write Ahead Logging) for better concurrency
    client.execute('PRAGMA journal_mode = WAL');
    client.execute('PRAGMA synchronous = NORMAL');
    client.execute('PRAGMA foreign_keys = ON');
    const db = (0, libsql_1.drizzle)(client, { schema });
    // Expose client for direct SQL execution
    return Object.assign(db, { client });
}
// Export a memory DB instance for tests
exports.testDb = createDb('file::memory:');
//# sourceMappingURL=index.js.map