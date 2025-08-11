import Link from "next/link";
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
        {/* Global top nav (appears on all routes) */}
        <div className="border-b border-slate-900 bg-slate-950/95 backdrop-blur">
          <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
            <Link href="/" className="text-sm font-medium text-slate-200 hover:text-white">
              Where is Tycho
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/" className="relative text-sm text-slate-300 hover:text-slate-100">
                <span className="after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-fuchsia-500 after:to-indigo-500 hover:after:w-full after:transition-all">Home</span>
              </Link>
              <Link href="/about" className="relative text-sm text-slate-300 hover:text-slate-100">
                <span className="after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-fuchsia-500 after:to-indigo-500 hover:after:w-full after:transition-all">About</span>
              </Link>
            </nav>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
