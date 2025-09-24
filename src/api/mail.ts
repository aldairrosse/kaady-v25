import { useRequest } from "@hooks/useRequest";
import { useSession } from "@hooks/useSession";
import { Mail, MailIdentity, MailSend } from "@models/Mail";

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

    async function leerEmail(id: string) {
        const base = import.meta.env.VITE_AWS_BASE;
        const res = await request<Mail>("mail/data", {
            base,
            query: {
                id,
            },
        });
        return res;
    }

    async function enviarMail(data: MailSend) {
        const base = import.meta.env.VITE_AWS_BASE;
        const res = await request("mail/send", {
            base,
            body: data,
            method: "POST",
        });
        return res;
    }

    async function agregarIdentidad(name: string, sign: string) {
        const res = await request("usuario-identity", {
            method: "PUT",
            body: { name, sign },
        });
        return res;
    }

    async function verIdentidad() {
        const res = await request<{ data?: MailIdentity }>("usuario-identity");
        return res.data;
    }

    return {
        listarEmail,
        leerEmail,
        enviarMail,
        agregarIdentidad,
        verIdentidad,
    };
}
