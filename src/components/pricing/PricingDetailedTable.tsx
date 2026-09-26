import { useState } from "react";
import { Check, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { PLANS, PRICING_FLAGS, TABLE_CATEGORIES } from "@/config/pricing";

function CollapsibleCategory({
  cat,
  activePlanIndex,
  renderValue,
}: {
  cat: (typeof TABLE_CATEGORIES)[number];
  activePlanIndex: number;
  renderValue: (val: string | boolean) => React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true); // Abiertas por defecto

  if ("isDian" in cat && cat.isDian && !PRICING_FLAGS.dianAvailable) return null;

  return (
    <div className="border-b border-slate-100 last:border-b-0">
      {/* Category Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-50 px-5 py-4 flex items-center justify-between hover:bg-slate-100/80 transition-colors"
      >
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
          {cat.name}
          {"isDian" in cat && cat.isDian && !PRICING_FLAGS.dianAvailable && (
            <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
              Próximamente
            </span>
          )}
        </h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-slate-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-400" />
        )}
      </button>

      {/* Features */}
      {isOpen && (
        <div className="divide-y divide-slate-50">
          {cat.features.map((feat, featIdx) => (
            <div
              key={featIdx}
              className="grid grid-cols-2 sm:grid-cols-4 hover:bg-slate-50/50 transition-colors"
            >
              <div className="p-5 text-sm text-slate-600 flex items-center col-span-2 sm:col-span-1 border-b border-slate-50 sm:border-b-0 font-medium">
                {feat.name}
              </div>

              {/* Mobile View: only show active tab */}
              <div className="sm:hidden p-5 text-center bg-slate-50/50 col-span-2 flex items-center justify-center">
                {renderValue([feat.e, feat.p, feat.v][activePlanIndex])}
              </div>

              {/* Desktop View: show all in order VIP, Pro, Esencial */}
              <div className="hidden sm:flex items-center justify-center p-5 border-l border-slate-100">
                {renderValue(feat.v)}
              </div>
              <div className="hidden sm:flex items-center justify-center p-5 border-l border-slate-100 bg-amber-50/30">
                {renderValue(feat.p)}
              </div>
              <div className="hidden sm:flex items-center justify-center p-5 border-l border-slate-100">
                {renderValue(feat.e)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function PricingDetailedTable() {
  const [activeTab, setActiveTab] = useState<"vip" | "pro" | "esencial">("pro");

  const renderValue = (val: string | boolean) => {
    if (val === true) return <Check className="h-5 w-5 text-emerald-500 mx-auto sm:mx-0" />;
    if (val === false) return <Minus className="h-5 w-5 text-slate-300 mx-auto sm:mx-0" />;

    if (typeof val === "string" && val.startsWith("Add-on")) {
      return (
        <a
          href="#inventario-addon"
          className="inline-flex items-center rounded-md bg-amber-100/80 px-2.5 py-1 text-xs font-bold text-amber-800 hover:bg-amber-200/80 transition-colors cursor-pointer"
        >
          {val.includes("29.900") ? "+$29.9K/mes" : val}
        </a>
      );
    }
    if (typeof val === "string" && val === "✓ Incluido") {
      return <span className="text-sm font-bold text-emerald-600">{val}</span>;
    }

    return <span className="text-sm font-semibold text-slate-700">{val}</span>;
  };

  const activePlanIndex = activeTab === "vip" ? 0 : activeTab === "pro" ? 1 : 2;

  return (
    <section id="tabla-completa" className="bg-[#FAF9F6] py-12 md:py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Comparativa detallada
          </h2>
          <p className="mt-4 text-lg text-slate-600 font-medium">
            Conoce a fondo qué incluye cada plan.
          </p>
        </div>

        {/* Mobile Tabs */}
        <div className="flex sm:hidden p-1.5 mb-8 bg-slate-200/60 rounded-xl shadow-inner">
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setActiveTab(plan.id as "esencial" | "pro" | "vip")}
              className={`flex-1 py-3 text-xs uppercase tracking-wider font-black rounded-lg transition-all ${
                activeTab === plan.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {plan.name.replace("Plan ", "").replace(" Fidelidad", "").replace(" Ilimitado", "")}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm relative overflow-clip">
          {/* Desktop Header (Sticky) */}
          <div className="hidden sm:grid grid-cols-4 border-b border-slate-200 bg-slate-50/95 sticky top-0 z-20 backdrop-blur-md">
            <div className="p-5 flex items-end">
              <span className="font-bold text-slate-900">Características</span>
            </div>
            {PLANS.map((plan) => {
              const isPro = plan.id === "pro";
              return (
                <div
                  key={plan.id}
                  className={`p-5 text-center border-l border-slate-200 ${isPro ? "bg-amber-50/50" : ""}`}
                >
                  {"badge" in plan && plan.badge ? (
                    <div className="mx-auto w-fit rounded-full bg-amber-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      {plan.badge}
                    </div>
                  ) : (
                    <span className="block h-4 mb-1.5" /> // Spacer
                  )}
                  <span className="font-bold text-slate-900 text-lg">{plan.name}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col">
            {TABLE_CATEGORIES.map((cat, catIdx) => (
              <CollapsibleCategory
                key={catIdx}
                cat={cat}
                activePlanIndex={activePlanIndex}
                renderValue={renderValue}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
