import { useState } from "react";
import { ArrowUpDown, Settings, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChainSelector } from "./ChainSelector";
import { TokenSelector } from "./TokenSelector";
import { PrivacyIndicator, MEVProtectionBadge, EncryptionStatus } from "./PrivacyIndicator";

interface Chain {
  id: string;
  name: string;
  symbol: string;
  icon: string;
}

interface Token {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  balance?: string;
}

export function SwapInterface() {
  const [fromChain, setFromChain] = useState<Chain | null>(null);
  const [toChain, setToChain] = useState<Chain | null>(null);
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const handleSwapDirection = () => {
    setFromChain(toChain);
    setToChain(fromChain);
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Card className="glass-card border-border/50 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
            Cross-Chain Swap
          </h2>
          <div className="flex items-center gap-2">
            <MEVProtectionBadge />
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Encryption Status */}
        <div className="flex items-center justify-between">
          <EncryptionStatus isEncrypted={isEncrypted} />
          <PrivacyIndicator isEncrypted={isEncrypted} onToggle={setIsEncrypted} />
        </div>

        {/* From Section */}
        <div className="space-y-3">
          <ChainSelector
            selected={fromChain}
            onSelect={setFromChain}
            label="From Chain"
          />
          <TokenSelector
            selected={fromToken}
            onSelect={setFromToken}
            amount={fromAmount}
            onAmountChange={setFromAmount}
            isEncrypted={isEncrypted}
          />
        </div>

        {/* Swap Direction Button */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSwapDirection}
            className="rounded-full h-10 w-10 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:rotate-180"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        {/* To Section */}
        <div className="space-y-3">
          <ChainSelector
            selected={toChain}
            onSelect={setToChain}
            label="To Chain"
          />
          <TokenSelector
            selected={toToken}
            onSelect={setToToken}
            amount={toAmount}
            onAmountChange={setToAmount}
            isEncrypted={isEncrypted}
          />
        </div>

        {/* Swap Details */}
        {fromAmount && toAmount && (
          <div className="glass-card rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Exchange Rate</span>
              <span>1 {fromToken?.symbol} = 0.998 {toToken?.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bridge Fee</span>
              <span className="text-accent">0.1%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Time</span>
              <span>~3-5 minutes</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        {!isConnected ? (
          <Button
            variant="connect"
            size="lg"
            className="w-full"
            onClick={() => setIsConnected(true)}
          >
            <Wallet className="h-5 w-5 mr-2" />
            Connect Wallet
          </Button>
        ) : (
          <Button
            variant="swap"
            size="lg"
            className="w-full"
            disabled={!fromAmount || !toAmount || !fromChain || !toChain}
          >
            {!fromAmount || !toAmount ? "Enter Amount" : "Swap Privately"}
          </Button>
        )}
      </Card>
    </div>
  );
}