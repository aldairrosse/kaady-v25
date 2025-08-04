import { useRequest } from "@hooks/request";
import { useSession } from "@hooks/session";
import { Mail } from "@models/Mail";

export function useApiMail() {
    const request = useRequest();
    const user = useSession((state) => state.user);

    async function listarEmail(bandeja: string) {        
        if (!user?.email) return [];
        const base = import.meta.env.VITE_AWS_BASE;
        const name = user.email.split("@")[0];

        const res = await request<Mail[]>("mail/list", {
            base,
            query: {
                user: name,
                bandeja,
            },
        });
        return res;
    }

    return { listarEmail };
}
