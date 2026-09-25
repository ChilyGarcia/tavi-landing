export type BillingCycle = "monthly" | "annual";

export const PRICING_FLAGS = {
  dianAvailable: false, // DIAN aún no implementada según README
  pricesIncludeVAT: true, // "IVA INCLUIDO"
  noLockIn: true, // TODO(Juan): confirmar
  freeMigration: true, // TODO(Juan): confirmar
  localSupportCucuta: true, // TODO(Juan): confirmar
  founderBannerActive: false, // NO mostrar banner de Precio Fundador
};

export const PLANS = [
  {
    id: 'vip', name: 'VIP Ilimitado',
    forWho: 'Para cadenas y negocios de alto flujo.',
    monthly: 199900, annual: 1999000, highlighted: false,
    limits: { users: -1, branches: 2, loyaltyCards: -1, dianDocs: 1000 },
    highlights: [
      { text: 'Usuarios y tarjetas ilimitados, 2 sedes (adicionales a cotizar)' },
      { text: 'Inventario y recetas incluido' },
      { text: 'Pantalla TV: llamador de turnos y carrusel' },
      { text: '30 facturas electrónicas DIAN al mes', dian: true },
      { text: 'Account Manager dedicado y soporte 24/7' },
    ],
  },
  {
    id: 'pro', name: 'Pro Fidelidad', badge: 'MÁS POPULAR',
    forWho: 'Para negocios en crecimiento que quieren que sus clientes vuelvan.',
    monthly: 99900, annual: 999000, highlighted: true,
    limits: { users: 10, branches: 1, loyaltyCards: 5, dianDocs: 500 },
    highlights: [
      { text: 'Todo el Esencial, con más equipo' },
      { text: 'Anuncios y promociones en tu menú QR' },
      { text: '30 facturas electrónicas DIAN al mes', dian: true },
      { text: 'Soporte prioritario 7 días a la semana' },
    ],
  },
  {
    id: 'esencial', name: 'Esencial',
    forWho: 'Para negocios de un local que quieren ordenar su operación.',
    monthly: 55000, annual: 550000, highlighted: false,
    limits: { users: 2, branches: 1, loyaltyCards: 1, dianDocs: 0 },
    highlights: [
      { text: 'Sistema operativo completo: QR, sala, cocina, caja' },
      { text: 'Pedidos ilimitados' },
      { text: 'Soporte por WhatsApp (Lunes a Sábado)' },
    ],
  },
] as const;

// Bolsas de facturas: cualquier plan las puede comprar (Esencial no trae facturas incluidas)
export const DIAN_BUNDLES = [
  { id: 'bolsa-200',  invoices: 200,  price: 20000 },
  { id: 'bolsa-500',  invoices: 500,  price: 45000 },
  { id: 'bolsa-1000', invoices: 1000, price: 85000 },
  { id: 'bolsa-3000', invoices: 3000, price: 240000 },
] as const;

export const BUNDLE_VALIDITY_MONTHS = 6;
export const DIAN_ONBOARDING_FEE = 150000;

