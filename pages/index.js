import Layout from "../components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <section style={{maxWidth:900, margin:"40px auto", textAlign:"center"}}>
        <h1 style={{fontSize:36, marginBottom:12}}>🚀 AI Business Autopilot</h1>
        <p>Real-time AdSense & Analytics overview with admin controls.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16, marginTop:24}}>
          <div className="card"><h3>Visitors</h3><p>Live via GA4</p></div>
          <div className="card"><h3>Revenue</h3><p>AdSense (when approved)</p></div>
          <div className="card"><h3>Status</h3><p>Active</p></div>
        </div>
        <div style={{marginTop:24, display:"flex", gap:12, justifyContent:"center"}}>
          <Link href="/dashboard" className="btn">Open Dashboard</Link>
          <Link href="/admin" className="btn">Admin</Link>
        </div>
      </section>
      <style jsx>{`
        .card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:18px}
        .btn{background:#0ea5e9;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none}
        .btn:hover{opacity:.9}
      `}</style>
    </Layout>
  );
}
