export const runtime = "nodejs";

export function GET() {
  return Response.json(
    { status: "ok" },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    },
  );
}
