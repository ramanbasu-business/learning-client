# learning-client

Standalone client repo for Azure Static Web Apps.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The build output is written to `dist/`, which is the folder deployed by Azure Static Web Apps.

## Deployment notes

- Keep the GitHub Actions workflow in this repo at `.github/workflows/azure-static-web-apps.yml`
- The workflow should build from the repo root
- Azure should deploy the `dist/` directory
