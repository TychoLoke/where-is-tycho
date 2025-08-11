import { cn } from "@/lib/cn";

export function Checkbox({ className, checked, onCheckedChange, id, ...props }) {
  return (
    <input
      id={id}
      type="checkbox"
      className={cn("h-4 w-4 rounded border-slate-700 bg-slate-900 text-fuchsia-600 focus:ring-0", className)}
      checked={!!checked}
      onChange={(e)=> onCheckedChange ? onCheckedChange(e.target.checked) : undefined}
      {...props}
    />
  );
}
