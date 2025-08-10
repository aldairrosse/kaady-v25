export interface Mail {
    from: string;
    to: string;
    subject: string;
    date: string;
    preview: string;
    key: string;
    body?: string;
    attachments: {
        filename: string;
        content_base64: string;
        mime_type: string;
    }[];
}

export interface MailSend {
    from: string;
    to: string[];
    subject: string;
    content: string;
    attachments: {
        filename: string;
        content_base64: string;
        mime_type: string;
    }[];
}

export interface MailIdentity {
    name: string;
    sign: string;
    image: string;
}
