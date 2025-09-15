import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from 'next/script';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono", 
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kernel Hub - Linux & Open-Source Updates by Smruti Prakash Rout",
    template: "%s | Kernel Hub - Smruti Prakash Rout"
  },
  description: "Kernel Hub by Smruti Prakash Rout - Your fastest source for Linux news, open-source software updates, and tech insights. Follow Smruti's expertise in Linux, programming, and open-source development.",
  
  // Essential SEO metadata
  keywords: [
    "Smruti Prakash Rout",
    "Linux news", 
    "open source software",
    "Kernel Hub",
    "Linux updates",
    "tech blog",
    "programming",
    "software development",
    "open source development",
    "Linux tutorials"
  ],
  
  authors: [{ name: "Smruti Prakash Rout", url: "https://smrutiprakashrout.vercel.app" }],
  creator: "Smruti Prakash Rout",
  publisher: "Smruti Prakash Rout",
  
  // Open Graph metadata for social sharing
  // openGraph: {
  //   type: "website",
  //   locale: "en_US",
  //   url: "https://kernelhub-smrutiprakashrout.vercel.app",
  //   siteName: "Kernel Hub",
  //   title: "Kernel Hub - Linux & Open-Source Updates by Smruti Prakash Rout",
  //   description: "Your fastest source for Linux news and open-source software updates by Smruti Prakash Rout",
  //   images: [
  //     {
  //       url: "https://kernelhub-smrutiprakashrout.vercel.app/og-image.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "Kernel Hub by Smruti Prakash Rout - Linux & Open Source Blog",
  //     }
  //   ]
  // },
  
  // Twitter Card metadata
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Kernel Hub - Linux & Open-Source Updates by Smruti Prakash Rout", 
  //   description: "Your fastest source for Linux news and open-source software updates",
  //   creator: "@smrutiprakash", // Add your Twitter handle
  //   images: ["https://kernelhub-smrutiprakashrout.vercel.app/og-image.jpg"]
  // },
  
  // Additional metadata
  // robots: {
  //   index: true,
  //   follow: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     "max-video-preview": -1,
  //     "max-image-preview": "large",
  //     "max-snippet": -1,
  //   },
  // },
  

  
  // alternates: {
  //   canonical: "https://kernelhub-smrutiprakashrout.vercel.app",
  //   types: {
  //     "application/rss+xml": "https://kernelhub-smrutiprakashrout.vercel.app/rss.xml"
  //   }
  // },
  
  category: "technology",
  
  // Additional meta tags
  other: {
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#000000"
  }
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://kernelhub-smrutiprakashrout.vercel.app/#website",
      "url": "https://kernelhub-smrutiprakashrout.vercel.app",
      "name": "Kernel Hub",
      "description": "Linux news and open-source software updates by Smruti Prakash Rout",
      "publisher": {
        "@id": "https://kernelhub-smrutiprakashrout.vercel.app/#person"
      },
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://kernelhub-smrutiprakashrout.vercel.app/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      ]
    },
    {
      "@type": "Person",
      "@id": "https://kernelhub-smrutiprakashrout.vercel.app/#person",
      "name": "Smruti Prakash Rout",
      "url": "https://smrutiprakashrout.vercel.app",
      "image": "https://smrutiprakashrout.vercel.app/smruti_prakash_rout_picture.jpg",
      "description": "Expert Software Developer specializing in full-stack development, DevOps, and Linux administration ,Creator of Kernel Hub blog.",
      "sameAs": [
        "https://smrutiprakashrout.vercel.app",
        "https://github.com/smrutiprakashrout",
        "https://linkedin.com/in/smrutiprakashrout",
        "https://www.instagram.com/smrutiprakashrout",
        "https://youtube.com/@smrutionlinux",
      ],
      "jobTitle": "Software Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "Kernel Hub"
      }
    },
    {
      "@type": "Blog",
      "@id": "https://kernelhub-smrutiprakashrout.vercel.app/#blog",
      "url": "https://kernelhub-smrutiprakashrout.vercel.app",
      "name": "Kernel Hub",
      "description": "Linux news and open-source software updates",
      "author": {
        "@id": "https://kernelhub-smrutiprakashrout.vercel.app/#person"
      },
      "publisher": {
        "@id": "https://kernelhub-smrutiprakashrout.vercel.app/#person"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
          }}
        />
        
        {/* Google Analytics - Replace with your GA ID */}
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script> */}
      </body>
    </html>
  );
}