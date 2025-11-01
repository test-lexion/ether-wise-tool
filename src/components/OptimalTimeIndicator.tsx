import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

type Status = "good" | "moderate" | "high";

export function OptimalTimeIndicator() {
  const status: Status = "good";
  
  const statusConfig = {
    good: {
      icon: TrendingDown,
      text: "Good Time to Transact",
      description: "Gas fees are below average",
      color: "text-success",
      bg: "bg-success/20",
    },
    moderate: {
      icon: Minus,
      text: "Moderate Fees",
      description: "Gas fees are around average",
      color: "text-warning",
      bg: "bg-warning/20",
    },
    high: {
      icon: TrendingUp,
      text: "High Fees",
      description: "Consider waiting for lower fees",
      color: "text-danger",
      bg: "bg-danger/20",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Card className="p-6 bg-gradient-card border-border">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${config.bg}`}>
          <Icon className={`h-8 w-8 ${config.color}`} />
        </div>
        <div>
          <h3 className={`text-xl font-semibold ${config.color}`}>{config.text}</h3>
          <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
        </div>
      </div>
    </Card>
  );
}
