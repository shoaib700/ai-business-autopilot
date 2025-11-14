import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>

        {/* Google AdSense */}
        <script
          data-ad-client="ca-pub-2203534618229559"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}