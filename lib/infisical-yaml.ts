import type { GeneratedOutput, InfisicalFormData } from "@/types/infisical";

export function generateInfisicalYaml(data: InfisicalFormData): string {
  const cleanUrl = data.infisicalUrl.trim().replace(/\/+$/, "");
  const cleanFolder = data.folderPath.trim().startsWith("/")
    ? data.folderPath.trim()
    : `/${data.folderPath.trim()}`;

  return `infisical:
  address: "${cleanUrl}"
  exit-after-auth: true
auth:
  type: "universal-auth"
  config:
    client-id: "${data.containerClientIdDirectory.trim()}"
    client-secret: "${data.containerClientSecretDirectory.trim()}"
sinks:
  - type: file
    config:
      path: /infisical-agent/access-token
templates:
  - template-content: |
      {{- with secret "${data.projectId.trim()}" "${data.envSlug.trim()}" "${cleanFolder}" }}
      {{- range . }}
      {{ .Key }}={{ .Value }}
      {{- end }}
      {{- end }}
    destination-path: "${data.destinationPath.trim()}"`;
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
