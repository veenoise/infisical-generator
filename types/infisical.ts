import { z } from "zod";

export const infisicalFormSchema = z.object({
  infisicalUrl: z.string().url("Enter a valid URL"),
  projectId: z.string().trim().min(1, "Project ID is required"),
  envSlug: z.string().trim().min(1, "Environment slug is required"),
  folderPath: z.string().trim().min(1, "Folder path is required"),
  destinationPath: z.string().trim().min(1, "Destination path is required"),
  containerClientIdDirectory: z.string().trim().min(1, "Container Client ID Directory is required"),
  containerClientSecretDirectory: z.string().trim().min(1, "Container Client Secret Directory is required"),
});

export type InfisicalFormData = z.infer<typeof infisicalFormSchema>;

export interface GeneratedOutput {
  rawYaml: string;
  base64Config: string;
  envBlockString: string;
  ecsTaskDefinition: string;
}
