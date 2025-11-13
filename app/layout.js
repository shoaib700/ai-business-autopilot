export const metadata = {
  title: "AI Business Autopilot",
  description: "Automated income dashboard with earnings tracking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#f9fafb",
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
