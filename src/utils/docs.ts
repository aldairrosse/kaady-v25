import { Documento, ImageParams } from "@models/Documento";

export const readFileAsBase64 = (
    file: File
): Promise<{ filename: string; base64: string; mime_type: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = (reader.result as string).split(",")[1];
            resolve({
                filename: file.name,
                base64: base64String,
                mime_type: file.type,
            });
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

export function getDocName(index: string) {
    const availables = {
        ine: "Identificación oficial (INE)",
        banco: "Comprobante de cuenta de banco",
        rfc: "Registro fiscal de contribuyentes",
        contrato: "Contrato Kaady Sport",
    } as { [key: string]: string };
    return availables[index] ?? "Desconocido";
}

export function getDocUrl(doc: Documento, params?: ImageParams) {
    const base = import.meta.env.VITE_AWS_BASE;

    const url = new URL("file/download", base);
    url.searchParams.append("id", doc.id);
    url.searchParams.append("mime_type", doc.mime_type);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (!value) return;
            url.searchParams.append(key, value.toString());
        });
    }

    return url.toString();
}
