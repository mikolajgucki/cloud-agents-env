import crypto from 'crypto';
import knex, { Knex } from 'knex';
import { KnexConfig } from './types';

const TABLE_NAME = 'test_messages';

export interface Message {
  id: string;
  source: string;
  text: string;
}

export class MessageStore {
  private db: Knex;

  constructor(config: KnexConfig) {
    this.db = knex(config);
  }

  async insert(source: string, text: string): Promise<string> {
    const id = crypto.randomUUID();
    await this.db(TABLE_NAME).insert({ id, source, text });
    return id;
  }

  async findById(id: string): Promise<Message | undefined> {
    const rows = await this.db<Message>(TABLE_NAME).where({ id });
    return rows[0];
  }

  async destroy(): Promise<void> {
    await this.db.destroy();
  }
}
