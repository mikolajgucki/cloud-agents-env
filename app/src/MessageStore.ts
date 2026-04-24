import crypto from "crypto";
import knex, { Knex } from "knex";

const TABLE_NAME = "test_messages";

export interface MessageStoreConfig {
  client: string;
  connection: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
}

export interface Message {
  id: string;
  source: string;
  text: string;
}

export class MessageStore {
  private db: Knex;

  constructor(config: MessageStoreConfig) {
    this.db = knex(config);
  }

  async insert(source: string, text: string): Promise<string> {
    const id = crypto.randomUUID();
    await this.db(TABLE_NAME).insert({ id, source, text });
    return id;
  }

  async destroy(): Promise<void> {
    await this.db.destroy();
  }
}