export function formatCOP(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function annualMonthlyEquiv(plan: { annual: number }) {
  return Math.round(plan.annual / 12);
}

export function annualSavings(plan: { monthly: number; annual: number }) {
  return plan.monthly * 12 - plan.annual;
}

export function perDay(plan: { monthly: number; annual: number }, cycle: "monthly" | "annual") {
  if (cycle === "annual") {
    return Math.round(plan.annual / 360);
  }
  return Math.round(plan.monthly / 30);
}

export const TABLE_CATEGORIES = [
  {
    name: "Pedidos y menú QR",
    features: [
      { name: "Pedidos", e: "Ilimitados", p: "Ilimitados", v: "Ilimitados" },
      { name: "Mesa, recoger y domicilio con mapa", e: true, p: true, v: true },
      { name: "Gestión de domiciliarios y comisiones", e: true, p: true, v: true },
      { name: "Reserva de mesa y seguimiento en vivo", e: true, p: true, v: true },
      { name: "Varias cartas y personalización", e: true, p: true, v: true },
      { name: "Link propio (ej: tu-restaurante.taviorders.com)", e: true, p: true, v: true },
    ],
  },
  {
    name: "Operación",
    features: [
      { name: "Sala con mapa de mesas", e: true, p: true, v: true },
      { name: "Cocina KDS con semáforo y voz", e: true, p: true, v: true },
      { name: "Pago mixto y cuentas separadas", e: true, p: true, v: true },
      { name: "Caja, arqueo e historial de cierres", e: true, p: true, v: true },
      { name: "Impresión térmica automática", e: true, p: true, v: true },
    ],
  },
  {
    name: "Clientes y marketing",
    features: [
      { name: "Tarjetas de fidelidad en Google / Apple Wallet", e: "1", p: "5", v: "Ilimitadas" },
      { name: "Referidos y antifraude", e: false, p: true, v: true },
      { name: "Anuncios y promociones en el menú", e: false, p: true, v: true },
      { name: "Pantalla TV: turnos y carrusel", e: false, p: false, v: true },
    ],
  },
  {
    name: "Equipo y sedes",
    features: [
      { name: "Usuarios", e: "2", p: "10", v: "Ilimitados" },
      { name: "Sedes", e: "1", p: "1", v: "2 (adicionales a cotizar)" },
      { name: "Roles y permisos personalizados", e: true, p: true, v: true },
    ],
  },
  {
    name: "Inventario y Recetas",
    features: [
      { name: "Control de stock en tiempo real", e: "Add-on $29.900", p: "Add-on $29.900", v: "✓ Incluido" },
      { name: "Recetas con descuento automático", e: "Add-on $29.900", p: "Add-on $29.900", v: "✓ Incluido" },
      { name: "Costo real por plato", e: "Add-on $29.900", p: "Add-on $29.900", v: "✓ Incluido" },
      { name: "Alertas de stock bajo", e: "Add-on $29.900", p: "Add-on $29.900", v: "✓ Incluido" },
    ],
  },
  {
    name: "Reportes",
    features: [
      { name: "Dashboard y exportación a Excel", e: true, p: true, v: true },
      { name: "Asesor de Negocio con IA (Análisis de ventas)", e: false, p: false, v: true },
    ],
  },
  {
    name: "Facturación DIAN",
    isDian: true,
    features: [
      { name: "Facturas electrónicas incluidas al mes", e: "— (compra bolsas)", p: "30", v: "30" },
      { name: "Bolsas de facturas desde $20.000", e: true, p: true, v: true },
      { name: "Habilitación DIAN", e: "$150.000", p: "Gratis en anual", v: "Gratis" },
    ],
  },
  {
    name: "Soporte y Éxito del Cliente",
    features: [
      { name: "Canal de atención", e: "WhatsApp", p: "WhatsApp", v: "WhatsApp y llamada" },
      { name: "Disponibilidad", e: "Lunes a Sábado", p: "7 días a la semana", v: "24/7" },
      { name: "Nivel de atención", e: "Estándar", p: "Cola prioritaria", v: "Account Manager dedicado" },
      { name: "Asistente TAVI con IA (Ayuda 24/7)", e: true, p: true, v: true },
    ],
  },
];

export const ADDONS = [
  {
    id: 'inventario',
    name: 'Inventario y Recetas',
    description: 'Control de stock, recetas con descuento automático y costo real por plato.',
    monthly: 29900,
    includedInPlans: ['vip'], // gratis en estos planes
    availableForPlans: ['esencial', 'pro'], // se puede comprar en estos
    highlights: [
      { icon: 'Package', text: 'Inventario en tiempo real con alertas de stock bajo' },
      { icon: 'ChefHat', text: 'Recetas vinculadas: cada venta descuenta ingredientes' },
      { icon: 'TrendingUp', text: 'Costo real por plato vs precio de venta' },
    ],
  },
] as const;
