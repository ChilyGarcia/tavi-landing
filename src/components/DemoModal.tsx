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
import { formatCOP, PLANS } from "@/config/pricing";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const LAST_SUBMIT_KEY = "tavi_demo_last_submit";
const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutos entre solicitudes desde el mismo navegador

const NO_ESTOY_SEGURO = "No estoy seguro / quiero asesoría";
const PLAN_CHOICES = [...PLANS.map((p) => p.name), NO_ESTOY_SEGURO];

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
      <DialogContent className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-[550px] sm:rounded-3xl border-0 shadow-2xl">
        <div className="relative overflow-hidden bg-slate-900 px-6 pb-8 pt-8 sm:px-8 sm:pt-10">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <DialogHeader className="relative z-10 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
                <ChefHat className="h-7 w-7" />
              </div>
              <div>
                <DialogTitle className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Solicita tu demo
                </DialogTitle>
                <DialogDescription className="text-slate-300 mt-1.5 text-sm sm:text-base">
                  Déjanos tus datos y te contactamos en menos de 24 horas.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <form className="bg-white flex flex-col" onSubmit={handleSubmit}>
          <div className="grid gap-6 px-6 py-6 sm:px-8 sm:py-8">
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

            <div className="grid gap-3">
              <Label className="text-base font-bold text-slate-900">¿Qué plan te interesa?</Label>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
                {PLAN_CHOICES.map((choice) => {
                  const plan = PLANS.find((p) => p.name === choice);
                  const selected = form.plan === choice;
                  return (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => updateField("plan", choice)}
                      aria-pressed={selected}
                      className={`relative flex items-center justify-center rounded-xl border-2 px-3 py-3 text-xs sm:text-sm font-bold transition-all ${
                        selected
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-slate-100 bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {selected && (
                        <div className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                      {plan ? plan.name.replace("Plan ", "") : "Asesoría"}
                    </button>
                  );
                })}
              </div>
              {(() => {
                const plan = PLANS.find((p) => p.name === form.plan);
                return plan ? (
                  <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                    ${formatCOP(plan.monthly)} COP / mes · {plan.forWho}
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                    Sin problema, te ayudamos a elegir el plan ideal para tu negocio.
                  </p>
                );
              })()}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="restaurante" className="font-bold text-slate-700">Nombre del restaurante</Label>
              <Input
                id="restaurante"
                required
                value={form.restaurante}
                onChange={(e) => updateField("restaurante", e.target.value)}
                placeholder="La Casa del Sabor"
                className="rounded-xl border-slate-200 focus-visible:ring-primary"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contacto" className="font-bold text-slate-700">Tu nombre</Label>
              <Input
                id="contacto"
                required
                value={form.contacto}
                onChange={(e) => updateField("contacto", e.target.value)}
                placeholder="María González"
                className="rounded-xl border-slate-200 focus-visible:ring-primary"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="email" className="font-bold text-slate-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="tu@restaurante.com"
                  className="rounded-xl border-slate-200 focus-visible:ring-primary"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefono" className="font-bold text-slate-700">Teléfono</Label>
                <Input
                  id="telefono"
                  required
                  value={form.telefono}
                  onChange={(e) => updateField("telefono", e.target.value)}
                  placeholder="+57 300 123 4567"
                  className="rounded-xl border-slate-200 focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="mensaje" className="font-bold text-slate-700">Cuéntanos qué necesitas (opcional)</Label>
              <Textarea
                id="mensaje"
                rows={3}
                value={form.mensaje}
                onChange={(e) => updateField("mensaje", e.target.value)}
                placeholder="Ej: queremos pedidos por QR y ver métricas por sede."
                className="rounded-xl border-slate-200 focus-visible:ring-primary resize-none"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 bg-slate-50 px-6 py-5 sm:px-8 border-t border-slate-100 rounded-b-3xl">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto rounded-xl font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-200"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full sm:w-auto rounded-xl bg-primary hover:bg-primary/90 text-white font-bold px-8 shadow-sm"
            >
              {loading ? "Enviando..." : "Enviar solicitud"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
