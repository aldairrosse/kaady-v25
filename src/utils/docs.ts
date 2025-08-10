export const readFileAsBase64 = (
    file: File
): Promise<{ filename: string; content_base64: string; mime_type: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = (reader.result as string).split(",")[1];
            resolve({
                filename: file.name,
                content_base64: base64String,
                mime_type: file.type,
            });
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};
