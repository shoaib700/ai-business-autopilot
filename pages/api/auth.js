export default function handler(req, res) {
  const { username, password } = req.body || {};
  if (req.method === 'POST') {
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
      res.status(200).json({ success: true, message: '✅ Login successful' });
    } else {
      res.status(401).json({ success: false, message: '❌ Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
