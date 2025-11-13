import Layout from "../components/Layout";
export default function Cookies(){
  return (
    <Layout>
      <div style={{padding:"40px", maxWidth:800, margin:"auto"}}>
        <h2>Cookie Policy</h2>
        <p>We use cookies for analytics (GA4) and advertising (AdSense). Third parties may set cookies to deliver and measure ads.</p>
        <ul>
          <li>Analytics cookies: measure traffic & engagement.</li>
          <li>Advertising cookies: personalize ads and limit repeats.</li>
        </ul>
      </div>
    </Layout>
  );
}
