import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Wallet, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Header() {
  const [isConnected, setIsConnected] = useState(false);
  const [network, setNetwork] = useState("ethereum");
  const walletAddress = "0x742d...9f3a";

  const handleConnect = () => {
    setIsConnected(true);
    toast.success("Wallet connected successfully");
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast.info("Wallet disconnected");
  };

  const copyAddress = () => {
    navigator.clipboard.writeText("0x742d35Cc6634C0532925a3b844Bc9e7595f9f3a");
    toast.success("Address copied to clipboard");
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-foreground" />
      </div>
      
      <div className="flex items-center gap-4">
        <Select value={network} onValueChange={setNetwork}>
          <SelectTrigger className="w-[160px] bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="ethereum">Ethereum</SelectItem>
            <SelectItem value="polygon">Polygon</SelectItem>
            <SelectItem value="arbitrum">Arbitrum</SelectItem>
            <SelectItem value="optimism">Optimism</SelectItem>
            <SelectItem value="bsc">BSC</SelectItem>
          </SelectContent>
        </Select>

        {isConnected ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyAddress}
              className="font-mono text-sm"
            >
              {walletAddress}
              <Copy className="ml-2 h-3 w-3" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <Button onClick={handleConnect} className="gap-2">
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
}
