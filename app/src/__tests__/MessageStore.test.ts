import { MessageStore } from '../MessageStore';
import { fetchDBConfig } from '../utils/dbConfig';
import { KnexConfig } from '../types';

describe('MessageStore', () => {
  let store: MessageStore;
  let config: KnexConfig;

  beforeAll(async () => {
    const dbConfig = await fetchDBConfig();
    config = {
      client: 'pg',
      connection: {
        host: dbConfig.dbHost,
        port: dbConfig.dbPort,
        database: dbConfig.dbName,
        user: dbConfig.dbUser,
        password: dbConfig.dbPassword,
      },
    };
    store = new MessageStore(config);
  }, 10_000);

  afterAll(async () => {
    await store.destroy();
  });

  describe('insert', () => {
    it('should insert a row and return a UUID', async () => {
      const now = new Date().toISOString();
      const id = await store.insert('unit-test', `Hello, world! ${now}`);

      expect(id).toBeDefined();
      expect(typeof id).toBe('string');
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

      console.log('Inserted message with id:', id);
    });

    it('should insert multiple messages with unique IDs', async () => {
      const id1 = await store.insert('test-1', 'First message');
      const id2 = await store.insert('test-2', 'Second message');

      expect(id1).not.toBe(id2);
    });

    it('should handle special characters in text', async () => {
      const specialText = 'Message with \'quotes\' and "double quotes" and \n newlines';
      const id = await store.insert('special-test', specialText);

      expect(id).toBeDefined();
    });
  });

  describe('findById', () => {
    it('should retrieve an inserted message', async () => {
      const source = 'find-test';
      const text = 'Test message for retrieval';
      const id = await store.insert(source, text);

      const message = await store.findById(id);

      expect(message).toBeDefined();
      expect(message?.id).toBe(id);
      expect(message?.source).toBe(source);
      expect(message?.text).toBe(text);
    });

    it('should return undefined for non-existent ID', async () => {
      const message = await store.findById('00000000-0000-0000-0000-000000000000');

      expect(message).toBeUndefined();
    });
  });

  describe('error handling', () => {
    it('should handle empty source', async () => {
      const id = await store.insert('', 'Message with empty source');

      expect(id).toBeDefined();
    });

    it('should handle empty text', async () => {
      const id = await store.insert('empty-text-test', '');

      expect(id).toBeDefined();
    });
  });
});
