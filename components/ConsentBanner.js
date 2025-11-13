import { useEffect, useState } from "react";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookieConsent")) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };
  if (!visible) return null;

  return (
    <div style={{
      position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",
      background:"#0d47a1",color:"#fff",padding:"15px 25px",borderRadius:"8px",
      zIndex:1000,textAlign:"center"
    }}>
      <p>We use cookies for analytics and ads. Read our <a href="/cookies">policy</a>.</p>
      <button onClick={accept} style={{background:"#00c851",color:"#fff",border:"none",borderRadius:"6px",padding:"6px 12px",cursor:"pointer"}}>Accept</button>
    </div>
  );
}
