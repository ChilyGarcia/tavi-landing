import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Landing } from "@/pages/Landing";
import { Support } from "@/pages/Support";
import { NotFound } from "@/pages/NotFound";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/support" element={<Support />} />
        <Route path="/soporte" element={<Navigate to="/support" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  );
}
