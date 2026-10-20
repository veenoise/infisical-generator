"use client";

import { CheckCircle2 } from "lucide-react";
import { AgentForm } from "@/components/AgentForm";
import { Header } from "@/components/Header";
import { OutputViewer } from "@/components/OutputViewer";
import { useInfisicalForm } from "@/hooks/useInfisicalForm";

export default function Home() {
  const { form, outputs, resetToDefaults, toastMessage, showToast } = useInfisicalForm();

  return (
    <div className="app-shell">
      <Header onReset={resetToDefaults} />
      <main className="main-content">
        <div className="content-grid">
          <AgentForm form={form} />
          <OutputViewer outputs={outputs} onCopied={showToast} />
        </div>
      </main>
      {toastMessage && <div className="toast"><CheckCircle2 size={16} /> {toastMessage}</div>}
      <footer>Infisical Generator</footer>
    </div>
  );
}
