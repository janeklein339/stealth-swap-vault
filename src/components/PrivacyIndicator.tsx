import { Shield, Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PrivacyIndicatorProps {
  isEncrypted: boolean;
  onToggle: (encrypted: boolean) => void;
}

export function PrivacyIndicator({ isEncrypted, onToggle }: PrivacyIndicatorProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="glass-card rounded-full p-3 mx-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggle(!isEncrypted)}
          className="rounded-full h-12 w-12 hover:scale-110 transition-all duration-300"
        >
          {isEncrypted ? (
            <Shield className="h-6 w-6 text-primary animate-glow" />
          ) : (
            <Lock className="h-6 w-6 text-muted-foreground" />
          )}
        </Button>
      </div>
    </div>
  );
}

export function MEVProtectionBadge() {
  return (
    <div className="flex items-center gap-2 glass-card rounded-lg px-3 py-2">
      <Shield className="h-4 w-4 text-white" />
      <span className="text-sm font-medium text-white">MEV Protected</span>
      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
    </div>
  );
}

export function EncryptionStatus({ isEncrypted }: { isEncrypted: boolean }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {isEncrypted ? (
        <>
          <EyeOff className="h-4 w-4 text-primary" />
          <span className="text-primary font-medium">Amount Encrypted</span>
        </>
      ) : (
        <>
          <Eye className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Amount Visible</span>
        </>
      )}
    </div>
  );
}