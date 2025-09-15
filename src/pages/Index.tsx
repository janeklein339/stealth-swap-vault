import { SwapInterface } from "@/components/SwapInterface";
import { WalletConnect } from "@/components/WalletConnect";
import { ArrowLeftRight, Zap, Globe, Lock } from "lucide-react";
import privacyShield from "@/assets/privacy-shield.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 glass-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center relative">
                <ArrowLeftRight className="h-4 w-4 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                  <Lock className="h-2 w-2 text-purple-600" />
                </div>
              </div>
              <span className="text-xl font-bold text-white">
                PrivateSwap
              </span>
            </div>
            <nav className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Security
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Support
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-8">
            <img src={privacyShield} alt="Privacy Shield" className="w-5 h-5 rounded" />
            <span className="text-sm text-white font-medium">Zero-Knowledge Cross-Chain Swaps</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">
              Swap Anywhere,
            </span>
            <br />
            <span className="text-foreground">Stay Private</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Execute cross-chain swaps with encrypted amounts, preventing MEV exploitation 
            while maintaining complete transaction privacy across all supported networks.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            <div className="glass-card rounded-xl p-6 text-center hover:border-primary/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-4 relative">
                <Lock className="h-6 w-6 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <ArrowLeftRight className="h-2 w-2 text-purple-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">MEV Protected</h3>
              <p className="text-muted-foreground text-sm">
                Advanced encryption prevents front-running and sandwich attacks
              </p>
            </div>
            
            <div className="glass-card rounded-xl p-6 text-center hover:border-accent/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg gradient-secondary flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Multi-Chain</h3>
              <p className="text-muted-foreground text-sm">
                Seamless swaps across Ethereum, Polygon, Arbitrum, and more
              </p>
            </div>
            
            <div className="glass-card rounded-xl p-6 text-center hover:border-primary/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground text-sm">
                Complete swaps in 3-5 minutes with optimized routing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wallet Connection */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Connect Your Wallet</h2>
              <p className="text-muted-foreground">
                Connect your wallet to start using Stealth Swap Vault for private cross-chain swaps
              </p>
            </div>
            <WalletConnect />
          </div>
        </div>
      </section>

      {/* Swap Interface */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <SwapInterface />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center relative">
                <ArrowLeftRight className="h-3 w-3 text-white" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full flex items-center justify-center">
                  <Lock className="h-1 w-1 text-purple-600" />
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                © 2024 PrivateSwap. Privacy-first DeFi.
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Audit</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
