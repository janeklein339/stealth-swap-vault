import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, Shield, Eye } from 'lucide-react';

export function WalletConnect() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
            <Wallet className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>
            Connect your wallet to start using Stealth Swap Vault for private cross-chain swaps
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <ConnectButton />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-500" />
            <CardTitle className="text-lg">Wallet Connected</CardTitle>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Eye className="h-3 w-3 mr-1" />
            Private
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Address</div>
          <div className="font-mono text-sm bg-muted p-2 rounded">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Network</div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{chain?.name}</Badge>
          </div>
        </div>
        
        {balance && (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Balance</div>
            <div className="font-mono text-sm">
              {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
            </div>
          </div>
        )}
        
        <div className="pt-2">
          <ConnectButton />
        </div>
      </CardContent>
    </Card>
  );
}
