export function getPriceFormat(price: number) {
    const formatter = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
    });

    return formatter.format(price);
}

export function getDateInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export function parseDateInput(
    dateString: string,
    minDate?: Date,
    maxDate?: Date
): Date | null {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return null;

    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    if (isNaN(date.getTime())) return null;
    if (minDate && date < minDate) return null;
    if (maxDate && date > maxDate) return null;

    return date;
}

export function getDateShort(date: string) {
    const d = new Date(date);
    const now = new Date();

    const sameDay = d.toDateString() === now.toDateString();
    const sameYear = d.getFullYear() === now.getFullYear();

    if (sameDay) {
        return d
            .toLocaleString("es-MX", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
            .toLowerCase();
    }
    if (sameYear) {
        return d.toLocaleString("es-MX", {
            day: "numeric",
            month: "short",
        });
    }
    return d.toLocaleString("es-MX", {
        month: "short",
        year: "numeric",
    });
}

export function getDateFull(date: string) {
    const d = new Date(date);
    return d.toLocaleString("es-MX", {
        minute: "2-digit",
        hour: "2-digit",
        hour12: true,
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export function getEmailInfo(
    input: string
): { name?: string; email: string } | null {
    const regex =
        /^(?:\s*"?([^"<]+?)"?\s*)?<([\w.-]+@[\w.-]+\.\w+)>$|^([\w.-]+@[\w.-]+\.\w+)$/;
    const match = input.match(regex);

    if (!match) return null;

    const name = match[1] || undefined;
    const email = match[2] || match[3];

    return { name, email };
}

export function getEmailFrom(email: string, name?: string) {
    if (!name) return email;
    return `${name} <${email}>`;
}

export function getSizeLabel(size: number) {
    const orden = Math.log10(size);
    if (orden < 3) {
        return `${size} B`;
    }
    if (orden < 6) {
        const value = roundToDecimals(size / Math.pow(10, 3), 2);
        return `${value} KB`;
    }
    if (orden < 9) {
        const value = roundToDecimals(size / Math.pow(10, 6), 2);
        return `${value} MB`;
    }
    const value = roundToDecimals(size / Math.pow(10, 9), 2);
    return `${value} GB`;
}

export function roundToDecimals(num: number, dec: number = 0) {
    const factor = Math.pow(10, dec);
    const value = Math.round(num * factor) / factor;
    return value;
}

export function getMembershipFrom(from?: number) {
    const availables = {
        1: "Basic",
        2: "Silver",
        3: "Gold",
        4: "Black",
    } as { [key: number]: string };
    return availables[from ?? 1] ?? "Basic";
}
