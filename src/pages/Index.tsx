import { GasFeeCard } from "@/components/GasFeeCard";
import { GasTrendChart } from "@/components/GasTrendChart";
import { GasHeatmap } from "@/components/GasHeatmap";
import { OptimalTimeIndicator } from "@/components/OptimalTimeIndicator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

const Index = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Monitor gas fees and optimize your transaction costs</p>
      </div>

      <OptimalTimeIndicator />

      <div>
        <h2 className="text-xl font-semibold mb-4">Current Gas Fees</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GasFeeCard
            title="Low Priority"
            gwei={22}
            usd={3.45}
            time="5-10 min"
            variant="low"
          />
          <GasFeeCard
            title="Average Priority"
            gwei={35}
            usd={5.50}
            time="2-3 min"
            variant="average"
          />
          <GasFeeCard
            title="High Priority"
            gwei={52}
            usd={8.15}
            time="< 30 sec"
            variant="high"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GasTrendChart />
        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Active Alerts</h3>
            <Badge variant="secondary" className="gap-1">
              <Bell className="h-3 w-3" />
              2 Active
            </Badge>
          </div>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-secondary border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">Gas Below 25 Gwei</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Notify when average gas falls below 25 Gwei
                  </p>
                </div>
                <Badge variant="outline" className="text-success border-success/30">Active</Badge>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-secondary border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">Gas Above 60 Gwei</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Notify when average gas rises above 60 Gwei
                  </p>
                </div>
                <Badge variant="outline" className="text-success border-success/30">Active</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <GasHeatmap />
    </div>
  );
};

export default Index;
