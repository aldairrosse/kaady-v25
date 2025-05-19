export interface Settings {
    language: 'es' | 'en';
    timezone: 'UTC' | 'LOCAL';
    currency: 'MXN' | 'USD';
    theme: 'light' | 'dark' | 'system';
    notification: {
        permission: boolean;
        publicity: boolean;
        events: boolean;
    };
    session: {
        token: string;
        user: string;
        remember: boolean;
        cookies: boolean;
    };
}