import { useRequest } from "@hooks/useRequest";
import { Documento, Documento64 } from "@models/Documento";

export function useApiDocs() {
    const request = useRequest();

    async function uploadDocs(docs: Documento64[]) {
        const base = import.meta.env.VITE_AWS_BASE;
        const res = await request<{
            saved: { key: string; id: string; mime_type: string }[];
        }>("file/upload", {
            body: docs,
            method: "POST",
            base,
        });
        return res.saved;
    }

    async function removeDocs(docs: Documento[]) {
        const base = import.meta.env.VITE_AWS_BASE;
        const res = await request<{ message: string }>("file/remove", {
            body: docs,
            method: "DELETE",
            base,
        });
        
        return res.message;
    }

    return { uploadDocs, removeDocs };
}
