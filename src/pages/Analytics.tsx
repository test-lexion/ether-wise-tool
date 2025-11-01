import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Download, TrendingDown, TrendingUp, Activity } from "lucide-react";

// Generate more comprehensive mock data
const generateChartData = (days: number) => {
  const data = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString(),
      timestamp: date.toISOString(),
      low: Math.floor(Math.random() * 15) + 15,
      average: Math.floor(Math.random() * 20) + 30,
      high: Math.floor(Math.random() * 25) + 45,
    });
  }
  return data;
};

const Analytics = () => {
  const [timeframe, setTimeframe] = useState("7");
  const [visibleLines, setVisibleLines] = useState({
    low: true,
    average: true,
    high: true,
  });
  
  const chartData = generateChartData(parseInt(timeframe));
  
  // Calculate statistics
  const allAverages = chartData.map(d => d.average);
  const avgGasPrice = Math.round(allAverages.reduce((a, b) => a + b, 0) / allAverages.length);
  const lowestGas = Math.min(...allAverages);
  const highestGas = Math.max(...allAverages);
  const lowestEntry = chartData.find(d => d.average === lowestGas);
  const highestEntry = chartData.find(d => d.average === highestGas);

  const toggleLine = (line: keyof typeof visibleLines) => {
    setVisibleLines(prev => ({ ...prev, [line]: !prev[line] }));
  };

  const exportData = () => {
    const csv = [
      ["Date", "Low (Gwei)", "Average (Gwei)", "High (Gwei)"],
      ...chartData.map(d => [d.date, d.low, d.average, d.high])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gas-data-${timeframe}days.csv`;
    a.click();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Charts & Analytics</h1>
          <p className="text-muted-foreground">Analyze historical gas fee trends and patterns</p>
        </div>
        <Button onClick={exportData} className="gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 rounded-lg bg-primary/20">
              <Activity className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">{avgGasPrice} Gwei</div>
          <div className="text-sm text-muted-foreground mt-1">Average Gas Price</div>
          <div className="text-xs text-muted-foreground mt-2">Last {timeframe} days</div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 rounded-lg bg-success/20">
              <TrendingDown className="h-5 w-5 text-success" />
            </div>
          </div>
          <div className="text-2xl font-bold text-success">{lowestGas} Gwei</div>
          <div className="text-sm text-muted-foreground mt-1">Lowest Gas Price</div>
          <div className="text-xs text-muted-foreground mt-2">{lowestEntry?.date}</div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 rounded-lg bg-danger/20">
              <TrendingUp className="h-5 w-5 text-danger" />
            </div>
          </div>
          <div className="text-2xl font-bold text-danger">{highestGas} Gwei</div>
          <div className="text-sm text-muted-foreground mt-1">Highest Gas Price</div>
          <div className="text-xs text-muted-foreground mt-2">{highestEntry?.date}</div>
        </Card>
      </div>

      {/* Main Chart */}
      <Card className="p-6 bg-gradient-card border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Gas Fee Trends</h3>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Badge
                variant={visibleLines.low ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleLine("low")}
              >
                Low
              </Badge>
              <Badge
                variant={visibleLines.average ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleLine("average")}
              >
                Average
              </Badge>
              <Badge
                variant={visibleLines.high ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleLine("high")}
              >
                High
              </Badge>
            </div>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[140px] bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="7">7 Days</SelectItem>
                <SelectItem value="30">30 Days</SelectItem>
                <SelectItem value="90">90 Days</SelectItem>
                <SelectItem value="365">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
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
            <Legend />
            {visibleLines.low && (
              <Line
                type="monotone"
                dataKey="low"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                name="Low"
                dot={false}
              />
            )}
            {visibleLines.average && (
              <Line
                type="monotone"
                dataKey="average"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name="Average"
                dot={false}
              />
            )}
            {visibleLines.high && (
              <Line
                type="monotone"
                dataKey="high"
                stroke="hsl(var(--danger))"
                strokeWidth={2}
                name="High"
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Data Table */}
      <Card className="p-6 bg-gradient-card border-border">
        <h3 className="text-lg font-semibold mb-4">Historical Data</h3>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead className="text-foreground">Date</TableHead>
                <TableHead className="text-foreground text-right">Low (Gwei)</TableHead>
                <TableHead className="text-foreground text-right">Average (Gwei)</TableHead>
                <TableHead className="text-foreground text-right">High (Gwei)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chartData.slice().reverse().slice(0, 10).map((row, index) => (
                <TableRow key={index} className="border-border">
                  <TableCell className="font-medium">{row.date}</TableCell>
                  <TableCell className="text-right text-success">{row.low}</TableCell>
                  <TableCell className="text-right text-primary">{row.average}</TableCell>
                  <TableCell className="text-right text-danger">{row.high}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Showing 10 most recent entries
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
