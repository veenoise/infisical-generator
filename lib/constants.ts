import type { InfisicalFormData } from "@/types/infisical";

export const DEFAULT_CONFIG: InfisicalFormData = {
  infisicalUrl: "https://app.infisical.com",
  projectId: "your-project-id",
  envSlug: "dev",
  folderPath: "/",
  destinationPath: "/infisical-agent/.env",
  machineIdentityId: "arn:aws:ssm:<region>:<account-id>:parameter/infisical/machine-identity-id",
  clientId: "arn:aws:ssm:<region>:<account-id>:parameter/infisical/client-id",
  clientSecret: "arn:aws:ssm:<region>:<account-id>:parameter/infisical/client-secret",
  containerClientIdDirectory: "/tmp/client-id",
  containerClientSecretDirectory: "/tmp/client-secret"
};

export const STORAGE_KEY = "infisical_agent_generator_state_v2";
