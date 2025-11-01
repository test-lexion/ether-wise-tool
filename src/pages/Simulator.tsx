import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Calculator, Clock, DollarSign } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const transactionTypes = [
  { value: "eth_transfer", label: "ETH Transfer", gasLimit: 21000 },
  { value: "erc20_transfer", label: "ERC20 Token Transfer", gasLimit: 65000 },
  { value: "uniswap_swap", label: "Uniswap Swap", gasLimit: 150000 },
  { value: "nft_mint", label: "NFT Mint", gasLimit: 100000 },
  { value: "contract_interaction", label: "Contract Interaction", gasLimit: 80000 },
];

const Simulator = () => {
  const [txType, setTxType] = useState("eth_transfer");
  const [gasLimit, setGasLimit] = useState("21000");
  const [gasPrice, setGasPrice] = useState([35]);
  
  const currentAvgGasPrice = 35;
  const ethPrice = 2450; // Mock ETH price in USD
  
  const selectedType = transactionTypes.find(t => t.value === txType);
  
  // Calculate costs
  const gasPriceGwei = gasPrice[0];
  const totalGasUsed = parseInt(gasLimit);
  const costInEth = (gasPriceGwei * totalGasUsed) / 1e9;
  const costInUsd = costInEth * ethPrice;
  
  // Estimate confirmation time based on gas price
  const getConfirmationTime = () => {
    if (gasPriceGwei < currentAvgGasPrice * 0.7) return "10-30 minutes";
    if (gasPriceGwei < currentAvgGasPrice * 0.9) return "5-10 minutes";
    if (gasPriceGwei < currentAvgGasPrice * 1.2) return "2-5 minutes";
    return "< 1 minute";
  };
  
  const showWarning = gasPriceGwei < currentAvgGasPrice * 0.7;

  const handleTypeChange = (value: string) => {
    setTxType(value);
    const type = transactionTypes.find(t => t.value === value);
    if (type) {
      setGasLimit(type.gasLimit.toString());
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Transaction Simulator</h1>
        <p className="text-muted-foreground">Estimate transaction costs before sending</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="p-6 bg-gradient-card border-border">
          <h3 className="text-lg font-semibold mb-6">Transaction Details</h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="tx-type">Transaction Type</Label>
              <Select value={txType} onValueChange={handleTypeChange}>
                <SelectTrigger id="tx-type" className="bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {transactionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gas-limit">Gas Limit</Label>
              <Input
                id="gas-limit"
                type="number"
                value={gasLimit}
                onChange={(e) => setGasLimit(e.target.value)}
                className="bg-secondary border-border"
              />
              <p className="text-xs text-muted-foreground">
                Suggested: {selectedType?.gasLimit.toLocaleString()}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="gas-price">Gas Price (Gwei)</Label>
                <span className="text-sm font-medium text-primary">{gasPrice[0]}</span>
              </div>
              <Slider
                id="gas-price"
                min={10}
                max={100}
                step={1}
                value={gasPrice}
                onValueChange={setGasPrice}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>10 Gwei (Slow)</span>
                <span className="text-primary">
                  {currentAvgGasPrice} (Current Avg)
                </span>
                <span>100 Gwei (Fast)</span>
              </div>
            </div>

            <Button className="w-full gap-2">
              <Calculator className="h-4 w-4" />
              Calculate Cost
            </Button>
          </div>
        </Card>

        {/* Estimation Output */}
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-card border-border">
            <h3 className="text-lg font-semibold mb-6">Cost Estimation</h3>
            
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Estimated Cost</div>
                    <div className="text-2xl font-bold text-foreground">
                      {costInEth.toFixed(6)} ETH
                    </div>
                    <div className="text-lg text-primary">
                      ≈ ${costInUsd.toFixed(2)} USD
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/20">
                    <Clock className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Estimated Time</div>
                    <div className="text-xl font-bold text-foreground">
                      {getConfirmationTime()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Gas Limit</div>
                    <div className="font-semibold text-foreground">
                      {parseInt(gasLimit).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Gas Price</div>
                    <div className="font-semibold text-foreground">{gasPriceGwei} Gwei</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">ETH Price</div>
                    <div className="font-semibold text-foreground">${ethPrice}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Network</div>
                    <div className="font-semibold text-foreground">Ethereum</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {showWarning && (
            <Alert className="border-warning/30 bg-warning/10">
              <AlertCircle className="h-4 w-4 text-warning" />
              <AlertDescription className="text-sm text-warning-foreground">
                <strong>Low Gas Price Warning:</strong> Your selected gas price is significantly
                below the network average. This may result in a very long confirmation time or
                transaction failure.
              </AlertDescription>
            </Alert>
          )}

          <Card className="p-4 bg-muted border-border">
            <h4 className="text-sm font-semibold mb-2">Transaction Summary</h4>
            <p className="text-xs text-muted-foreground">
              Sending a {selectedType?.label.toLowerCase()} with {gasLimit} gas limit at{" "}
              {gasPriceGwei} Gwei will cost approximately {costInEth.toFixed(6)} ETH (${costInUsd.toFixed(2)} USD)
              and should confirm in {getConfirmationTime().toLowerCase()}.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
