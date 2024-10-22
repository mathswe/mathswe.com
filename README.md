<!-- Copyright (c) 2024 Tobias Briones. All rights reserved. -->
<!-- This file is part of https://github.com/mathswe/mathswe.com -->

# MathSwe Web

[![Project](public/mathswe-badge.svg)](https://mathswe.com)
&nbsp;
[![GitHub Repository](https://img.shields.io/static/v1?label=GITHUB&message=REPOSITORY&labelColor=555&color=0277bd&style=for-the-badge&logo=GITHUB)](https://github.com/mathswe/mathswe.com)

[![GitHub Project License](https://img.shields.io/github/license/mathswe/mathswe.com.svg?style=flat-square)](https://github.com/mathswe/mathswe.com/blob/main/LICENSE)

![GitHub Release](https://img.shields.io/github/v/release/mathswe/mathswe.com?style=flat-square)

⚙ Production
[![Netlify Status](https://api.netlify.com/api/v1/badges/cf1e3b86-3c86-43e9-a90d-5e07d769785b/deploy-status)](https://app.netlify.com/sites/mathswe/deploys)

Supporting modern mathematics via the MathSwe.com project.

## Getting Started

Install project dependencies via `npm install`.

Run development mode via `npm run dev`.

Build for production via `npm run build`.

Run ESLint via `npx eslint .`.

## Environment Variables

Base variables for production at `.env.production`:

```
VITE_TITLE_MODE_SUFFIX=""
VITE_DOMAIN_NAME=mathswe.com
VITE_COOKIE_CONSENT_HOSTNAME=mathswe-cookie-consent.tobiasbriones-dev.workers.dev
VITE_ANALYTICS_GTAG_ID=G-QX4Y601GDV
```

Add the subdomain to the staging config at `.env.staging`.

```
VITE_SUBDOMAIN=staging
```

Update the mode information in the development variables at `.env.dev`.

```
VITE_TITLE_MODE_SUFFIX=" (dev)"
```

Import the proper `.env` file to the Netlify project at "Site configuration" ->
"Environment variables."

## Contact

Tobias Briones: [GitHub](https://github.com/tobiasbriones)
[LinkedIn](https://linkedin.com/in/tobiasbriones)

## About

**MathSwe**

Supporting modern mathematics via the MathSwe.com project.

Copyright © 2024 Tobias Briones. All rights reserved.
