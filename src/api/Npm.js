const apiUrl = "https://api.npms.io";

export const deps = async (packageName) => {
    const url = `${apiUrl}/v2/package/${encodeURIComponent(packageName)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`[Status: ${response.status}] ${response.statusText}`);
    return await response.json();
}
export const list = async (query, num) => {
    if (query.length === 0) {
        return [];
    }
    const url = `${apiUrl}/v2/search/suggestions?q=${encodeURIComponent(query)}&size=${num}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`[Status: ${response.status}] ${response.statusText}`);
    return await response.json();
}