"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe2, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
{/* Header */}
<header className="sticky top-0 z-20 backdrop-blur bg-slate-950/70 border-b border-slate-900">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <div className="p-2 rounded-xl" style={{background: 'linear-gradient(135deg,var(--brand-accent),var(--brand-accent-2))', color: '#fff'}}>
            <Globe2 className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold tracking-tight">Where is Tycho — About</h1>
            <p className="text-sm text-slate-400">Public profile</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Link href="/" className="px-4 py-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800 transition">Home</Link>
            <Link href="/about" className="px-4 py-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800 transition">About</Link>
          </div>
        </div>
      </header>


      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Hero / Intro */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid md:grid-cols-[160px_1fr] gap-6 items-start mb-8"
        >
          <div className="aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
            <img
              src="/tycho-avatar.svg"
              alt="Tycho Loke"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Tycho Loke</h1>
            <p className="mt-2 text-slate-300">
              Channel Pre-Sales Solutions Engineer at AvePoint. Founder of{" "}
              <a href="https://abovethestack.com" target="_blank" className="underline decoration-slate-600 hover:decoration-fuchsia-500">AboveTheStack.com</a>{" "}
              and{" "}
              <a href="https://tycholoke.com" target="_blank" className="underline decoration-slate-600 hover:decoration-fuchsia-500">TychoLoke.com</a>.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className="bg-fuchsia-900/40 text-fuchsia-300 border border-fuchsia-800">Speaker</Badge>
              <Badge className="bg-slate-800 text-slate-300 border border-slate-700">Channel & MSP</Badge>
              <Badge className="bg-indigo-900/40 text-indigo-300 border border-indigo-800">AI & Automation</Badge>
            </div>
          </div>
        </motion.section>

        {/* Bio Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.25, delay:0.05}}>
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">What I Do</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 text-sm leading-6">
                <p>
                  I connect business strategy with Microsoft 365 execution, empowering MSPs to scale through automation, standardization, and smart tenant management.
                  With deep expertise in Azure, Intune, AI, and multi-tenant SaaS delivery, I help MSPs transform into Managed Intelligence Providers (MIPs) by modernizing operations and boosting recurring value.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.25, delay:0.1}}>
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 text-sm leading-6">
                <p>
                  Empower MSPs to lead — not just with tools, but through mindset, culture, and intelligent automation.
                  I advocate for clarity, accountability, and performance at scale.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.25, delay:0.15}}>
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Platforms</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 text-sm leading-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 w-20">Founder</span>
                  <a href="https://abovethestack.com" target="_blank" className="inline-flex items-center gap-1 underline decoration-slate-600 hover:decoration-fuchsia-500">
                    AboveTheStack.com <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 w-20">Personal</span>
                  <a href="https://tycholoke.com" target="_blank" className="inline-flex items-center gap-1 underline decoration-slate-600 hover:decoration-fuchsia-500">
                    TychoLoke.com <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.25, delay:0.2}}>
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Interests</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 text-sm leading-6">
                <ul className="list-disc list-inside space-y-1">
                  <li>Formula 1 — strategy, telemetry, high-performance decision-making</li>
                  <li>Travel & cruising — exploring new cultures and coastlines</li>
                  <li>Gaming — where tech, UX, and entertainment converge</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.25, delay:0.25}}>
          <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 mt-8">
            <CardContent className="py-6 flex flex-wrap items-center gap-3">
              <div className="text-sm text-slate-300">
                Want to connect or invite me to speak?
              </div>
              <div className="ml-auto flex gap-2">
                <a href="/" className="inline-flex items-center gap-2 h-10 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700">Back to Calendar</a>
                <a
                  href="mailto:hello@tycholoke.com?subject=Speaking%20Inquiry%20—%20Tycho%20Loke"
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white border-0"
                >
                  Contact
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <p className="mt-8 text-xs text-slate-500">Dark-mode only. Built with Next.js + Tailwind.</p>
      </main>
    </div>
  );
}
