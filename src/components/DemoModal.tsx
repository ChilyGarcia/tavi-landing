import { useEffect, useState } from "react";
import { ChefHat, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatCOP, PRICING_PLANS } from "@/lib/pricing-plans";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const LAST_SUBMIT_KEY = "tavi_demo_last_submit";
const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutos entre solicitudes desde el mismo navegador

const NO_ESTOY_SEGURO = "No estoy seguro / quiero asesoría";
const PLAN_CHOICES = [...PRICING_PLANS.map((p) => p.name), NO_ESTOY_SEGURO];

const initialForm = {
  restaurante: "",
  contacto: "",
  email: "",
  telefono: "",
  mensaje: "",
  plan: NO_ESTOY_SEGURO,
  botcheck: "",
};

function msUntilNextSubmit(): number {
  const last = Number(localStorage.getItem(LAST_SUBMIT_KEY) ?? 0);
  return Math.max(0, last + COOLDOWN_MS - Date.now());
}

export function DemoModal({
  open,
  onOpenChange,
  initialPlan,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialPlan?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (open) {
      setForm((prev) => ({ ...prev, plan: initialPlan ?? NO_ESTOY_SEGURO }));
    }
  }, [open, initialPlan]);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function resetForm() {
    setForm(initialForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Campo trampa: invisible para personas, los bots suelen rellenar todos los inputs.
    if (form.botcheck) {
      onOpenChange(false);
      resetForm();
      return;
    }

    const remainingMs = msUntilNextSubmit();
    if (remainingMs > 0) {
      const minutes = Math.ceil(remainingMs / 60000);
      toast.error("Espera un momento", {
        description: `Ya enviamos tu solicitud. Intenta de nuevo en ${minutes} minuto${minutes === 1 ? "" : "s"}.`,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          subject: `Nueva solicitud de demo — ${form.restaurante} (${form.plan})`,
          from_name: form.contacto,
          restaurante: form.restaurante,
          contacto: form.contacto,
          email: form.email,
          telefono: form.telefono,
          plan_interes: form.plan,
          mensaje: form.mensaje || "(sin mensaje)",
          botcheck: "",
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "No pudimos enviar la solicitud.");
      }

      localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));
      onOpenChange(false);
      resetForm();
      toast.success("¡Solicitud enviada!", {
        description: "Te contactamos en menos de 24 horas para activar tu cuenta.",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "No pudimos enviar la solicitud.";
      toast.error("No se pudo enviar la solicitud", { description: message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) resetForm();
        onOpenChange(value);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-lg">
        <div
          className="relative overflow-hidden px-6 pb-6 pt-7 text-primary-foreground"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="tavi-grain pointer-events-none absolute inset-0 opacity-20" />
          <DialogHeader className="relative">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur-sm">
                <ChefHat className="h-5 w-5" />
              </span>
              <div>
                <DialogTitle className="font-display text-2xl text-primary-foreground">
                  Solicita tu demo
                </DialogTitle>
                <DialogDescription className="text-primary-foreground/85">
                  Déjanos tus datos y te contactamos en menos de 24 horas.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <form className="grid gap-4 px-6 pb-6 pt-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            value={form.botcheck}
            onChange={(e) => updateField("botcheck", e.target.value)}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            aria-hidden="true"
          />

          <div className="grid gap-1.5">
            <Label>¿Qué plan te interesa?</Label>
            <div className="flex flex-wrap gap-2">
              {PLAN_CHOICES.map((choice) => {
                const plan = PRICING_PLANS.find((p) => p.name === choice);
                const selected = form.plan === choice;
                return (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => updateField("plan", choice)}
                    aria-pressed={selected}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                      selected
                        ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {selected && <Check className="h-3 w-3" />}
                    {plan ? plan.name.replace("Plan ", "") : "No estoy seguro"}
                  </button>
                );
              })}
            </div>
            {(() => {
              const plan = PRICING_PLANS.find((p) => p.name === form.plan);
              return plan ? (
                <p className="text-xs text-muted-foreground">
                  ${formatCOP(plan.monthly)} COP / mes · {plan.tagline}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Sin problema, te ayudamos a elegir el plan ideal para tu negocio.
                </p>
              );
            })()}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="restaurante">Nombre del restaurante</Label>
            <Input
              id="restaurante"
              required
              value={form.restaurante}
              onChange={(e) => updateField("restaurante", e.target.value)}
              placeholder="La Casa del Sabor"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="contacto">Tu nombre</Label>
            <Input
              id="contacto"
              required
              value={form.contacto}
              onChange={(e) => updateField("contacto", e.target.value)}
              placeholder="María González"
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="tu@restaurante.com"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                required
                value={form.telefono}
                onChange={(e) => updateField("telefono", e.target.value)}
                placeholder="+573001234567"
              />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="mensaje">Cuéntanos qué necesitas (opcional)</Label>
            <Textarea
              id="mensaje"
              rows={3}
              value={form.mensaje}
              onChange={(e) => updateField("mensaje", e.target.value)}
              placeholder="Ej: queremos pedidos por QR y ver métricas por sede."
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar solicitud"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
