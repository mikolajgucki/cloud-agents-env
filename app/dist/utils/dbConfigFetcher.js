"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConfigFetcher = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class DbConfigFetcher {
    static TMP_CONFIG_PATH = path_1.default.join(__dirname, '..', '..', '_tmp_cfg.json');
    static async fetch() {
        if (fs_1.default.existsSync(this.TMP_CONFIG_PATH)) {
            console.log('Using existing config from', this.TMP_CONFIG_PATH);
            const existingConfig = fs_1.default.readFileSync(this.TMP_CONFIG_PATH, 'utf8');
            return JSON.parse(existingConfig);
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
        const config = (await response.json());
        fs_1.default.writeFileSync(this.TMP_CONFIG_PATH, JSON.stringify(config, null, 2));
        return config;
    }
    static clearCache() {
        if (fs_1.default.existsSync(this.TMP_CONFIG_PATH)) {
            fs_1.default.unlinkSync(this.TMP_CONFIG_PATH);
        }
    }
}
exports.DbConfigFetcher = DbConfigFetcher;
//# sourceMappingURL=dbConfigFetcher.js.map