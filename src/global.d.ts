export {};

declare global {
    interface Cookie {
        domain:      string | null;
        expires:     Date | null;
        name:        string;
        partitioned: boolean;
        path:        string;
        sameSite:    'strict' | 'lax' | 'none';
        secure:      boolean;
        value:       string;
    }

    interface CookieDeleteOptions {
        name:         string;
        domain?:      string;
        path?:        string;
        partitioned?: boolean;
    }

    interface CookieGetOptions {
        name: string;
        url:  string;
    }

    interface CookieSetOptions {
        domain?:      string | null;
        expires?:     Date | null;
        name:         string;
        partitioned?: boolean;
        path?:        string;
        sameSite?:    'strict' | 'lax' | 'none';
        value:        string;
    }
    
    interface CookieStore {
        delete (name: string): Promise<void>;
        delete (options: CookieDeleteOptions): Promise<void>;
        get    (name: string): Promise<Cookie | null>;
        get    (options: CookieGetOptions): Promise<Cookie | null>;
        getAll (): Promise<Cookie[]>;
        getAll (name: string): Promise<Cookie[]>;
        getAll (options: CookieGetOptions): Promise<Cookie[]>;
        set    (name: string, value: string): Promise<void>;
        set    (options: CookieSetOptions): Promise<void>;
    }

    interface Window {
        cookieStore: CookieStore;
    }
}