const crypto = require("crypto");
const knex = require("knex");

const TABLE_NAME = "test_messages";

class MessageStore {
  constructor(config) {
    this.db = knex(config);
  }

  async insert(source, text) {
    const id = crypto.randomUUID();
    await this.db(TABLE_NAME).insert({ id, source, text });
    return id;
  }

  async destroy() {
    await this.db.destroy();
  }
}

module.exports = MessageStore;
