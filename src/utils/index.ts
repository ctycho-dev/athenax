const baseUrl = import.meta.env.VITE_API_BASE_URL
let isRU = true;
// http://ipwho.is/

const getGeoLocation = async () => {
    try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        isRU = data.country_code === "RU";
    } catch (e) {
        console.warn("Geo lookup failed, defaulting to global endpoint");
    }
};

await getGeoLocation();

export const s3 = (path: string) => {
    const base = isRU
        ? `${baseUrl}/s3/images`
        : 'https://link.storjshare.io/raw';
    return `${base}/${path}`;
}