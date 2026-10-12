"use client";

import type { ReactNode } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import type { LucideIcon } from "lucide-react";

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  icon?: LucideIcon;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  action?: ReactNode;
}

export function FormField({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  error,
  registration,
  action,
}: FormFieldProps) {
  return (
    <div>
      <div className="field-label-row">
        <label>{label}</label>
        {action}
      </div>
      <div className="input-wrap">
        {Icon && <Icon className="input-icon" size={15} />}
        <input
          type={type}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          {...registration}
          className={error ? "input input-error" : "input"}
        />
      </div>
      {error?.message && <p className="field-error">{error.message}</p>}
    </div>
  );
}
