export default function Home() {
  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>AI Business Autopilot</h1>
      <p>Welcome to your automated earnings dashboard.</p>

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