import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Token {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  balance?: string;
}

const tokens: Token[] = [
  { id: "eth", symbol: "ETH", name: "Ethereum", icon: "🟦", balance: "1.2345" },
  { id: "usdc", symbol: "USDC", name: "USD Coin", icon: "🔵", balance: "1,234.56" },
  { id: "usdt", symbol: "USDT", name: "Tether", icon: "🟢", balance: "567.89" },
  { id: "dai", symbol: "DAI", name: "Dai Stablecoin", icon: "🟡", balance: "234.56" },
  { id: "wbtc", symbol: "WBTC", name: "Wrapped Bitcoin", icon: "🟠", balance: "0.1234" },
];

interface TokenSelectorProps {
  selected: Token | null;
  onSelect: (token: Token) => void;
  amount: string;
  onAmountChange: (amount: string) => void;
  isEncrypted?: boolean;
}

export function TokenSelector({ 
  selected, 
  onSelect, 
  amount, 
  onAmountChange,
  isEncrypted = false 
}: TokenSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTokens = tokens.filter(token =>
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="glass-card rounded-xl p-4 space-y-3 bg-contrast-safe">
      <div className="flex items-center justify-between">
        <Input
          type="text"
          placeholder={isEncrypted ? "••••••" : "0.0"}
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="text-2xl font-bold bg-transparent border-none p-0 h-auto text-contrast-high placeholder:text-muted-foreground focus-visible:ring-0"
        />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 h-auto p-2">
              {selected ? (
                <>
                  <span className="text-lg">{selected.icon}</span>
                  <span className="font-semibold">{selected.symbol}</span>
                </>
              ) : (
                <span className="text-muted-foreground">Select token</span>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-80 glass-card border-border/50 p-2 bg-contrast-safe z-50">
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tokens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-secondary/50"
              />
            </div>
            
            <div className="max-h-60 overflow-y-auto">
              {filteredTokens.map((token) => (
                <DropdownMenuItem
                  key={token.id}
                  onClick={() => onSelect(token)}
                  className="cursor-pointer py-3 hover:bg-primary/10 transition-colors rounded-lg"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{token.icon}</span>
                      <div>
                        <div className="font-medium text-contrast-high">{token.symbol}</div>
                        <div className="text-xs text-muted-foreground">{token.name}</div>
                      </div>
                    </div>
                    {token.balance && (
                      <div className="text-right">
                        <div className="text-sm font-medium text-contrast-high">{token.balance}</div>
                        <div className="text-xs text-muted-foreground">Balance</div>
                      </div>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {selected?.balance && (
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Balance: <span className="text-contrast-high">{selected.balance} {selected.symbol}</span></span>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs text-accent hover:text-accent-foreground"
            onClick={() => onAmountChange(selected.balance || "0")}
          >
            MAX
          </Button>
        </div>
      )}
    </div>
  );
}