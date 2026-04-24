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
export declare class MessageStore {
    private db;
    constructor(config: MessageStoreConfig);
    insert(source: string, text: string): Promise<string>;
    findById(id: string): Promise<Message | null>;
    findBySource(source: string): Promise<Message[]>;
    deleteById(id: string): Promise<boolean>;
    destroy(): Promise<void>;
}
//# sourceMappingURL=MessageStore.d.ts.map