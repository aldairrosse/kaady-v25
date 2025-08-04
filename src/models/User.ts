export interface User {
    _id: string;
    image?: string;
    estado: boolean;
    name: string;
    paternal_surname?: string;
    maternal_surname?: string;
    birthday?: string;
    genre: 'D' | 'H' | 'M';
    email: string;
    password: string;
    role: number[];
    center?: string;
    permissions: string[];
    updatedAt: string;
}