import { User } from "@models/User";
import { create } from "zustand";

interface State {
    data: Partial<User>;
    reset: () => void;
    setData: (data: Partial<User>) => void;
}

export const useUser = create<State>((set, get) => ({
    data: {},
    setData: (data: Partial<User>) => {
        set({ data: { ...get().data, ...data } });
    },
    reset: () => {
        set({ data: {} });
    },
}));
