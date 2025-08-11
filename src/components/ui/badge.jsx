import { cn } from "@/lib/cn";

export function Badge({ className, ...props }) {
  return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] border", className)} {...props} />;
}
