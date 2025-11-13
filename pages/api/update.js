export default async function handler(req, res) {
  const BIN_ID = "690fef86d0ea881f40dc9c47";
  const MASTER_KEY = process.env.JSONBIN_KEY;
  const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

  try {
    if (req.method === "GET") {
      const r = await fetch(BIN_URL, { headers: { "X-Master-Key": MASTER_KEY } });
      const json = await r.json();
      return res.status(200).json(json.record || {});
    }
    if (req.method === "PUT") {
      const body = req.body || {};
      const update = {
        visitors: body.visitors ?? 0,
        revenue: body.revenue ?? 0,
        lastUpdate: new Date().toISOString()
      };
      const u = await fetch(BIN_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": MASTER_KEY
        },
        body: JSON.stringify(update)
      });
      const out = await u.json();
      return res.status(200).json(out.record || update);
    }
    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to connect to JSONBin" });
  }
}
