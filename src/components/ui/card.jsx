import { cn } from "@/lib/cn";

export function Card({ className, ...props }) {
  return <div className={cn("rounded-2xl border bg-slate-900 border-slate-800", className)} {...props} />;
}
export function CardHeader({ className, ...props }) {
  return <div className={cn("p-5", className)} {...props} />;
}
export function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-lg font-semibold", className)} {...props} />;
}
export function CardContent({ className, ...props }) {
  return <div className={cn("p-5", className)} {...props} />;
}
