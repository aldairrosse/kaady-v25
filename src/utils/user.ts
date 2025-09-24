import { User } from "@models/User";

const redirect: Record<number, { title: string; to: string }> = {
    1: {
        title: "Usuario",
        to: "/user",
    },
    2: {
        title: "Panel del centro",
        to: "/center",
    },
    3: {
        title: "Web email",
        to: "/mail",
    },
    10: {
        title: "Panel administrador",
        to: "/admin",
    },
};

export function getRedirect(role?: number) {
    return redirect[role || 1];
}

export function getCurrentRole(path: string, roles?: number[]) {
    for (const key in redirect) {
        const red = redirect[key];
        if (!roles?.includes(Number(key))) continue;

        if (path.startsWith(red.to)) {
            return red.title;
        }
    }
    return "Desconocido";
}

export function getUserFullName(user?: User) {
    return (
        (user?.name || "") +
        " " +
        (user?.paternal_surname || "") +
        " " +
        (user?.maternal_surname || "")
    );
}
