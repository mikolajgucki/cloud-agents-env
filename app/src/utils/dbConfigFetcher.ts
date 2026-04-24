import fs from 'fs';
import path from 'path';
import { DatabaseConfig } from '../types';

export class DbConfigFetcher {
  private static readonly TMP_CONFIG_PATH = path.join(__dirname, '..', '..', '_tmp_cfg.json');

  static async fetch(): Promise<DatabaseConfig> {
    if (fs.existsSync(this.TMP_CONFIG_PATH)) {
      console.log('Using existing config from', this.TMP_CONFIG_PATH);
      const existingConfig = fs.readFileSync(this.TMP_CONFIG_PATH, 'utf8');
      return JSON.parse(existingConfig) as DatabaseConfig;
    }

    console.log('Fetching config from the server');
    const authToken = process.env.AUTH_TOKEN;
    if (!authToken) {
      throw new Error('AUTH_TOKEN environment variable is required');
    }

    const allocateUrl = process.env.ALLOCATE_URL;
    if (!allocateUrl) {
      throw new Error('ALLOCATE_URL environment variable is required');
    }

    const response = await fetch(allocateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`Failed to allocate resource: ${response.statusText}`);
    }

    const config = (await response.json()) as DatabaseConfig;
    fs.writeFileSync(this.TMP_CONFIG_PATH, JSON.stringify(config, null, 2));

    return config;
  }

  static clearCache(): void {
    if (fs.existsSync(this.TMP_CONFIG_PATH)) {
      fs.unlinkSync(this.TMP_CONFIG_PATH);
    }
  }
}
