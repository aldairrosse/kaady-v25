import { Center } from "@models/Center";
import { Documento64 } from "@models/Documento";
import { create } from "zustand";

interface State {
    data: Partial<Center>;
    docs: {
        ine: Partial<Documento64>;
        banco: Partial<Documento64>;
        rfc: Partial<Documento64>;
        contrato: Partial<Documento64>;
    };
    setData: (d: Partial<Center>) => void;
    setDocs: (d: Partial<State["docs"]>) => void;
    reset: () => void;
}

export const useCenter = create<State>((set, get) => ({
    data: {},
    docs: {
        ine: {},
        banco: {},
        rfc: {},
        contrato: {},
    },
    setData: (d) =>
        set({
            data: {
                ...get().data,
                ...d,
            },
        }),
    setDocs: (d) =>
        set({
            docs: {
                ...get().docs,
                ...d,
            },
        }),
    reset: () =>
        set({
            data: {},
            docs: {
                ine: {},
                banco: {},
                rfc: {},
                contrato: {},
            },
        }),
}));
