"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calendar as CalendarIcon,
  Globe2,
  Filter,
  FileDown,
  MapPin,
  Share2,
  Download,
} from "lucide-react";

// =========================================================
// "Where is Tycho" – Public-facing calendar overview (dark-only)
// =========================================================
/** @typedef {"Speaker" | "Attendee" | "Travel"} Role */
/** @typedef EventItem
 * @prop {string} id
 * @prop {string} title
 * @prop {Role} role
 * @prop {string} city
 * @prop {string} country // label only
 * @prop {string} venue // optional
 * @prop {string} start // YYYY-MM-DD (inclusive)
 * @prop {string} end // YYYY-MM-DD (inclusive)
 * @prop {boolean} international
 * @prop {string} about // public brief
 * @prop {{title:string, abstract?:string} | null} session // for speakers
 * @prop {boolean} sessionConfirmed
 * @prop {string} notes
 * @prop {number=} travelBeforeDays // optional override (default 1 if international)
 * @prop {number=} travelAfterDays  // optional override (default 1 if international)
 */

// =========================================================
// Data (authoritative)
// =========================================================
const RAW_EVENTS = /** @type {EventItem[]} */ ([
  // ------------------- Speaker – Above The Stack -------------------
  {
    id: "2025-09-16-msp-show-nl",
    title: "MSP Show NL",
    role: "Speaker",
    city: "Utrecht",
    country: "NL",
    venue: "TBA",
    start: "2025-09-16",
    end: "2025-09-16",
    international: false,
    about: "National MSP event on growth, efficiency, and AI in services.",
    session: {
      title:
        "Panel – GTIA – The Power of Communities; Control Your Data Before It Controls You: Data Classification, Access Control and AI",
    },
    sessionConfirmed: true,
    notes: "",
  },

  // ------------------- Speaker – AvePoint -------------------
  {
    id: "2025-09-25-gtia-benelux",
    title: "GTIA Benelux Community Day",
    role: "Speaker",
    city: "Eindhoven",
    country: "NL",
    venue: "High Tech Campus (TBD)",
    start: "2025-09-25",
    end: "2025-09-25",
    international: false,
    about: "Community day for channel leaders and practitioners in the Benelux.",
    session: {
      title:
        "Fireside Chat: Preparing Your MSP for M&A – Lessons from Both Sides of the Table",
    },
    sessionConfirmed: true,
    notes: "",
  },
  {
    id: "2025-10-02-arrowfest",
    title: "ArrowFest",
    role: "Speaker",
    city: "Utrecht",
    country: "NL",
    venue: "TBA",
    start: "2025-10-02",
    end: "2025-10-02",
    international: false,
    about: "Arrow channel event focused on cloud and security ecosystems.",
    session: { title: "Elements: Work Smarter not Harder" },
    sessionConfirmed: true,
    notes: "",
  },
  {
    id: "2025-10-13-14-channelcon-emea",
    title: "ChannelCon EMEA",
    role: "Speaker",
    city: "London",
    country: "UK",
    venue: "TBA",
    start: "2025-10-13",
    end: "2025-10-14",
    international: true,
    about: "CompTIA's flagship EMEA conference for the IT channel.",
    session: { title: "TBA" },
    sessionConfirmed: false,
    notes: "",
  },
  {
    id: "2025-10-22-23-msp-global",
    title: "MSP Global",
    role: "Speaker",
    city: "Barcelona",
    country: "ES",
    venue: "Fira Barcelona (TBD)",
    start: "2025-10-22",
    end: "2025-10-23",
    international: true,
    about:
      "International C-level MSP congress: AI, security, M&A and operations.",
    session: {
      title:
        "Real-Life M&A for MSPs: How Buyers and Sellers Can Prepare, Price, and Profit",
    },
    sessionConfirmed: true,
    travelBeforeDays: 2, // arrive Oct 20 (custom)
    notes: "",
  },
  {
    id: "2025-11-06-msp-roadshow-nl",
    title: "MSP Roadshow NL",
    role: "Speaker",
    city: "Utrecht",
    country: "NL",
    venue: "TBA",
    start: "2025-11-06",
    end: "2025-11-06",
    international: false,
    about:
      "Roadshow with panels on cybersecurity, AI automation, sales and M&A.",
    session: {
      title: "Multiple Panels on M&A, Cybersecurity, AI and More",
    },
    sessionConfirmed: true,
    notes: "",
  },

  // ------------------- Attendee -------------------
  {
    id: "2025-09-10-11-cybersec-bde",
    title: "CyberSec Netherlands & Big Data Expo",
    role: "Attendee",
    city: "Utrecht",
    country: "NL",
    venue: "Jaarbeurs",
    start: "2025-09-10",
    end: "2025-09-11",
    international: false,
    about: "Two expos: security trends and data/AI platform cases.",
    session: null,
    sessionConfirmed: true,
    notes: "",
  },
  {
    id: "2025-10-05-07-pax8-beyond-emea",
    title: "Pax8 Beyond EMEA",
    role: "Attendee",
    city: "Amsterdam",
    country: "NL",
    venue: "RAI (TBD)",
    start: "2025-10-05",
    end: "2025-10-07",
    international: false,
    about: "Marketplace & vendor ecosystem; GTM and enablement.",
    session: null,
    sessionConfirmed: true,
    notes: "",
  },
  {
    id: "2025-12-01-02-gtia-year-end",
    title: "GTIA Year-End Meeting (mandatory)",
    role: "Attendee",
    city: "Fort Lauderdale",
    country: "US",
    venue: "TBA",
    start: "2025-12-01",
    end: "2025-12-02",
    international: true,
    about: "Year-end leadership/GLC sessions.",
    session: null,
    sessionConfirmed: true,
    notes: "",
  },
  {
    id: "2025-12-03-04-cloud-expo-nl",
    title: "Cloud Expo NL (depends on US travel)",
    role: "Attendee",
    city: "Houten",
    country: "NL",
    venue: "Expo Houten",
    start: "2025-12-03",
    end: "2025-12-04",
    international: false,
    about: "Dutch cloud expo; timing may clash with return flight.",
    session: null,
    sessionConfirmed: true,
    notes: "Jet lag/return flight may affect plans.",
  },
]);

