import Script from 'next/script'

export default function GoogleAnalytics() {
  return (
    <>
      <meta name="google-adsense-account" content="ca-pub-5274201910411416"></meta>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-GNMSSCC4PZ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-GNMSSCC4PZ');
        `}
      </Script>
    </>
  )
}
