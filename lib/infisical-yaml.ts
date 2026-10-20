import { stringify } from "yaml";
import type { GeneratedOutput, InfisicalFormData } from "@/types/infisical";

export function generateInfisicalYaml(data: InfisicalFormData): string {
  const cleanUrl = data.infisicalUrl.trim().replace(/\/+$/, "");
  const folder = data.folderPath.trim();
  const cleanFolder = folder.startsWith("/") ? folder : `/${folder}`;

  const templateContent = `{{- with secret "${data.projectId.trim()}" "${data.envSlug.trim()}" "${cleanFolder}" }}
{{- range . }}
{{ .Key }}={{ .Value }}
{{- end }}
{{- end }}`;

  const config = {
    infisical: {
      address: cleanUrl,
      "exit-after-auth": true,
    },
    auth: {
      type: "universal-auth",
      config: {
        "client-id": data.containerClientIdDirectory.trim(),
        "client-secret": data.containerClientSecretDirectory.trim(),
      },
    },
    sinks: [
      {
        type: "file",
        config: {
          path: "/infisical-agent/access-token",
        },
      },
    ],
    templates: [
      {
        "template-content": templateContent,
        "destination-path": data.destinationPath.trim(),
      },
    ],
  };

  return stringify(config, { lineWidth: 0 });
}

export function encodeBase64(value: string): string {
  return btoa(unescape(encodeURIComponent(value)));
}

export function buildGeneratedOutputs(data: InfisicalFormData): GeneratedOutput {
  const rawYaml = generateInfisicalYaml(data);
  const base64Config = encodeBase64(rawYaml);

  return {
    rawYaml,
    base64Config,
    envBlockString: `INFISICAL_AGENT_CONFIG_BASE64="${base64Config}"
INFISICAL_MACHINE_IDENTITY_ID="${data.machineIdentityId}"
INFISICAL_UNIVERSAL_AUTH_CLIENT_ID="${data.clientId}"
INFISICAL_UNIVERSAL_AUTH_CLIENT_SECRET="${data.clientSecret}"`,
    ecsTaskDefinition: JSON.stringify(
      {
        entryPoint: ["sh", "-c"],
        command: [
          `echo \${INFISICAL_UNIVERSAL_AUTH_CLIENT_ID} > ${data.containerClientIdDirectory.trim()} && echo \${INFISICAL_UNIVERSAL_AUTH_CLIENT_SECRET} > ${data.containerClientSecretDirectory.trim()} && infisical agent`,
        ],
      },
      null,
      2,
    ),
  };
}
