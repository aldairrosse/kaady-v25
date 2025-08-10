import { MailIdentity } from "@models/Mail";
import { User } from "@models/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    token: string;
    user?: User;
    identity?: MailIdentity;
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
            logout: () =>
                set({ token: "", user: undefined, identity: undefined }),
            setToken: (token) => set({ token }),
            setUser: (user) => set({ user }),
            name: () => {
                return (
                    (get().user?.name || "") +
                    " " +
                    (get().user?.paternal_surname || "") +
                    " " +
                    (get().user?.maternal_surname || "")
                );
            },
            setIdentity: (identity) => set({ identity }),
        }),
        {
            name: "session_data",
            partialize: (state) => ({
                token: state.token,
            }),
        }
    )
);
