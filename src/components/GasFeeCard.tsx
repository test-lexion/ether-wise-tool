import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GasFeeCardProps {
  title: string;
  gwei: number;
  usd: number;
  time: string;
  variant: "low" | "average" | "high";
}

export function GasFeeCard({ title, gwei, usd, time, variant }: GasFeeCardProps) {
  const variantStyles = {
    low: "border-success/30 bg-gradient-to-br from-success/10 to-success/5",
    average: "border-warning/30 bg-gradient-to-br from-warning/10 to-warning/5",
    high: "border-danger/30 bg-gradient-to-br from-danger/10 to-danger/5",
  };

  const badgeStyles = {
    low: "bg-success/20 text-success",
    average: "bg-warning/20 text-warning",
    high: "bg-danger/20 text-danger",
  };

  return (
    <Card className={cn("p-6 border-2 transition-all hover:shadow-glow", variantStyles[variant])}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase">{title}</h3>
        <span className={cn("px-2 py-1 rounded-full text-xs font-semibold", badgeStyles[variant])}>
          {variant}
        </span>
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-bold text-foreground">{gwei} Gwei</div>
        <div className="text-lg text-muted-foreground">${usd.toFixed(2)} USD</div>
        <div className="text-sm text-muted-foreground">~{time}</div>
      </div>
    </Card>
  );
}
