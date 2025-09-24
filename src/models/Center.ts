import { Documento } from "./Documento";

export interface Center {
    _id: string;
    image?: Documento;
    estado: boolean;
    activities: string[];
    services: string[];
    resources: Documento[];
    name: string;
    description: string;
    available_from: number;
    payment_by_class: number;
    admin_user?: string;
    location_data?: CenterLocation;
    payment_data?: CenterPayment;
    social_data?: Partial<CenterSocial>;
    document_data?: CenterDocument;
    createdAt: string;
    updatedAt: string;
}

export interface CenterLocation {
    address: string;
    latitude: number;
    longitude: number;
}

export interface CenterPayment {
    name: string;
    address: string;
    banco: string;
    rfc: string;
    clabe: string;
}

export interface CenterDocument {
    ine?: Documento;
    banco?: Documento;
    rfc?: Documento;
    contrato?: Documento;
}

export interface CenterSocial {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    tiktok: string;
}
