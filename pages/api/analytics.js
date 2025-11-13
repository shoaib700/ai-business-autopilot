// pages/api/analytics.js
export default async function handler(req, res) {
  return res.status(200).json({
    success: true,
    connected: false,
    message: "Analytics API placeholder. GA4 is tracked using the client-side tag.",
  });
}
