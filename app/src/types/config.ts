export interface DatabaseConfig {
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUser: string;
  dbPassword: string;
}

export interface KnexConfig {
  client: string;
  connection: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
}
