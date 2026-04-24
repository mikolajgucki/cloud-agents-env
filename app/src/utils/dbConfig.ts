import fs from 'fs';
import path from 'path';
import { DatabaseConfig } from '../types';

export async function fetchDBConfig(): Promise<DatabaseConfig> {
  const tmpCfgPath = path.join(__dirname, '..', '..', '_tmp_cfg.json');

  if (fs.existsSync(tmpCfgPath)) {
    console.log('Using existing config from', tmpCfgPath);
    const existingConfig = fs.readFileSync(tmpCfgPath, 'utf8');
    return JSON.parse(existingConfig) as DatabaseConfig;
  }

  console.log('Fetching config from the server');
  const authToken = process.env.AUTH_TOKEN;
  const allocateUrl = process.env.ALLOCATE_URL;

  if (!authToken) {
    throw new Error('AUTH_TOKEN environment variable is not set');
  }

  if (!allocateUrl) {
    throw new Error('ALLOCATE_URL environment variable is not set');
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
  fs.writeFileSync(tmpCfgPath, JSON.stringify(config, null, 2));

  return config;
}
