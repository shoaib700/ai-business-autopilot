import Link from "next/link";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  // simple “Consent” toggle (not a CMP) so you can show auditors a control
  const [consented, setConsented] = useState(false);
  useEffect(() => {
    setConsented(localStorage.getItem("consent") === "yes");
  }, []);
  const grant = () => {
    localStorage.setItem("consent", "yes");
    setConsented(true);
    // re-trigger GA if needed
    if (window.gtag) window.gtag("consent", "update", { ad_user_data: "granted", ad_personalization: "granted", ad_storage: "granted", analytics_storage: "granted" });
  };

  return (
    <>
      {/* Fixed top bar with Consent + Admin Login */}
      <div style={{
        position:"fixed", top:0, left:0, right:0, zIndex:9999,
        background:"#0ea5e9", color:"#fff", padding:"8px 12px",
        display:"flex", gap:12, alignItems:"center", justifyContent:"space-between"
      }}>
        <div style={{fontWeight:700}}>AI Business Autopilot</div>
        <div style={{display:"flex", gap:12}}>
          <Link href="/" className="lnk">Home</Link>
          <Link href="/dashboard" className="lnk">Dashboard</Link>
          <Link href="/admin" className="lnk">Admin</Link>
          <Link href="/privacy" className="lnk">Privacy</Link>
          <Link href="/cookies" className="lnk">Cookies</Link>
          <Link href="/disclosure" className="lnk">Disclosure</Link>
          <Link href="/terms" className="lnk">Terms</Link>
          {!consented && (
            <button onClick={grant} style={{background:"#fff", color:"#0ea5e9", border:"0", borderRadius:8, padding:"6px 10px", cursor:"pointer"}}>
              Give Consent
            </button>
          )}
        </div>
        <style jsx>{`
          .lnk{color:#fff;text-decoration:none}
          .lnk:hover{text-decoration:underline}
        `}</style>
      </div>

      {/* page content padding (to avoid top bar overlap) */}
      <div style={{paddingTop:60, minHeight:"100vh", background:"#f8fafc"}}>
        {children}
      </div>

      <footer style={{background:"#111827", color:"#fff", padding:"24px 16px", textAlign:"center"}}>
        <p>© {new Date().getFullYear()} Travel in UK Ltd | AI Business Autopilot v1.0</p>
        <p style={{marginTop:8}}>
          <a href="/privacy" style={{color:"#93c5fd"}}>Privacy Policy</a> ·{" "}
          <a href="/terms" style={{color:"#93c5fd"}}>Terms of Service</a> ·{" "}
          <a href="/cookies" style={{color:"#93c5fd"}}>Cookie Policy</a> ·{" "}
          <a href="/disclosure" style={{color:"#93c5fd"}}>Affiliate Disclosure</a>
        </p>
      </footer>
    </>
  );
}
