export function setLocalStorage(key: string, value: string) {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, value);
    }
}

export function getLocalStorage(key: string): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem(key);
    }
    return null;
}
