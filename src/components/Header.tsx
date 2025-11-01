import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Wallet, Copy } from "lucide-react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { toast } from "sonner";
import { useEffect } from "react";

export function Header() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleConnect = () => {
    const walletConnectConnector = connectors.find(
      (connector) => connector.id === "walletConnect"
    );
    if (walletConnectConnector) {
      connect({ connector: walletConnectConnector });
    } else {
      // Fallback to first available connector
      connect({ connector: connectors[0] });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.info("Wallet disconnected");
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard");
    }
  };

  const handleNetworkChange = (chainId: string) => {
    switchChain({ chainId: parseInt(chainId) });
  };

  useEffect(() => {
    if (isConnected && address) {
      toast.success("Wallet connected successfully");
    }
  }, [isConnected, address]);

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-foreground" />
      </div>
      
      <div className="flex items-center gap-4">
        {isConnected && (
          <Select 
            value={chain?.id.toString()} 
            onValueChange={handleNetworkChange}
          >
            <SelectTrigger className="w-[160px] bg-secondary border-border">
              <SelectValue placeholder={chain?.name || "Select Network"} />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="1">Ethereum</SelectItem>
              <SelectItem value="137">Polygon</SelectItem>
              <SelectItem value="42161">Arbitrum</SelectItem>
              <SelectItem value="10">Optimism</SelectItem>
              <SelectItem value="56">BSC</SelectItem>
            </SelectContent>
          </Select>
        )}

        {isConnected && address ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyAddress}
              className="font-mono text-sm"
            >
              {formatAddress(address)}
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
