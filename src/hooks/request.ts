import { useSession } from "./session";

const REQ_TIMEOUT = 15000;

interface Options {
    method: "POST" | "GET" | "PUT" | "DELETE";
    base: string;
    body: Object;
    query: Record<string, string | number | boolean | undefined>;
    headers: Record<string, string>;
    timeout: number;
}

export class ApiError extends Error {
    error: string | { field: string; detail: string }[];
    constructor(message: any, error: any) {
        super(message);
        this.error = error;
        this.name = "Error de API";
    }
}

export function useRequest() {
    const token = useSession((state) => state.token);

    async function request<T>(path: string, option: Partial<Options> = {}) {
        try {
            const headers = new Headers(option.headers);

            if (!option.base) {
                const base = import.meta.env.VITE_API_BASE;
                headers.append("Authorization", `Bearer ${token}`);
                headers.append("Content-Type", "application/json");
                option.base = base;
            }
            if (!option.timeout) {
                option.timeout = REQ_TIMEOUT;
            }

            const url = new URL(path, option.base);
            for (const key in option.query) {
                const value = option.query[key];
                if (value == undefined) continue;
                url.searchParams.append(key, value.toString());
            }
            const body = option.body ? JSON.stringify(option.body) : undefined;
            const controller = new AbortController();
            setTimeout(() => controller.abort(), option.timeout);
            const res = await fetch(url, {
                body,
                headers,
                method: option.method,
                signal: controller.signal,
            });
            const data = await res.json();
            if (!res.ok) {
                const error = new ApiError(data.message, data.error);
                throw error;
            }
            return data as T;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            const err = error as Error;
            let message = err.message;
            let name = err.name;
            if (message == "Failed to fetch") {
                name = "Error de red";
                message =
                    "No fue posible conectar con el servidor, revisa tu conexión a internet.";
            }
            if (err.name == "AbortError") {
                name = "Error de espera";
                message =
                    "Se ha alcanzado el tiempo máximo de espera, intente de nuevo más tarde";
            }
            throw new ApiError(name, message);
        }
    }

    return request;
}
