import { MessageStore, fetchDBConfig } from './index';

async function main(): Promise<void> {
  console.log('Starting example...');

  const dbConfig = await fetchDBConfig();

  const store = new MessageStore({
    client: 'pg',
    connection: {
      host: dbConfig.dbHost,
      port: dbConfig.dbPort,
      database: dbConfig.dbName,
      user: dbConfig.dbUser,
      password: dbConfig.dbPassword,
    },
  });

  const id = await store.insert('example', 'Hello, TypeScript!');
  console.log('Inserted message with ID:', id);

  const message = await store.findById(id);
  console.log('Retrieved message:', message);

  await store.destroy();
  console.log('Example completed successfully!');
}

main().catch((error: Error) => {
  console.error('Example failed:', error);
  process.exit(1);
});
