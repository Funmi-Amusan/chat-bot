
export interface Cache<T> {
    get(key: string): T | null;
    set(key: string, value: T): void;
    clear(key?: string): void;
    clearByPrefix(prefix: string): void;
}

export class MemoryCache<T> implements Cache<T> {
    private data: Map<string, T>;
    private timestamps: Map<string, number>;
    private CACHE_TTL: number;

    constructor(ttl: number = 5 * 60 * 1000) {
        this.data = new Map();
        this.timestamps = new Map();
        this.CACHE_TTL = ttl;
    }

    get(key: string): T | null {
        const timestamp = this.timestamps.get(key);
        if (!timestamp) return null;

        if (Date.now() - timestamp > this.CACHE_TTL) {
            this.data.delete(key);
            this.timestamps.delete(key);
            return null;
        }

        return this.data.get(key) || null;
    }

    set(key: string, value: T): void {
        this.data.set(key, value);
        this.timestamps.set(key, Date.now());
    }

    clear(key?: string): void {
        if (key) {
            this.data.delete(key);
            this.timestamps.delete(key);
        } else {
            this.data.clear();
            this.timestamps.clear();
        }
    }

    clearByPrefix(prefix: string): void {
        const keysToDelete: string[] = [];

        this.data.forEach((_, key) => {
            if (key.startsWith(prefix)) {
                keysToDelete.push(key);
            }
        });

        keysToDelete.forEach(key => {
            this.data.delete(key);
            this.timestamps.delete(key);
        });

        if (keysToDelete.length > 0) {
            console.log(`[CACHE] Cleared ${keysToDelete.length} entries with prefix '${prefix}'`);
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const conversationCache = new MemoryCache<any>();