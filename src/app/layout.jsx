import "@/styles/globals.css";

export const metadata = {
  title: "Where is Tycho — Q3–Q4 2025",
  description: "Public itinerary: where Tycho is speaking or attending.",
  openGraph: {
    title: "Where is Tycho — Q3–Q4 2025",
    description: "Public itinerary: where Tycho is speaking or attending.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
