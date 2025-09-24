export interface Documento {
    id: string;
    mime_type: string;
}

export interface Documento64 {
    key: string;
    mime_type: string;
    base64: string;
}

export interface ImageParams {
    width?: number;
    height?: number;
    quality?: number;
    fit?: "contain" | "cover" | "fill" | "inside" | "outside";
}
