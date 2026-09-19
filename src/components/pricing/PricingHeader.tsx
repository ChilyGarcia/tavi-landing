// src/components/pricing/PricingHeader.tsx
import { Sparkles, Flame } from "lucide-react";
import { PRICING_FLAGS } from "@/config/pricing";

export function PricingHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
   

      <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
        Todo tu restaurante en un solo sistema. <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent dark:from-amber-400 dark:to-orange-400">
          Sin límites de pedidos.
        </span>
      </h2>

      <p className="mt-4 text-base text-muted-foreground md:text-lg font-medium">
        Pedidos ilimitados en todos los planes y facturación electrónica DIAN incluida desde el Plan
        Pro. El precio que ves es el que pagas.
      </p>
    </div>
  );
}
