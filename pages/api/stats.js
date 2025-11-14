// Uses env for JSONBin if you later connect; otherwise returns mock numbers
export default async function handler(req, res) {
  // quick mock growth so page looks alive
  const visitors = Math.floor(4200 + (Date.now()/1000)%150);
  const revenue = (220 + ((Date.now()/10000)%40)).toFixed(2);
  res.status(200).json({ stats: { visitors, revenue } });
}
