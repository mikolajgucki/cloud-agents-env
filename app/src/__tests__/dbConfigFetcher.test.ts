import fs from 'fs';
import path from 'path';
import { DbConfigFetcher } from '../utils/dbConfigFetcher';

global.fetch = jest.fn();

describe('DbConfigFetcher', () => {
  const tmpConfigPath = path.join(__dirname, '..', '..', '_tmp_cfg.json');
  const mockConfig = {
    dbHost: 'localhost',
    dbPort: 5432,
    dbName: 'testdb',
    dbUser: 'testuser',
    dbPassword: 'testpass',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    if (fs.existsSync(tmpConfigPath)) {
      fs.unlinkSync(tmpConfigPath);
    }
  });

  afterEach(() => {
    if (fs.existsSync(tmpConfigPath)) {
      fs.unlinkSync(tmpConfigPath);
    }
  });

  describe('fetch', () => {
    it('should return cached config when file exists', async () => {
      fs.writeFileSync(tmpConfigPath, JSON.stringify(mockConfig));

      const config = await DbConfigFetcher.fetch();

      expect(config).toEqual(mockConfig);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should fetch from server when cache does not exist', async () => {
      process.env.AUTH_TOKEN = 'test-token';
      process.env.ALLOCATE_URL = 'http://example.com/allocate';

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockConfig),
      });

      const config = await DbConfigFetcher.fetch();

      expect(config).toEqual(mockConfig);
      expect(global.fetch).toHaveBeenCalledWith('http://example.com/allocate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': 'test-token',
        },
        body: JSON.stringify({}),
      });

      expect(fs.existsSync(tmpConfigPath)).toBe(true);
      const cachedConfig = JSON.parse(fs.readFileSync(tmpConfigPath, 'utf8')) as typeof mockConfig;
      expect(cachedConfig).toEqual(mockConfig);
    });

    it('should throw error when AUTH_TOKEN is not set', async () => {
      delete process.env.AUTH_TOKEN;

      await expect(DbConfigFetcher.fetch()).rejects.toThrow(
        'AUTH_TOKEN environment variable is required',
      );
    });

    it('should throw error when ALLOCATE_URL is not set', async () => {
      process.env.AUTH_TOKEN = 'test-token';
      delete process.env.ALLOCATE_URL;

      await expect(DbConfigFetcher.fetch()).rejects.toThrow(
        'ALLOCATE_URL environment variable is required',
      );
    });

    it('should throw error when fetch fails', async () => {
      process.env.AUTH_TOKEN = 'test-token';
      process.env.ALLOCATE_URL = 'http://example.com/allocate';

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        statusText: 'Internal Server Error',
      });

      await expect(DbConfigFetcher.fetch()).rejects.toThrow(
        'Failed to allocate resource: Internal Server Error',
      );
    });
  });

  describe('clearCache', () => {
    it('should delete cache file when it exists', () => {
      fs.writeFileSync(tmpConfigPath, JSON.stringify(mockConfig));
      expect(fs.existsSync(tmpConfigPath)).toBe(true);

      DbConfigFetcher.clearCache();

      expect(fs.existsSync(tmpConfigPath)).toBe(false);
    });

    it('should not throw error when cache file does not exist', () => {
      expect(fs.existsSync(tmpConfigPath)).toBe(false);

      expect(() => DbConfigFetcher.clearCache()).not.toThrow();
    });
  });
});
