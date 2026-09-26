// src/config/pricing.test.ts
import {
  PLANS,
  formatCOP,
  annualMonthlyEquiv,
  annualSavings,
  perDay,
  DIAN_BUNDLES,
} from "./pricing";

// Bun exposes describe, it, expect globally at runtime
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: (actual: unknown) => {
  toBe: (expected: unknown) => void;
  toContain: (expected: string) => void;
};

describe("Pricing utilities & calculations (V5)", () => {
  // Por id: el orden de PLANS es de presentación (VIP va primero en la UI).
  const byId = (id: string) => {
    const plan = PLANS.find((p) => p.id === id);
    if (!plan) throw new Error(`Plan ${id} no existe`);
    return plan;
  };
  const esencial = byId("esencial");
  const pro = byId("pro");
  const vip = byId("vip");

  it("calculates Plan Esencial correctly", () => {
    expect(annualMonthlyEquiv(esencial)).toBe(45833);
    expect(annualSavings(esencial)).toBe(110000);
    expect(perDay(esencial, "monthly")).toBe(1833);
    expect(perDay(esencial, "annual")).toBe(1528);
  });

  it("calculates Plan Pro correctly", () => {
    expect(annualMonthlyEquiv(pro)).toBe(83250);
    expect(annualSavings(pro)).toBe(199800);
    expect(perDay(pro, "monthly")).toBe(3330);
    expect(perDay(pro, "annual")).toBe(2775);
  });

  it("calculates Plan VIP correctly", () => {
    expect(annualMonthlyEquiv(vip)).toBe(166583);
    expect(annualSavings(vip)).toBe(399800);
    expect(perDay(vip, "monthly")).toBe(6663);
    expect(perDay(vip, "annual")).toBe(5553);
  });

  it("calculates DIAN bundles correctly", () => {
    // 200 → $100 · 500 → $90 · 1.000 → $85 · 3.000 → $80
    const [b200, b500, b1000, b3000] = DIAN_BUNDLES;
    expect(Math.round(b200.price / b200.invoices)).toBe(100);
    expect(Math.round(b500.price / b500.invoices)).toBe(90);
    expect(Math.round(b1000.price / b1000.invoices)).toBe(85);
    expect(Math.round(b3000.price / b3000.invoices)).toBe(80);
  });

  it("formats COP correctly", () => {
    const formatted = formatCOP(109900);
    expect(formatted).toContain("109.900");
  });
});
