export function shortenAddress(address: string, length: number = 5): string {
    return (
        address.substring(0, length) +
        '...' +
        address.substring(address.length - length)
    );
}
