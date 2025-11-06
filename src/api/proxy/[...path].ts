export const config = { runtime: "edge" };
const R2_BASE = "https://scholarx.mypinx.store";

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api\/proxy\//, "");
  const target = `${R2_BASE}/${path}`;


  const res = await fetch(target, { redirect: "follow" });
  const headers = new Headers(res.headers);
  headers.set("Cache-Control", "public, s-maxage=86400, max-age=3600, stale-while-revalidate=600");
  headers.set("Access-Control-Allow-Origin", "*");

  return new Response(res.body, { status: res.status, headers });
}
