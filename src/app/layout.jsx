export const metadata = {
  title: "Where is Tycho — Q3–Q4 2025",
  description: "Public itinerary: where Tycho is speaking or attending.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Where is Tycho — Q3–Q4 2025",
    description: "Public itinerary: where Tycho is speaking or attending.",
    type: "website",
  },
};

import "@/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
