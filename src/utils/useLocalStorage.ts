// hooks/useLocalStorage.ts

/**
 * Safely retrieves and parses an object from localStorage
 * @param key localStorage key
 * @returns The parsed object or null
 */
export const getLocalStorageObject = (key: string) => {
    try {
        const value = localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
    } catch (e) {
        localStorage.removeItem(key);
        console.error(`Failed to parse localStorage item "${key}":`, e);
    }
    return null;
};