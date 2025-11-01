import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "00:00", gwei: 25 },
  { time: "03:00", gwei: 18 },
  { time: "06:00", gwei: 22 },
  { time: "09:00", gwei: 45 },
  { time: "12:00", gwei: 52 },
  { time: "15:00", gwei: 48 },
  { time: "18:00", gwei: 38 },
  { time: "21:00", gwei: 32 },
  { time: "24:00", gwei: 28 },
];

export function GasTrendChart() {
  return (
    <Card className="p-6 bg-gradient-card border-border">
      <h3 className="text-lg font-semibold mb-4">24-Hour Gas Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
            label={{ value: 'Gwei', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="gwei" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