// =========================================================
// Utils (LOCAL DATE SAFE, zero UTC drift)
// =========================================================
const fmt = (dStr) => new Date(dStr + "T00:00:00");
const toLocalISODate = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
const todayISO = () => {
  const d = new Date();
  return toLocalISODate(d);
};

function addTravelDays(events) {
  const out = [...events];
  for (const e of events) {
    if (!e.international) continue;
    const beforeDays = typeof e.travelBeforeDays === 'number' ? e.travelBeforeDays : 1;
    const afterDays = typeof e.travelAfterDays === 'number' ? e.travelAfterDays : 1;

    const before = new Date(fmt(e.start));
    before.setDate(before.getDate() - beforeDays);
    const after = new Date(fmt(e.end));
    after.setDate(after.getDate() + afterDays);

    out.push({
      id: `${e.id}-travel-in`,
      title: `Travel day → ${e.city}`,
      role: "Travel",
      city: e.city,
      country: e.country,
      venue: "",
      start: toLocalISODate(before),
      end: toLocalISODate(before),
      international: e.international,
      about: "",
      session: null,
      sessionConfirmed: true,
      notes: "Auto-added.",
    });
    out.push({
      id: `${e.id}-travel-out`,
      title: `Travel day ← ${e.city}`,
      role: "Travel",
      city: e.city,
      country: e.country,
      venue: "",
      start: toLocalISODate(after),
      end: toLocalISODate(after),
      international: e.international,
      about: "",
      session: null,
      sessionConfirmed: true,
      notes: "Auto-added.",
    });
  }
  return out;
}

function monthKey(dateStr) {
  const d = fmt(dateStr);
  return d.toLocaleString("en-GB", { month: "long", year: "numeric" });
}

function compareByStart(a, b) {
  return fmt(a.start).getTime() - fmt(b.start).getTime();
}

function groupByMonth(items) {
  const map = new Map();
  for (const it of items) {
    const key = monthKey(it.start);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(it);
  }
  for (const arr of map.values()) arr.sort(compareByStart);
  return map;
}

function intersects(dateStr, ev) {
  const d = fmt(dateStr).getTime();
  return d >= fmt(ev.start).getTime() && d <= fmt(ev.end).getTime();
}

