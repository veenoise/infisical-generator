import type { InfisicalFormData } from "@/types/infisical";

export const DEFAULT_CONFIG: InfisicalFormData = {
  infisicalUrl: "https://app.infisical.com",
  projectId: "your-project-id",
  envSlug: "dev",
  folderPath: "/",
  destinationPath: "/infisical-agent/.env",
  machineIdentityId: "your-machine-identity-id",
  clientId: "your-universal-auth-client-id",
  clientSecret: "your-universal-auth-client-secret",
  containerClientIdDirectory: "/tmp/client-id",
  containerClientSecretDirectory: "/tmp/client-secret"
};

export const STORAGE_KEY = "infisical_agent_generator_state_v1";
