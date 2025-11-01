import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = ["0-6", "6-12", "12-18", "18-24"];

// Mock data: lower numbers = better time to transact
const heatmapData = [
  [20, 35, 48, 32], // Monday
  [18, 32, 45, 28], // Tuesday
  [22, 38, 52, 35], // Wednesday
  [25, 42, 55, 38], // Thursday
  [15, 28, 42, 30], // Friday
  [12, 22, 35, 25], // Saturday
  [10, 18, 28, 22], // Sunday
];

function getColorClass(value: number) {
  if (value < 20) return "bg-success/80";
  if (value < 30) return "bg-success/50";
  if (value < 40) return "bg-warning/50";
  if (value < 50) return "bg-warning/80";
  return "bg-danger/80";
}

export function GasHeatmap() {
  return (
    <Card className="p-6 bg-gradient-card border-border">
      <h3 className="text-lg font-semibold mb-4">Weekly Gas Fee Heatmap</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Historical patterns showing optimal transaction times
      </p>
      
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="w-16"></div>
          {hours.map((hour) => (
            <div key={hour} className="flex-1 text-center text-xs text-muted-foreground">
              {hour}h
            </div>
          ))}
        </div>
        
        {days.map((day, dayIndex) => (
          <div key={day} className="flex gap-2 items-center">
            <div className="w-16 text-xs text-muted-foreground">{day}</div>
            {heatmapData[dayIndex].map((value, hourIndex) => (
              <div
                key={`${dayIndex}-${hourIndex}`}
                className={cn(
                  "flex-1 h-10 rounded flex items-center justify-center text-xs font-medium transition-all hover:scale-105 cursor-pointer",
                  getColorClass(value)
                )}
                title={`${day} ${hours[hourIndex]}h: ${value} Gwei avg`}
              >
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex items-center justify-end gap-4 text-xs">
        <span className="text-muted-foreground">Legend:</span>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-success/80"></div>
          <span>Low</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-warning/80"></div>
          <span>Medium</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-danger/80"></div>
          <span>High</span>
        </div>
      </div>
    </Card>
  );
}
