import type { InfisicalFormData } from "@/types/infisical";

export const DEFAULT_CONFIG: InfisicalFormData = {
  infisicalUrl: "https://app.infisical.com",
  projectId: "your-project-id",
  envSlug: "dev",
  folderPath: "/",
  destinationPath: "/infisical-agent/.env",
  containerClientIdDirectory: "/tmp/client-id",
  containerClientSecretDirectory: "/tmp/client-secret"
};

export const STORAGE_KEY = "infisical_agent_generator_state_v2";
