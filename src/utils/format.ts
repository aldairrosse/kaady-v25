export function getPriceFormat(price: number) {
    const formatter = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
    });

    return formatter.format(price);
}
