"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStore = void 0;
const crypto_1 = __importDefault(require("crypto"));
const knex_1 = __importDefault(require("knex"));
const TABLE_NAME = 'test_messages';
class MessageStore {
    db;
    constructor(config) {
        this.db = (0, knex_1.default)(config);
    }
    async insert(source, text) {
        if (!source || source.trim().length === 0) {
            throw new Error('Source cannot be empty');
        }
        if (!text || text.trim().length === 0) {
            throw new Error('Text cannot be empty');
        }
        const id = crypto_1.default.randomUUID();
        await this.db(TABLE_NAME).insert({ id, source, text });
        return id;
    }
    async findById(id) {
        const rows = await this.db(TABLE_NAME).where({ id }).select('*');
        return rows.length > 0 ? rows[0] : null;
    }
    async findBySource(source) {
        return await this.db(TABLE_NAME).where({ source }).select('*');
    }
    async deleteById(id) {
        const deleted = await this.db(TABLE_NAME).where({ id }).del();
        return deleted > 0;
    }
    async destroy() {
        await this.db.destroy();
    }
}
exports.MessageStore = MessageStore;
//# sourceMappingURL=MessageStore.js.map