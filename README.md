# PulseCuro

Built by Team Byte Force.

PulseCuro is an AI-powered healthcare guidance platform designed to reduce uncertainty during urgent medical moments. It helps users understand symptoms, receive quick triage guidance, locate nearby care, and access medication support with clear and reassuring instructions.

## Problem We Solved

When people face sudden symptoms or need urgent support, they often do not know whether to call emergency services, visit a hospital, or consult a doctor. PulseCuro reduces that uncertainty by combining a simple medical triage experience with resources and healthcare navigation.

PulseCuro brings together:

- AI-assisted symptom triage
- Emergency-first response guidance
- Nearby hospitals, doctors, and resources
- Prescription explanation support
- Low-cost generic medicine discovery through Jan Aushadhi-style affordability checks
- Mobile-friendly glassmorphism interface

## Why This Matters

Healthcare decisions are stressful, especially when time is limited and information feels fragmented. PulseCuro gives users a calmer, clearer first step toward the right care.

## Key Features

- AI triage assistant for urgent medical questions
- ER handover summary generation from entered patient information
- SOS and emergency response flow
- Doctors, hospital, and direction discovery
- Prescription AI to explain medicines in simple language
- Generic medicine affordability check and low-cost alternatives
- Smooth scroll-based reveal animations

## Team

- Byte Force

## Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Groq + Gemini AI fallback
- Liquid glass UI patterns

## Architecture Overview

- Frontend: Next.js App Router
- AI Layer: backend API routes and shared configuration in `lib/ai.ts`
- Runtime config: environment variables stored securely in `.env.local` locally and in deployment settings for production

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create a local `.env.local` file in the project root.

3. Add the required environment variables:

```env
AI_API_KEY=your_gemini_backup_key
AI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai
AI_MODEL=gemini-2.5-flash
AI_FALLBACK_MODELS=gemini-2.5-pro
AI_REQUEST_TIMEOUT_MS=45000

GROQ_API_KEY=your_groq_key
GROQ_BASE_URL=https://api.groq.com/openai/v1
GROQ_MODEL=openai/gpt-oss-20b
```

> Keep `.env.local` local only. Do not commit it.

4. Run the app:

```bash
npm run dev
```

5. Open:

```text
http://localhost:3000
```

## AI Integration

The app uses a Groq-first provider strategy with Gemini as a fallback. The logic lives in `lib/ai.ts` and is exposed through the API route at `app/api/ai/route.ts`.

This setup prioritizes the working provider first and includes retry logic and graceful fallback messaging when live AI is unavailable.

## Deployment Notes

Before deploying, set the same environment variables in your hosting dashboard, for example Vercel, Render, or another Node-based deployment platform:

- `GROQ_API_KEY`
- `GROQ_BASE_URL`
- `GROQ_MODEL`
- `AI_API_KEY`
- `AI_BASE_URL`
- `AI_MODEL`
- `AI_FALLBACK_MODELS`
- `AI_REQUEST_TIMEOUT_MS`

## Impact

PulseCuro demonstrates how AI can support faster, more accessible healthcare decision-making while keeping the user experience empathetic, practical, and action-oriented.

## License

This project is created for hackathon demo and learning purposes.
