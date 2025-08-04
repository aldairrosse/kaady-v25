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
