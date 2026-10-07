export function getYears(count: number = 5): string[] {
    return Array.from({ length: count }, (_, i) =>
        (new Date().getFullYear() - i).toString()
    );
}
