import { useRequest } from "@hooks/useRequest";
import { Resumen } from "@models/Admin";

export function useApiAdmin() {
    const request = useRequest();
    async function verResumen() {
        const res = await request<{ data: Resumen }>("resumen");
        return res.data;
    }
    return { verResumen };
}
