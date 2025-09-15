import { useState } from "react";
import { ChevronDown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Chain {
  id: string;
  name: string;
  symbol: string;
  icon: string;
}

const chains: Chain[] = [
  { id: "ethereum", name: "Ethereum", symbol: "ETH", icon: "🟦" },
  { id: "polygon", name: "Polygon", symbol: "MATIC", icon: "🟣" },
  { id: "arbitrum", name: "Arbitrum", symbol: "ARB", icon: "🔵" },
  { id: "optimism", name: "Optimism", symbol: "OP", icon: "🔴" },
  { id: "bsc", name: "BSC", symbol: "BNB", icon: "🟡" },
];

interface ChainSelectorProps {
  selected: Chain | null;
  onSelect: (chain: Chain) => void;
  label: string;
}

export function ChainSelector({ selected, onSelect, label }: ChainSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-muted-foreground">{label}</label>
        <div className="flex items-center gap-1 text-xs text-white">
          <Shield className="h-3 w-3" />
          <span>Private</span>
        </div>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="glass" className="w-full justify-between h-12">
            {selected ? (
              <div className="flex items-center gap-3">
                <span className="text-lg">{selected.icon}</span>
                <div className="text-left">
                  <div className="font-medium">{selected.name}</div>
                  <div className="text-xs text-muted-foreground">{selected.symbol}</div>
                </div>
              </div>
            ) : (
              <span className="text-muted-foreground">Select chain</span>
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-56 glass-card border-border/50">
          {chains.map((chain) => (
            <DropdownMenuItem
              key={chain.id}
              onClick={() => onSelect(chain)}
              className="cursor-pointer py-3 hover:bg-primary/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{chain.icon}</span>
                <div>
                  <div className="font-medium">{chain.name}</div>
                  <div className="text-xs text-muted-foreground">{chain.symbol}</div>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}