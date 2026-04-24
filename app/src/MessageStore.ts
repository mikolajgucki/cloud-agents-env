import crypto from 'crypto';
import knex, { Knex } from 'knex';

const TABLE_NAME = 'test_messages';

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
    if (!source || source.trim().length === 0) {
      throw new Error('Source cannot be empty');
    }
    if (!text || text.trim().length === 0) {
      throw new Error('Text cannot be empty');
    }

    const id = crypto.randomUUID();
    await this.db(TABLE_NAME).insert({ id, source, text });
    return id;
  }

  async findById(id: string): Promise<Message | null> {
    const rows = await this.db<Message>(TABLE_NAME).where({ id }).select('*');
    return rows.length > 0 ? rows[0] : null;
  }

  async findBySource(source: string): Promise<Message[]> {
    return await this.db<Message>(TABLE_NAME).where({ source }).select('*');
  }

  async deleteById(id: string): Promise<boolean> {
    const deleted = await this.db(TABLE_NAME).where({ id }).del();
    return deleted > 0;
  }

  async destroy(): Promise<void> {
    await this.db.destroy();
  }
}
