import { User } from "@models/User";
import { create } from "zustand";

interface State {
    data: Partial<User>;
    setNames: (name: string, first: string, second: string) => void;
    setAge: (date: Date, sex: "D" | "H" | "M") => void;
    setAccount: (email: string, pass: string) => void;
    isValid: () => boolean;
}

export const useRegister = create<State>((set, get) => ({
    data: {},
    setNames: (name, first, second) =>
        set({
            data: {
                ...get().data,
                maternal_surname: second,
                paternal_surname: first,
                name,
            },
        }),
    setAge: (date, sex) =>
        set({
            data: {
                ...get().data,
                birthday: date.toISOString(),
                genre: sex,
            },
        }),
    setAccount: (email, pass) =>
        set({ data: { ...get().data, email, password: pass } }),
    isValid: () => {
        const user = get().data;
        return (
            !!user.birthday && !!user.name && !!user.email && !!user.password
        );
    },
}));
