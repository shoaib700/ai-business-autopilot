// helpers/aiPredict.js

export function predictNext30Days(revenueList) {
  if (!revenueList || revenueList.length === 0) {
    return { forecast: 0, growth: 0, suggestion: "Add more entries for better AI prediction." };
  }

  const amounts = revenueList.map(r => r.amount);
  const total = amounts.reduce((a, b) => a + b, 0);
  const avg = total / amounts.length;

  const last7 = amounts.slice(0, 7);
  const growth = ((avg - (last7.reduce((a, b) => a + b, 0) / 7)) / avg) * 100;

  const forecast = avg * 30;

  let suggestion = "Keep uploading content. Growth is stable.";
  if (growth > 20) suggestion = "🔥 Strong growth! Double content for higher revenue.";
  if (growth < 0) suggestion = "📉 Decline detected. Improve SEO and increase posting.";

  return { forecast, growth, suggestion };
}
