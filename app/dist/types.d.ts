export interface DatabaseConfig {
    dbHost: string;
    dbPort: number;
    dbName: string;
    dbUser: string;
    dbPassword: string;
}
export interface AllocateResponse extends DatabaseConfig {
    [key: string]: unknown;
}
//# sourceMappingURL=types.d.ts.map