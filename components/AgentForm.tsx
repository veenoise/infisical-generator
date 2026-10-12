"use client";

import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Eye, EyeOff, Globe, KeyRound, Sliders } from "lucide-react";
import type { InfisicalFormData } from "@/types/infisical";
import { CopyButton } from "./CopyButton";
import { FormField } from "./FormField";

export function AgentForm({
  form,
  onCopied,
}: {
  form: UseFormReturn<InfisicalFormData>;
  onCopied: (message: string) => void;
}) {
  const [showSecret, setShowSecret] = useState(false);
  const { register, formState: { errors } } = form;
  const values = form.watch();

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
        <div className="credentials">
          <h3><KeyRound size={14} /> Universal Auth Credentials</h3>
          <FormField label="INFISICAL_MACHINE_IDENTITY_ID" placeholder="Machine identity ID"
            registration={register("machineIdentityId")} error={errors.machineIdentityId}
            action={<CopyButton text={values.machineIdentityId} label="Copy ID" onCopied={onCopied} />} />
          <FormField label="INFISICAL_UNIVERSAL_AUTH_CLIENT_ID" placeholder="Client ID string"
            registration={register("clientId")} error={errors.clientId}
            action={<CopyButton text={values.clientId} label="Copy Client ID" onCopied={onCopied} />} />
          <FormField label="INFISICAL_UNIVERSAL_AUTH_CLIENT_SECRET" type={showSecret ? "text" : "password"}
            placeholder="Client Secret string" registration={register("clientSecret")} error={errors.clientSecret}
            action={<div className="field-actions">
              <button type="button" className="text-button" onClick={() => setShowSecret(!showSecret)}>
                {showSecret ? <EyeOff size={12} /> : <Eye size={12} />} {showSecret ? "Hide" : "Show"}
              </button>
              <CopyButton text={values.clientSecret} label="Copy Secret" onCopied={onCopied} />
            </div>} />
        </div>
      </form>
    </section>
  );
}
