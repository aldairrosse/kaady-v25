import { Center } from "@models/Center";
import { MailIdentity } from "@models/Mail";
import { User } from "@models/User";
import { getUserFullName } from "@utils/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    token: string;
    user?: User;
    identity?: MailIdentity;
    centros: Center[];
    logout: () => void;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    setIdentity: (identity: MailIdentity) => void;
    name: () => string;
}

export const useSession = create<State>()(
    persist(
        (set, get) => ({
            token: "",
            centros: [],
            logout: () =>
                set({
                    token: "",
                    user: undefined,
                    identity: undefined,
                    centros: [],
                }),
            setToken: (token) => set({ token }),
            setUser: (user) => set({ user }),
            name: () => {
                return getUserFullName(get().user);
            },
            setIdentity: (identity) => set({ identity }),
        }),
        {
            name: "session_data",
            partialize: (state) => ({
                token: state.token,
                user: state.user,
            }),
        }
    )
);
