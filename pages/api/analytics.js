export default async function handler(req, res) {
  return res.status(200).json({
    success: true,
    status: "OK",
    message: "Analytics endpoint active. GA4 is handled on the client side.",
  });
}