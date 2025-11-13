import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function Admin() {
  const [ok, setOk] = useState(false);
  const [pwd, setPwd] = useState("");

  useEffect(()=>{ setOk(localStorage.getItem("autopilot_token")==="autopilot_admin_2025"); },[]);

  const login = () => {
    if (pwd === "autopilot_admin_2025") {
      localStorage.setItem("autopilot_token","autopilot_admin_2025");
      setOk(true);
    } else alert("Wrong password");
  };

  if (!ok) {
    return (
      <Layout>
        <div style={{maxWidth:420, margin:"80px auto", background:"#fff", padding:24, borderRadius:12, border:"1px solid #e5e7eb"}}>
          <h3>Admin Login</h3>
          <input value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="Enter password"
                 style={{width:"100%",padding:"10px",marginTop:12,borderRadius:8,border:"1px solid #e5e7eb"}}/>
          <button onClick={login} style={{marginTop:12, padding:"10px 16px", border:0, borderRadius:8, background:"#0ea5e9", color:"#fff"}}>Login</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{maxWidth:900, margin:"40px auto"}}>
        <h2>Admin Panel</h2>
        <p>Here you’ll later add: post creator, RSS import, JSONBin sync, etc.</p>
      </div>
    </Layout>
  );
}
