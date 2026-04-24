import { MessageStore } from '../MessageStore';
import { DbConfigFetcher } from '../utils/dbConfigFetcher';

describe('MessageStore', () => {
  let store: MessageStore;

  beforeAll(async () => {
    const dbConfig = await DbConfigFetcher.fetch();
    store = new MessageStore({
      client: 'pg',
      connection: {
        host: dbConfig.dbHost,
        port: dbConfig.dbPort,
        database: dbConfig.dbName,
        user: dbConfig.dbUser,
        password: dbConfig.dbPassword,
      },
    });
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

      const message = await store.findById(id);
      expect(message).not.toBeNull();
      expect(message?.id).toBe(id);
      expect(message?.source).toBe('unit-test');
      expect(message?.text).toBe(`Hello, world! ${now}`);

      await store.deleteById(id);
    });

    it('should throw error when source is empty', async () => {
      await expect(store.insert('', 'Some text')).rejects.toThrow('Source cannot be empty');
    });

    it('should throw error when source is whitespace only', async () => {
      await expect(store.insert('   ', 'Some text')).rejects.toThrow('Source cannot be empty');
    });

    it('should throw error when text is empty', async () => {
      await expect(store.insert('test-source', '')).rejects.toThrow('Text cannot be empty');
    });

    it('should throw error when text is whitespace only', async () => {
      await expect(store.insert('test-source', '   ')).rejects.toThrow('Text cannot be empty');
    });
  });

  describe('findById', () => {
    it('should return message when found', async () => {
      const id = await store.insert('test-find', 'Test message');
      const message = await store.findById(id);

      expect(message).not.toBeNull();
      expect(message?.id).toBe(id);
      expect(message?.source).toBe('test-find');
      expect(message?.text).toBe('Test message');

      await store.deleteById(id);
    });

    it('should return null when message not found', async () => {
      const message = await store.findById('00000000-0000-0000-0000-000000000000');
      expect(message).toBeNull();
    });
  });

  describe('findBySource', () => {
    it('should return all messages from a source', async () => {
      const source = `test-source-${Date.now()}`;
      const id1 = await store.insert(source, 'Message 1');
      const id2 = await store.insert(source, 'Message 2');
      const id3 = await store.insert(source, 'Message 3');

      const messages = await store.findBySource(source);

      expect(messages).toHaveLength(3);
      expect(messages.map((m) => m.id)).toContain(id1);
      expect(messages.map((m) => m.id)).toContain(id2);
      expect(messages.map((m) => m.id)).toContain(id3);

      await store.deleteById(id1);
      await store.deleteById(id2);
      await store.deleteById(id3);
    });

    it('should return empty array when no messages found', async () => {
      const messages = await store.findBySource('non-existent-source');
      expect(messages).toEqual([]);
    });
  });

  describe('deleteById', () => {
    it('should delete message and return true', async () => {
      const id = await store.insert('test-delete', 'To be deleted');
      const deleted = await store.deleteById(id);

      expect(deleted).toBe(true);

      const message = await store.findById(id);
      expect(message).toBeNull();
    });

    it('should return false when message not found', async () => {
      const deleted = await store.deleteById('00000000-0000-0000-0000-000000000000');
      expect(deleted).toBe(false);
    });
  });

  describe('integration test', () => {
    it('should handle complete CRUD lifecycle', async () => {
      const source = `integration-test-${Date.now()}`;

      const id1 = await store.insert(source, 'First message');
      expect(id1).toBeDefined();

      const id2 = await store.insert(source, 'Second message');
      expect(id2).toBeDefined();

      let messages = await store.findBySource(source);
      expect(messages).toHaveLength(2);

      const message = await store.findById(id1);
      expect(message?.text).toBe('First message');

      const deleted = await store.deleteById(id1);
      expect(deleted).toBe(true);

      messages = await store.findBySource(source);
      expect(messages).toHaveLength(1);
      expect(messages[0].id).toBe(id2);

      await store.deleteById(id2);

      messages = await store.findBySource(source);
      expect(messages).toHaveLength(0);
    });
  });
});
