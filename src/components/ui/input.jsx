import { cn } from "@/lib/cn";

export function Input({ className, ...props }) {
  return <input className={cn("w-full h-10 rounded-xl bg-slate-900 border border-slate-800 px-3 text-slate-100 outline-none", className)} {...props} />;
}
