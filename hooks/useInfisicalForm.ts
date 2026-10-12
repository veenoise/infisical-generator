"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_CONFIG, STORAGE_KEY } from "@/lib/constants";
import { buildGeneratedOutputs } from "@/lib/infisical-yaml";
import {
  infisicalFormSchema,
  type GeneratedOutput,
  type InfisicalFormData,
} from "@/types/infisical";

interface UseInfisicalFormReturn {
  form: UseFormReturn<InfisicalFormData>;
  outputs: GeneratedOutput;
  resetToDefaults: () => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
}

export function useInfisicalForm(): UseInfisicalFormReturn {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const form = useForm<InfisicalFormData>({
    resolver: zodResolver(infisicalFormSchema),
    defaultValues: DEFAULT_CONFIG,
    mode: "onChange",
  });
  const values = form.watch();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) form.reset({ ...DEFAULT_CONFIG, ...JSON.parse(saved) });
    } catch {
      console.error("Failed to read saved Infisical configuration");
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      } catch {
        console.error("Failed to save Infisical configuration");
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const outputs = useMemo(
    () => buildGeneratedOutputs(values as InfisicalFormData),
    [values],
  );

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 3000);
  };

  const resetToDefaults = () => {
    if (!window.confirm("Are you sure you want to reset all form values to defaults?")) {
      return;
    }
    form.reset(DEFAULT_CONFIG);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CONFIG));
    showToast("Reset to default configuration");
  };

  return { form, outputs, resetToDefaults, toastMessage, showToast };
}
