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

export function parseEmailInfo(
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
