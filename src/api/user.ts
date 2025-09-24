import { useRequest } from "@hooks/useRequest";
import { Filtro, Paginator } from "@models/Settings";
import { User } from "@models/User";

export function useApiUser() {
    const request = useRequest();

    async function loginUser(user: string, password: string) {
        const res = await request<{ token: string; data: { name: string } }>(
            "auth/login",
            {
                method: "POST",
                body: { user, password },
            }
        );
        return res;
    }

    async function registerUser(user: Partial<User>) {
        const res = await request<{ message: string }>("auth/register", {
            method: "POST",
            body: user,
        });
        return res.message;
    }

    async function userProfile() {
        const res = await request<{ data: User }>("usuario-profile");
        return res.data;
    }

    async function listarUsers(filtro: Partial<Filtro>) {
        const res = request<{ data: User[]; paginator: Paginator }>(
            "usuarios",
            {
                query: filtro,
            }
        );
        return res;
    }

    return { loginUser, userProfile, registerUser, listarUsers };
}
