"use client";

import { useState } from "react";
import { Code2, FileText, Info, Terminal, Zap } from "lucide-react";
import type { GeneratedOutput } from "@/types/infisical";
import { CopyButton } from "./CopyButton";

type Tab = "env" | "yaml" | "ecs";

function highlightLine(line: string) {
  return line.split(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\{\{.*?\}\}|\$\{.*?\}|[A-Za-z_][\w-]*(?=\s*:|\s*=))/g).map((part, index) => {
    let className = "";
    if (/^\{\{|\$\{/.test(part)) className = "syntax-template";
    else if (/^["']/.test(part)) className = "syntax-string";
    else if (/^[A-Za-z_][\w-]*(?=\s*:|\s*=)/.test(part)) className = "syntax-key";
    return className ? <span className={className} key={`${part}-${index}`}>{part}</span> : part;
  });
}

function HighlightedCode({ value }: { value: string }) {
  return (
    <pre className="code">
      {value.split("\n").map((line, index) => (
        <div key={`${index}-${line}`} className="code-line">{highlightLine(line)}{index < value.split("\n").length - 1 ? "\n" : ""}</div>
      ))}
    </pre>
  );
}

export function OutputViewer({
  outputs,
  onCopied,
}: {
  outputs: GeneratedOutput;
  onCopied: (message: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("yaml");
  const tabContent = activeTab === "env" ? outputs.envBlockString : activeTab === "yaml" ? outputs.rawYaml : outputs.ecsTaskDefinition;

  return (
    <div className="output-stack">
      <section className="card output-card">
        <div className="tabs-bar">
          <div className="tabs" role="tablist" aria-label="Generated output">
            <button className={activeTab === "yaml" ? "tab active" : "tab"} onClick={() => setActiveTab("yaml")}><Code2 size={14} /> Raw YAML</button>
            <button className={activeTab === "env" ? "tab active" : "tab"} onClick={() => setActiveTab("env")}><FileText size={14} /> .env Block</button>
            <button className={activeTab === "ecs" ? "tab active" : "tab"} onClick={() => setActiveTab("ecs")}><Terminal size={14} /> ECS Task Definition Entrypoint</button>
          </div>
          <CopyButton text={tabContent} label={activeTab === "env" ? "Copy .env Block" : activeTab === "yaml" ? "Copy Raw YAML" : "Copy ECS Definition"} onCopied={onCopied} />
        </div>
        <div className="output-body">
          <div className="output-meta">
            <span>{activeTab === "env" ? "Environment Variable Key-Value Output" : activeTab === "yaml" ? "Generated Agent Config YAML" : "ECS container startup configuration"}</span>
            <span>{activeTab === "ecs" ? "entryPoint + command" : activeTab === "env" ? "4 Keys Configured" : "agent-config.yaml"}</span>
          </div>
          <HighlightedCode value={tabContent} />
          <div className="output-note"><Info size={14} /> Ready for deployment into Kubernetes, Docker, or systemd agent configs.</div>
        </div>
      </section>

      <section className="card quick-card">
        <h3><Zap size={14} /> Quick Action Clipboard</h3>
        <div className="quick-grid">
          <div className="quick-item">
            <span>Config Base64</span>
            <CopyButton text={outputs.base64Config} label="" onCopied={onCopied} className="icon-copy" />
          </div>
        </div>
      </section>
    </div>
  );
}
