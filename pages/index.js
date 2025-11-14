export default function Home() {
  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>AI Business Autopilot</h1>
      <p>Welcome to your automated earnings dashboard.</p>

      {/* Ads Section */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-2203534618229559"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>

        <script>
          {(adsbygoogle = window.adsbygoogle || []).push({});}
        </script>
      </div>

      <a
        href="/dashboard"
        style={{
          padding: "12px 20px",
          background: "black",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
          marginTop: "20px",
          display: "inline-block"
        }}
      >
        Go to Dashboard
      </a>
    </div>
  );
}