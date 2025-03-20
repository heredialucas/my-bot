/**
 * Extracts string value from dictionary items that might be objects
 * @param value Any value from the dictionary
 * @returns A string representation of the value
 */
export const getDictionaryValue = (value: any): string => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object' && 'title' in value) return value.title;
    return String(value || '');
};

/**
 * Converts dictionary items to an array if they're in object format
 * @param items Items from the dictionary that might be an object with numeric keys
 * @returns An array of items
 */
export const getArrayFromDictionaryItems = <T>(items: T[] | Record<string, T> | undefined): T[] => {
    if (Array.isArray(items)) return items;
    if (items && typeof items === 'object') return Object.values(items);
    return [];
}; 