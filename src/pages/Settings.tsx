import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Wallet, Mail, Bell, DollarSign, Gauge, Copy } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [currency, setCurrency] = useState("USD");
  const [defaultPriority, setDefaultPriority] = useState("average");
  const [email, setEmail] = useState("user@example.com");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f9f3a";

  const handleSavePreferences = () => {
    toast.success("Preferences saved successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification settings updated");
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Address copied to clipboard");
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast.info("Wallet disconnected");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your preferences and account</p>
      </div>

      {/* Preferences */}
      <Card className="p-6 bg-gradient-card border-border">
        <div className="flex items-center gap-2 mb-6">
          <Gauge className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Preferences</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currency" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Default Fiat Currency
            </Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency" className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Currency used for cost estimations throughout the app
            </p>
          </div>

          <Separator className="bg-border" />

          <div className="space-y-2">
            <Label htmlFor="priority" className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Default Transaction Priority
            </Label>
            <Select value={defaultPriority} onValueChange={setDefaultPriority}>
              <SelectTrigger id="priority" className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="low">Low - Slower, Lower Cost</SelectItem>
                <SelectItem value="average">Average - Standard Speed</SelectItem>
                <SelectItem value="high">High - Faster, Higher Cost</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Default priority level used in the transaction simulator
            </p>
          </div>

          <Button onClick={handleSavePreferences} className="w-full">
            Save Preferences
          </Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6 bg-gradient-card border-border">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Notification Settings</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-secondary border-border"
            />
            <p className="text-xs text-muted-foreground">
              Email address for receiving alert notifications
            </p>
          </div>

          <Separator className="bg-border" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Receive gas price alerts via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Browser Push Notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Receive real-time alerts in your browser
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
          </div>

          <Button onClick={handleSaveNotifications} className="w-full">
            Save Notification Settings
          </Button>
        </div>
      </Card>

      {/* Wallet Management */}
      <Card className="p-6 bg-gradient-card border-border">
        <div className="flex items-center gap-2 mb-6">
          <Wallet className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Wallet Management</h3>
        </div>

        {isConnected ? (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-secondary border border-border">
              <Label className="text-sm text-muted-foreground mb-2 block">
                Connected Wallet
              </Label>
              <div className="flex items-center justify-between">
                <code className="text-sm font-mono text-foreground">{walletAddress}</code>
                <Button variant="outline" size="sm" onClick={copyAddress}>
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <Button
              variant="destructive"
              onClick={handleDisconnect}
              className="w-full gap-2"
            >
              <Wallet className="h-4 w-4" />
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <Wallet className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground mb-4">No wallet connected</p>
            <Button
              onClick={() => {
                setIsConnected(true);
                toast.success("Wallet connected successfully");
              }}
              className="gap-2"
            >
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Settings;
