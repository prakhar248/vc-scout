export async function POST(req) {
  try {
    const { url } = await req.json();

    const res = await fetch(url);
    const html = await res.text();

    // Simple extraction (MVP)
    const cleaned = html
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const summary = cleaned.slice(0, 400);

    return Response.json({
      summary,
      whatTheyDo: ["Website content extracted"],
      keywords: ["startup", "product", "technology"],
      signals: ["Website reachable"],
      sources: [url],
      timestamp: new Date()
    });
  } catch (err) {
    return Response.json({ error: "Failed to enrich" }, { status: 500 });
  }
}