// ICS helpers
function icsForEvent(e) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WhereIsTycho//EN",
    "BEGIN:VEVENT",
    `UID:${e.id}@whereistycho`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART;VALUE=DATE:${e.start.replaceAll("-", "")}`,
    (()=>{ const dtEndDate = fmt(e.end); dtEndDate.setDate(dtEndDate.getDate()+1); return `DTEND;VALUE=DATE:${toLocalISODate(dtEndDate).replaceAll("-", "")}`; })(),
    `SUMMARY:${e.title}`,
    `LOCATION:${e.city}${e.country?`, ${e.country}`:""}${e.venue?` — ${e.venue}`:""}`,
    `DESCRIPTION:${[e.role?`Role: ${e.role}.`:null, e.about?`About: ${e.about}`:null, (e.session?` Session: ${e.session.title}`:null)].filter(Boolean).join(" ")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\n");
}

function toICS(events, { includeTravel = true } = {}) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WhereIsTycho//EN",
  ];
  const filtered = includeTravel ? events : events.filter((e) => e.role !== "Travel");
  for (const e of filtered) {
    const dtStart = e.start.replaceAll("-", "");
    const dtEndDate = fmt(e.end);
    dtEndDate.setDate(dtEndDate.getDate() + 1);
    const dtEnd = toLocalISODate(dtEndDate).replaceAll("-", "");
    const loc = `${e.city}${e.country ? ", " + e.country : ""}${e.venue ? " — " + e.venue : ""}`;
    const about = e.about ? `About: ${e.about}` : "";
    const sess = e.session ? ` Session: ${e.session.title}${e.session.abstract ? " – "+e.session.abstract : ""}` : "";
    const desc = `Role: ${e.role}. ${about}${sess}`.trim();

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${e.id}@whereistycho`);
    lines.push(`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`);
    lines.push(`DTSTART;VALUE=DATE:${dtStart}`);
    lines.push(`DTEND;VALUE=DATE:${dtEnd}`);
    lines.push(`SUMMARY:${e.title}`);
    lines.push(`LOCATION:${loc}`);
    lines.push(`DESCRIPTION:${desc}`);
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.join("\n");
}

function download(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function classNames(...c) { return c.filter(Boolean).join(" "); }

const roleBadge = (role) => {
  if (role === "Speaker") return "bg-fuchsia-900/40 text-fuchsia-300 border border-fuchsia-800";
  if (role === "Attendee") return "bg-slate-800 text-slate-300 border border-slate-700";
  return "bg-cyan-900/40 text-cyan-300 border border-cyan-800"; // Travel
};

// =========================================================
// UX helpers: compute Now/Next, clipboard sharing
// =========================================================
function isPast(e) { return fmt(e.end) < fmt(todayISO()); }
function isUpcoming(e) { return fmt(e.start) >= fmt(todayISO()); }
function pickNext(events) {
  const prio = events.filter(e => e.role !== 'Travel' && isUpcoming(e));
  prio.sort(compareByStart);
  return prio[0] || null;
}

async function copyToClipboard(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}

// =========================================================
// UI: MiniMonth (Year overview, local-date safe, with tooltips)
// =========================================================
function MiniMonth({ monthStartISO, items }) {
  const startDate = fmt(monthStartISO);
  const year = startDate.getFullYear();
  const month = startDate.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days = last.getDate();
  const weekdayOffset = (first.getDay() + 6) % 7; // Monday
  const cells = [];
  for (let i = 0; i < weekdayOffset; i++) cells.push(null);
  for (let day = 1; day <= days; day++) cells.push(new Date(year, month, day));

  const monthLabel = startDate.toLocaleString("en-GB", { month: "long", year: "numeric" });

  const dotsFor = (dateISO) => {
    const evs = items.filter((ev) => intersects(dateISO, ev));
    return {
      hasS: evs.some((e) => e.role === "Speaker"),
      hasB: evs.some((e) => e.role === "Attendee"),
      hasR: evs.some((e) => e.role === "Travel"),
      count: evs.length,
      titles: evs.map((e)=>e.title).join(" • "),
    };
  };

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-slate-100">{monthLabel}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 text-[11px] text-slate-400">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="px-1 py-1 text-center">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 auto-rows-[minmax(44px,auto)]">
          {cells.map((d, idx) => {
            const dateISO = d ? toLocalISODate(d) : null;
            const key = d ? `${toLocalISODate(d)}` : `empty-${idx}`;
            const dots = d ? dotsFor(dateISO) : { hasS: false, hasB: false, hasR: false, count: 0, titles: "" };
            const highlighted = dots.count > 0;
            return (
              <div key={key} className={"border border-slate-800 -mt-px -ml-px p-1.5 " + (highlighted ? "bg-slate-950" : "bg-slate-900") } title={dots.titles}>
                {d && <div className="text-[11px] text-slate-300 mb-1">{d.getDate()}</div>}
                {highlighted && (
                  <div className="flex items-center gap-1">
                    {dots.hasS && <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400" title="Speaker" />}
                    {dots.hasB && <span className="inline-block w-2 h-2 rounded-full bg-slate-300" title="Attendee" />}
                    {dots.hasR && <span className="inline-block w-2 h-2 rounded-full bg-cyan-300" title="Travel" />}
                    <span className="text-[10px] text-slate-400">{dots.count}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// =========================================================
// UI: Event Card (clean, with per-event ICS + share)
// =========================================================
function EventCard({ e }) {
  const onDownloadICS = () => download(`${e.id}.ics`, icsForEvent(e), "text/calendar");
  const onShare = async () => {
    const base = window.location.origin + window.location.pathname;
    const url = `${base}#${e.id}`;
    const ok = await copyToClipboard(url);
    if (ok) alert("Link copied"); else alert(url);
  };
  return (
    <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.25}} id={e.id}>
      <Card className="border border-slate-800 bg-slate-900 rounded-2xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-fuchsia-600/60 via-purple-600/60 to-indigo-600/60" />
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center justify-between gap-3 text-base text-slate-100">
            <span className="truncate">{e.title}</span>
            <div className="flex gap-2">
              <Badge className={roleBadge(e.role)}>{e.role}</Badge>
              {e.international && <Badge className="bg-indigo-900/40 text-indigo-300 border border-indigo-800">International</Badge>}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3 pb-5 text-sm text-slate-200">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <div className="flex items-center gap-1 text-slate-300"><CalendarIcon className="w-4 h-4"/>{e.start === e.end ? e.start : `${e.start} – ${e.end}`}</div>
            <div className="flex items-center gap-1 text-slate-300"><MapPin className="w-4 h-4"/>{e.city}{e.country?`, ${e.country}`:""}</div>
          </div>
          {e.venue && <div className="mt-1 text-slate-400">Venue: {e.venue}</div>}
          {e.about && (<div className="mt-3 text-slate-300">{e.about}</div>)}
          {e.role === "Speaker" && (
            <div className="mt-3 rounded-xl border border-slate-800 p-3 bg-slate-950">
              <div>
                <div className="text-xs text-slate-400 mb-1">Session</div>
                <div className="font-medium text-slate-100">{e.session?.title || ""}</div>
                {e.session?.abstract && <div className="mt-1 text-slate-300 text-sm">{e.session.abstract}</div>}
              </div>
            </div>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" onClick={onDownloadICS} className="h-9 px-3 gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white border-0"><CalendarIcon className="w-4 h-4"/>Add to calendar</Button>
            <Button size="sm" variant="outline" onClick={onShare} className="h-9 px-3 gap-2 border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800"><Share2 className="w-4 h-4"/>Copy link</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// =========================================================
// Static export (single-file HTML, local-date safe)
// =========================================================
function exportStaticSite(currentEvents) {
  const esc = (s) => String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  const withTravel = (evts) => {
    const out = [...evts];
    for (const e of evts) {
      if (!e.international) continue;
      const beforeDays = typeof e.travelBeforeDays === 'number' ? e.travelBeforeDays : 1;
      const afterDays = typeof e.travelAfterDays === 'number' ? e.travelAfterDays : 1;
      const b = new Date(e.start + 'T00:00:00'); b.setDate(b.getDate()-beforeDays);
      const a = new Date(e.end + 'T00:00:00'); a.setDate(a.getDate()+afterDays);
      const iso = (d) => { const y=d.getFullYear(); const m=String(d.getMonth()+1).padStart(2,'0'); const day=String(d.getDate()).padStart(2,'0'); return `${y}-${m}-${day}`; };
      out.push({ id: e.id+'-travel-in', title: 'Travel day → '+e.city, role:'Travel', city:e.city, country:e.country, venue:'', start: iso(b), end: iso(b), international:true, about:'', session:null, sessionConfirmed:true, notes:'' });
      out.push({ id: e.id+'-travel-out', title: 'Travel day ← '+e.city, role:'Travel', city:e.city, country:e.country, venue:'', start: iso(a), end: iso(a), international:true, about:'', session:null, sessionConfirmed:true, notes:'' });
    }
    return out;
  };

  const head = '<!DOCTYPE html><html lang="en" class="dark"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>Where is Tycho – Q3–Q4 2025</title><meta name="description" content="Public itinerary: where Tycho is speaking or attending."/><meta property="og:title" content="Where is Tycho – Q3–Q4 2025"/><meta property="og:description" content="Public itinerary: where Tycho is speaking or attending."/><meta property="og:type" content="website"/><script src="https://cdn.tailwindcss.com"></script><style>html{color-scheme: dark;} body{background:#020617;color:#e2e8f0}</style></head><body class="min-h-screen bg-slate-950 text-slate-100"><header class="max-w-6xl mx-auto px-6 py-8 flex items-center gap-4"><div class="p-2 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-purple-600 text-white">🌐</div><div class="flex-1"><h1 class="text-2xl font-semibold">Where is Tycho – Q3–Q4 2025</h1><p class="text-sm text-slate-400">Overview of speaking, attendance and travel days.</p></div></header><main class="max-w-6xl mx-auto px-6 pb-16" id="app">';

  const items = withTravel(currentEvents);
  const toMonth = (s) => new Date(s+'T00:00:00').toLocaleString('en-GB',{month:'long',year:'numeric'});
  const buckets = new Map();
  for (const e of items) { const k = toMonth(e.start); if (!buckets.has(k)) buckets.set(k, []); buckets.get(k).push(e); }
  for (const arr of buckets.values()) arr.sort((a,b)=> (new Date(a.start) - new Date(b.start)));

  let body = '';
  for (const [month, arr] of buckets.entries()) {
    body += '<section class="mb-10">'+
      '<h2 class="text-lg font-semibold mb-4 text-slate-100">'+esc(month)+'</h2>'+
      '<div class="grid md:grid-cols-2 gap-5">';
    for (const e of arr) {
      const dateStr = e.start===e.end ? e.start : (e.start+' – '+e.end);
      const badges = (
        '<span class="px-2 py-0.5 rounded text-[11px] '+(e.role==='Speaker'?'bg-fuchsia-900/40 text-fuchsia-300 border border-fuchsia-800':(e.role==='Attendee'?'bg-slate-800 text-slate-300 border border-slate-700':'bg-cyan-900/40 text-cyan-300 border border-cyan-800'))+'">'+esc(e.role)+'</span>'+ (e.international?'<span class="px-2 py-0.5 rounded text-[11px] bg-indigo-900/40 text-indigo-300 border border-indigo-800">International</span>':'')
      );
      body += '<div class="border border-slate-800 bg-slate-900 rounded-2xl">'+
        '<div class="px-5 pt-5 pb-3 flex items-center justify-between">'+
          '<div class="text-base font-medium truncate">'+esc(e.title)+'</div>'+
          '<div class="flex gap-2">'+badges+'</div>'+
        '</div>'+ 
        '<div class="px-5 pb-5 text-sm text-slate-200">'+
          '<div class="flex flex-wrap items-center gap-x-5 gap-y-1">'+
            '<div class="flex items-center gap-1 text-slate-300">🗓 '+esc(dateStr)+'</div>'+ 
            '<div class="flex items-center gap-1 text-slate-300">📍 '+esc(e.city+(e.country?(', '+e.country):''))+'</div>'+
          '</div>'+
          (e.venue?('<div class="mt-1 text-slate-400">Venue: '+esc(e.venue)+'</div>'):'')+
          (e.about?('<div class="mt-3 text-slate-300">'+esc(e.about)+'</div>'):'')+
          ((e.role==='Speaker' && e.session)?('<div class="mt-3 rounded-xl border border-slate-800 p-3 bg-slate-950"><div class="text-xs text-slate-400 mb-1">Session</div><div class="font-medium text-slate-100">'+esc(e.session.title)+'</div>'+(e.session.abstract?('<div class="mt-1 text-slate-300 text-sm">'+esc(e.session.abstract)+'</div>'):'')+'</div>'):'')+
        '</div>'+
      '</div>';
    }
    body += '</div></section>';
  }

  const html = head + body + '</main></body></html>';
  download("where-is-tycho-q3q4-2025.html", html, "text/html");
}

// =========================================================
// App (dark-only, public-first UX)
// =========================================================
function EventPlannerApp() {
  const [baseEvents] = useState(() => RAW_EVENTS);
  const [showTravel, setShowTravel] = useState(false); // default OFF → list first // default ON for public
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [intlOnly, setIntlOnly] = useState(false);
  const [viewYear, setViewYear] = useState(true);
  const [compact, setCompact] = useState(false);

  const base = useMemo(() => baseEvents.slice().sort(compareByStart), [baseEvents]);
  const withTravel = useMemo(() => addTravelDays(base).sort(compareByStart), [base]);
  const events = showTravel ? withTravel : base;

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (roleFilter !== "All" && e.role !== roleFilter) return false;
      if (intlOnly && !e.international) return false;
      if (q) {
        const hay = `${e.title} ${e.city} ${e.role} ${e.about} ${e.session ? e.session.title : ""}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [events, q, roleFilter, intlOnly]);

  const grouped = useMemo(() => groupByMonth(filtered), [filtered]);
  const monthKeys = useMemo(() => [...grouped.keys()], [grouped]);

  const nextUp = useMemo(() => pickNext(events), [events]);

  const scrollToMonth = (key) => {
    const el = document.getElementById(`m-${key}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const downloadICS = () =>
    download(
      `where-is-tycho-q3-q4-2025${showTravel ? "-with-travel" : ""}.ics`,
      toICS(filtered, { includeTravel: showTravel }),
      "text/calendar"
    );

  const downloadCSV = () => {
    const headers = ["start","end","title","role","city","country","international","venue","about","session_title"]; 
    const rows = filtered.map(e => [e.start, e.end, e.title, e.role, e.city, e.country, e.international ? "Yes" : "No", e.venue||"", e.about||"", e.session?e.session.title:""]);
    const csv = [headers.join(","), ...rows.map(r => r.map(v => `"${String(v).replaceAll('"','""')}"`).join(","))].join("\n");
    download(`where-is-tycho-q3-q4-2025${showTravel ? "-with-travel" : ""}.csv`, csv, "text/csv");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(1100px_600px_at_15%_-10%,rgba(168,85,247,.12),transparent),radial-gradient(1100px_600px_at_115%_-10%,rgba(99,102,241,.10),transparent)] bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur bg-slate-950/70 border-b border-slate-900">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-purple-600 text-white">
            <Globe2 className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold tracking-tight">Where is Tycho — Q3–Q4 2025</h1>
            <p className="text-sm text-slate-400">Public itinerary · Europe/Amsterdam</p>
          </div>
          <div className="hidden md:flex gap-2">
            <Button variant="outline" onClick={downloadCSV} className="gap-2 border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800"><FileDown className="w-4 h-4"/>CSV</Button>
            <Button onClick={downloadICS} className="gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white border-0"><CalendarIcon className="w-4 h-4"/>ICS</Button>
          </div>
        </div>
      </header>

      {/* Next Up strip */}
      <section className="max-w-6xl mx-auto px-6 pt-6">
        <AnimatePresence>
          {nextUp ? (
            <motion.div initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} exit={{opacity:0, y:6}} transition={{duration:0.25}}>
              <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600" />
                <CardContent className="py-4 flex flex-wrap items-center gap-3">
                  <span className="text-xs uppercase tracking-wide text-slate-400">Next up</span>
                  <span className="text-base font-semibold text-slate-100">{nextUp.title}</span>
                  <span className="text-sm text-slate-300">{nextUp.start === nextUp.end ? nextUp.start : `${nextUp.start} – ${nextUp.end}`}</span>
                  <span className="text-sm text-slate-300 flex items-center gap-1"><MapPin className="w-4 h-4"/>{nextUp.city}{nextUp.country?`, ${nextUp.country}`:""}</span>
                  <div className="ml-auto flex gap-2">
                    <Button size="sm" onClick={()=>download(`${nextUp.id}.ics`, icsForEvent(nextUp), "text/calendar")} className="h-9 px-3 gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white border-0"><CalendarIcon className="w-4 h-4"/>Add to calendar</Button>
                    <Button size="sm" variant="outline" onClick={downloadICS} className="h-9 px-3 gap-2 border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800"><Download className="w-4 h-4"/>All events (ICS)</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-slate-400 text-sm">No upcoming events.</motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Controls */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <Card className="bg-slate-900/90 border-slate-800">
          <CardContent className="pt-6 grid gap-6 lg:grid-cols-12 items-end">
            <div className="lg:col-span-5">
              <label className="text-sm font-medium flex items-center gap-2 mb-2 text-slate-200"><Filter className="w-4 h-4"/>Search</label>
              <Input className="h-10 bg-slate-900 border-slate-800 text-slate-100 focus:ring-0" placeholder="Search by title, city, role…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div className="lg:col-span-3">
              <label className="text-sm font-medium block mb-2 text-slate-200">Role</label>
              <div className="flex gap-2 flex-wrap">
                {["All","Speaker","Attendee","Travel"].map((r) => (
                  <Button key={r} size="sm" variant={r===roleFilter?"default":"outline"} onClick={()=>setRoleFilter(r)} className={r===roleFilter?"h-9 px-3 bg-fuchsia-600 hover:bg-fuchsia-500 border-0":"h-9 px-3 border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800"}>{r}</Button>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="showTravel" checked={showTravel} onCheckedChange={(v)=>setShowTravel(Boolean(v))} />
                <label htmlFor="showTravel" className="text-sm text-slate-200">Show travel days</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="intlOnly" checked={intlOnly} onCheckedChange={(v)=>setIntlOnly(Boolean(v))} />
                <label htmlFor="intlOnly" className="text-sm text-slate-200">International only</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="viewYear" checked={viewYear} onCheckedChange={(v)=>setViewYear(Boolean(v))} />
                <label htmlFor="viewYear" className="text-sm text-slate-200">Year overview</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="compact" checked={compact} onCheckedChange={(v)=>setCompact(Boolean(v))} />
                <label htmlFor="compact" className="text-sm text-slate-200">Compact cards</label>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Month chips (anchors) */}
      <div className="sticky top-[68px] z-10 bg-slate-950/80 backdrop-blur border-b border-slate-900">
        <div className="max-w-6xl mx-auto px-6 py-2 overflow-x-auto no-scrollbar">
          <div className="flex gap-2">
            {monthKeys.map((k) => (
              <Button key={k} size="sm" variant="outline" onClick={()=>scrollToMonth(k)} className="h-8 px-3 border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800">
                {k}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 pb-20">
        {viewYear ? (
          <div className="space-y-6">
            {/* Legend */}
            <div className="text-xs text-slate-400 flex items-center gap-3">
              <span className="inline-flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400"/> Speaker</span>
              <span className="inline-flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-slate-300"/> Attendee</span>
              <span className="inline-flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-cyan-300"/> Travel</span>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[0,1,2,3].map((i) => {
                const d = new Date(2025, 8 + i, 1); // Sep=8
                return (
                  <motion.div key={i} initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{duration:0.25, delay:i*0.05}}>
                    <MiniMonth monthStartISO={toLocalISODate(d)} items={events} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {[...grouped.entries()].map(([month, items]) => (
              <motion.section key={month} id={`m-${month}`} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.25}}>
                <h2 className="text-lg font-semibold mb-4 text-slate-100 tracking-tight">{month}</h2>
                <div className={compact?"grid md:grid-cols-3 gap-4":"grid md:grid-cols-2 gap-5"}>
                  {items.map((e) => (
                    <EventCard key={e.id} e={e} />
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-12 flex flex-wrap gap-3">
          <Button onClick={downloadICS} className="h-10 px-4 gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white border-0"><CalendarIcon className="w-4 h-4"/>Download ICS</Button>
          <Button variant="outline" onClick={downloadCSV} className="h-10 px-4 gap-2 border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800"><FileDown className="w-4 h-4"/>Export CSV</Button>
          <Button variant="outline" onClick={()=>exportStaticSite(events)} className="h-10 px-4 gap-2 border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800">Download Site (HTML)</Button>
        </div>

        <p className="mt-6 text-xs text-slate-500">Dark-mode only. Travel days auto-added around international events. Designed for public viewing.</p>
      </main>
    </div>
  );
}

export default EventPlannerApp;
