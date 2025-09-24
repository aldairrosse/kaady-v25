export interface Settings {
    language: "es" | "en";
    timezone: "UTC" | "LOCAL";
    currency: "MXN" | "USD";
    theme: "light" | "dark" | "system";
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

export interface Filtro {
    page: number;
    limit: number;
    search: string;
    sort: string;
    estado: boolean;
    order: "asc" | "desc";
}

export interface Paginator {
    page: number;
    limit: number;
    total: number;
    pages: number;
    has_next: boolean;
    has_prev: boolean;
}
