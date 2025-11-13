import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ✅ Basic SEO */}
        <meta
          name="description"
          content="AI Business Autopilot — Automate marketing, analytics, finance and admin workflows with AI."
        />
        <meta
          name="keywords"
          content="AI Business Autopilot, business automation, analytics, marketing AI, Vercel, Next.js"
        />
        <meta name="author" content="Shoaib Syed" />
        <meta name="robots" content="index,follow" />

        {/* ✅ Open Graph (for Facebook/LinkedIn) */}
        <meta property="og:title" content="AI Business Autopilot" />
        <meta
          property="og:description"
          content="Automate your business operations using AI — marketing, analytics and admin dashboards all in one."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ai-business-autopilot.vercel.app" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:site_name" content="AI Business Autopilot" />

        {/* ✅ Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Business Autopilot" />
        <meta
          name="twitter:description"
          content="AI Business Autopilot — Smart automation for business workflows and analytics."
        />
        <meta name="twitter:image" content="/og-image.png" />

        {/* ✅ Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* ✅ GA4 (Google Analytics) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-F3ZMF9ZVWH"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F3ZMF9ZVWH');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
