import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Trash2, Edit, Pause, Play, Plus } from "lucide-react";
import { toast } from "sonner";
import { Alert } from "@/types"; // Import the centralized type

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      condition: "below",
      threshold: 25,
      email: true,
      push: false,
      active: true,
    },
    {
      id: "2",
      condition: "above",
      threshold: 60,
      email: true,
      push: true,
      active: true,
    },
  ]);

  const [newAlert, setNewAlert] = useState({
    condition: "below",
    threshold: "",
    email: true,
    push: false,
  });

  const handleCreateAlert = () => {
    if (!newAlert.threshold) {
      toast.error("Please enter a gas price threshold");
      return;
    }

    const alert: Alert = {
      id: Date.now().toString(),
      condition: newAlert.condition as "below" | "above",
      threshold: parseFloat(newAlert.threshold),
      email: newAlert.email,
      push: newAlert.push,
      active: true,
    };

    setAlerts([...alerts, alert]);
    setNewAlert({
      condition: "below",
      threshold: "",
      email: true,
      push: false,
    });
    toast.success("Alert created successfully");
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
    const alert = alerts.find(a => a.id === id);
    toast.info(alert?.active ? "Alert paused" : "Alert resumed");
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast.success("Alert deleted");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Alerts</h1>
        <p className="text-muted-foreground">
          Set up notifications for gas price movements
        </p>
      </div>

      {/* Create New Alert */}
      <Card className="p-6 bg-gradient-card border-border">
        <div className="flex items-center gap-2 mb-6">
          <Plus className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Create New Alert</h3>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select
                value={newAlert.condition}
                onValueChange={(value) =>
                  setNewAlert({ ...newAlert, condition: value })
                }
              >
                <SelectTrigger id="condition" className="bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="below">Gas price is below</SelectItem>
                  <SelectItem value="above">Gas price is above</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="threshold">Gas Price Threshold (Gwei)</Label>
              <Input
                id="threshold"
                type="number"
                placeholder="e.g., 25"
                value={newAlert.threshold}
                onChange={(e) =>
                  setNewAlert({ ...newAlert, threshold: e.target.value })
                }
                className="bg-secondary border-border"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Notification Methods</Label>
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email"
                  checked={newAlert.email}
                  onCheckedChange={(checked) =>
                    setNewAlert({ ...newAlert, email: checked as boolean })
                  }
                />
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email Notification
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="push"
                  checked={newAlert.push}
                  onCheckedChange={(checked) =>
                    setNewAlert({ ...newAlert, push: checked as boolean })
                  }
                />
                <label
                  htmlFor="push"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Browser Push Notification
                </label>
              </div>
            </div>
          </div>

          <Button onClick={handleCreateAlert} className="w-full gap-2">
            <Bell className="h-4 w-4" />
            Create Alert
          </Button>
        </div>
      </Card>

      {/* My Alerts */}
      <Card className="p-6 bg-gradient-card border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">My Alerts</h3>
          <Badge variant="secondary" className="gap-1">
            <Bell className="h-3 w-3" />
            {alerts.filter(a => a.active).length} Active
          </Badge>
        </div>

        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No alerts configured yet</p>
            <p className="text-sm mt-1">Create your first alert above</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 rounded-lg bg-secondary border border-border"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">
                        Gas {alert.condition === "below" ? "Below" : "Above"}{" "}
                        {alert.threshold} Gwei
                      </h4>
                      <Badge
                        variant={alert.active ? "default" : "outline"}
                        className={
                          alert.active
                            ? "text-success border-success/30 bg-success/20"
                            : ""
                        }
                      >
                        {alert.active ? "Active" : "Paused"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Notify when average gas price {alert.condition === "below" ? "falls below" : "rises above"}{" "}
                      {alert.threshold} Gwei
                    </p>
                    <div className="flex gap-2">
                      {alert.email && (
                        <Badge variant="outline" className="text-xs">
                          Email
                        </Badge>
                      )}
                      {alert.push && (
                        <Badge variant="outline" className="text-xs">
                          Push
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => toggleAlert(alert.id)}
                      title={alert.active ? "Pause" : "Resume"}
                    >
                      {alert.active ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteAlert(alert.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Alerts;
