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

    async function createUser(data: Partial<User>) {
        const res = await request<{ message: string }>("usuario", {
            method: "POST",
            body: data,
        });
        return res.message;
    }

    async function updateUser(id: string, data: Partial<User>) {
        const res = await request<{ message: string }>(`usuario/${id}`, {
            method: "PUT",
            body: data,
        });
        return res.message;
    }

    return {
        loginUser,
        userProfile,
        registerUser,
        listarUsers,
        createUser,
        updateUser,
    };
}
