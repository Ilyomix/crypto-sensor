import Script from 'next/script'

export default function GoogleAnalytics() {
  return (
    <>
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
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5274201910411416"
        crossOrigin="anonymous"
      />
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5274201910411416"
        data-ad-slot="6504159204"
        data-ad-format="auto"
        data-full-width-responsive="true">  
      </ins>
      <Script id="adsbygoogle-init">
          (adsbygoogle = window.adsbygoogle || []).push({});
      </Script>
    </>
  )
}
