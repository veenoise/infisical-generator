# Infisical Generator

A browser-based configuration generator for the [Infisical Agent](https://infisical.com/docs/cli/agent). Enter your Infisical project and Universal Auth details once, then copy deployment-ready configuration for Docker, Kubernetes, ECS, or systemd-based deployments.

## Features

- Generates Infisical Agent YAML, Base64 configuration, `.env` values, and an ECS entrypoint.
- Provides one-click copy actions for generated outputs and credentials.
- Saves form values in browser `localStorage` so work persists between visits.
- Validates required fields and URLs as you edit.

## Requirements

- Node.js 20 or newer
- pnpm 11 (`pnpm@11.20.0`)

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Usage

1. Enter the Infisical server URL, project ID, environment slug, and folder path.
2. Set the destination path where rendered secrets should be written.
3. Enter the Universal Auth machine identity credentials.
4. Configure the container paths used for the client ID and client secret.
5. Copy the generated YAML, `.env` block, ECS entrypoint, or individual values.

Use **Reset** in the header to restore the example configuration.

## Available scripts

```bash
pnpm dev       # Start the development server
pnpm build     # Create a production build
pnpm start     # Start the production server
pnpm lint      # Run ESLint
```

## Project structure

```text
app/             Next.js app router pages and global styles
components/      Form, output viewer, header, and reusable UI components
hooks/           Form state, validation, persistence, and output generation
lib/              Defaults and Infisical configuration generators
types/            Shared TypeScript and Zod types
```

## Security and data handling

This is a client-side application. Form values, including client secrets, are stored in the browser's `localStorage` under `infisical_agent_generator_state_v1`. They are not sent to an application backend by this project.

Do not use the generator on a shared or untrusted computer. Clear the saved configuration or browser site data after working with production credentials.

## Tech stack

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Lucide React](https://lucide.dev/)
