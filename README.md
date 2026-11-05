# PulseCuro

Built by Team Byte Force.

PulseCuro is an AI-powered health guidance platform designed to reduce uncertainty during urgent medical situations. The app helps users understand symptoms, receive structured triage guidance, locate nearby care options, and access medication and emergency support information quickly and clearly.

## Problem We Solved

A large number of users become overwhelmed when they experience sudden symptoms or need quick guidance but do not know whether they should call emergency services, seek urgent care, or consult a doctor. In healthcare moments, clarity and speed matter.

PulseCuro brings together:

- AI-based symptom triage support
- Emergency-first guidance
- Nearby care navigation
- Medical resource discovery
- Medication explanations

## Why This Matters

Healthcare decisions can be stressful, especially when time is limited and information is fragmented. PulseCuro helps users make more informed decisions faster and directs them toward the right level of care without making the experience feel intimidating.

## Key Features

- AI triage assistant for symptom-based guidance
- SOS and emergency response flow
- Hospitals and doctors discovery experience
- Directions and resource access
- Medication explanation support
- Clean, intuitive, mobile-friendly interface

## Team

- Byte Force

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- NVIDIA AI integration

## Architecture Overview

- Frontend: Next.js App Router
- AI Layer: backend API routes and shared AI logic
- Runtime config: environment variables stored securely in `.env.local` locally and in deployment settings for production

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create a local `.env.local` file in the project root.

3. Add the required environment variables:

```env
NVIDIA_AI_TRIAGE_API_KEY=your_api_key_here
NVIDIA_AI_TRIAGE_BASE_URL=https://integrate.api.nvidia.com/v1
NVIDIA_AI_TRIAGE_MODEL=deepseek-ai/deepseek-v4.1-flash
```

> Keep `.env.local` local only. Never commit it.

4. Run the app:

```bash
npm run dev
```

5. Open:

```text
http://localhost:3000
```

## AI Integration

The app uses NVIDIA-hosted AI via backend route handlers and shared logic in `lib/ai.ts`.

The implementation includes fail-safe handling so users still receive a meaningful fallback response if the provider is unavailable.

## Deployment Notes (Render)

This project is ready for deployment to Render or similar hosting platforms.

Before deploying, set the same environment variables in your Render dashboard:

- `NVIDIA_AI_TRIAGE_API_KEY`
- `NVIDIA_AI_TRIAGE_BASE_URL`
- `NVIDIA_AI_TRIAGE_MODEL`

## Impact

PulseCuro demonstrates how AI can support faster, more accessible healthcare decision-making while keeping the user experience simple, empathetic, and actionable.

## License

This project is created for hackathon demo and learning purposes.
