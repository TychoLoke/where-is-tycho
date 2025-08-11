import { cn } from "@/lib/cn";

export function Button({ className, variant="default", size="md", ...props }) {
  const variants = {
    default: "bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700",
    outline: "border border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800",
    ghost: "text-slate-200 hover:bg-slate-800",
  };
  const sizes = {
    sm: "h-8 px-3 rounded-xl text-sm",
    md: "h-10 px-4 rounded-2xl",
    lg: "h-12 px-5 rounded-2xl text-base",
  };
  return <button className={cn("inline-flex items-center justify-center gap-2 transition", variants[variant], sizes[size], className)} {...props} />;
}
