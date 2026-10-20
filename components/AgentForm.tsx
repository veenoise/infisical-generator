"use client";

import type { UseFormReturn } from "react-hook-form";
import { Globe, Sliders } from "lucide-react";
import type { InfisicalFormData } from "@/types/infisical";
import { FormField } from "./FormField";

export function AgentForm({ form }: { form: UseFormReturn<InfisicalFormData> }) {
  const { register, formState: { errors } } = form;

  return (
    <section className="card form-card">
      <div className="card-heading">
        <h2><Sliders size={15} /> Agent Configuration</h2>
        <span>All fields saved automatically</span>
      </div>
      <form onSubmit={(event) => event.preventDefault()} className="form-stack">
        <FormField label="Infisical Server URL" type="url" placeholder="https://infisical.example.com"
          icon={Globe} registration={register("infisicalUrl")} error={errors.infisicalUrl} />
        <div className="field-grid">
          <FormField label="Project ID" placeholder="Project ID UUID" registration={register("projectId")} error={errors.projectId} />
          <FormField label="Env Slug" placeholder="prod / dev / staging" registration={register("envSlug")} error={errors.envSlug} />
        </div>
        <div className="field-grid">
          <FormField label="Folder Location" placeholder="/" registration={register("folderPath")} error={errors.folderPath} />
          <FormField label="Destination Path" placeholder="/infisical-agent/.env" registration={register("destinationPath")} error={errors.destinationPath} />
        </div>
        <div className="field-grid">
          <FormField label="Container Client ID Directory" placeholder="/tmp/client-id" registration={register("containerClientIdDirectory")} error={errors.containerClientIdDirectory} />
          <FormField label="Container Client Secret Directory" placeholder="/tmp/client-secret" registration={register("containerClientSecretDirectory")} error={errors.containerClientSecretDirectory} />
        </div>
      </form>
    </section>
  );
}
