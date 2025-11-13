import { useRequest } from "@hooks/useRequest";
import { Center } from "@models/Center";
import { Filtro, Paginator } from "@models/Settings";
import { User } from "@models/User";

export function useApiCenter() {
    const request = useRequest();

    async function listarCentros(
        filtro: Partial<Filtro>,
        loc?: { lat?: number; lng?: number }
    ) {
        const res = request<{ data: Center[]; paginator: Paginator }>(
            "centers",
            {
                query: {
                    ...filtro,
                    centro:
                        loc && loc.lat && loc.lng
                            ? `${loc.lat},${loc.lng}`
                            : undefined,
                },
            }
        );
        return res;
    }

    async function actualizarCentro(id: string, data: Partial<Center>) {
        const res = request<{ message: string }>("center/" + id, {
            method: "PUT",
            body: data,
        });
        return res;
    }

    async function registrarCentro(data: Partial<Center>) {
        const res = request<{ message: string; data: { _id: string } }>(
            "center",
            {
                method: "POST",
                body: data,
            }
        );
        return res;
    }

    async function registrarCentroUsuario(data: {
        center: Partial<Center>;
        user: Partial<User>;
    }) {
        const res = request<{ message: string }>("auth/center-register", {
            method: "POST",
            body: data,
        });
        return res;
    }

    return {
        listarCentros,
        actualizarCentro,
        registrarCentro,
        registrarCentroUsuario,
    };
}
