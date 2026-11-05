# PulseCuro

PulseCuro is a healthcare-focused web app built with Next.js. It combines AI-assisted triage, symptom guidance, emergency support flows, and healthcare resource discovery in a clean, mobile-friendly experience.

## Features

- AI-powered symptom triage and health guidance
- Emergency SOS flow
- Doctor and hospital discovery pages
- Prescription and medication explanation support
- Resource and directions pages
- Modern glassmorphism-inspired UI

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Custom UI components

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file named `.env.local` in the project root.

3. Add the required values:

```env
NVIDIA_AI_TRIAGE_API_KEY=your_api_key_here
NVIDIA_AI_TRIAGE_BASE_URL=https://integrate.api.nvidia.com/v1
NVIDIA_AI_TRIAGE_MODEL=deepseek-ai/deepseek-v4.1-flash
```

> Keep `.env.local` local only. Do not commit it to GitHub.

4. Start the app:

```bash
npm run dev
```

5. Open the app in your browser:

```text
http://localhost:3000
```

## AI Integration

The app uses NVIDIA AI through a backend API route and a shared helper in `lib/ai.ts`.

If the external provider is unavailable, the app includes fallback behavior so it does not hang indefinitely.

## Notes

- Sensitive keys should be stored in the host environment or local development setup only.
- Do not paste API keys into exported repo files.

## License

This project is for demo, learning, and development use.
