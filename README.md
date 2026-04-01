<div align="center">

# ⚡ ViralPost AI

**Generate scroll-stopping LinkedIn posts in seconds — powered by AI, designed for virality.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Edge%20Functions-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## 🚀 What is ViralPost AI?

ViralPost AI is a full-stack web application that uses **Google Gemini AI** to craft highly engaging, viral-style LinkedIn posts in seconds. Simply enter your topic, choose a tone, and let the AI do the heavy lifting.

The free tier gives you a ready-to-post LinkedIn post. Unlock **Premium Content** via a one-time Razorpay payment (₹199) to get carousel ideas, trending hashtags, and alternate opening hooks — everything you need to dominate your LinkedIn feed.

---

## ✨ Features

| Feature | Free | Premium (₹199) |
|---|:---:|:---:|
| AI-generated LinkedIn post (120–180 words) | ✅ | ✅ |
| Emojis, hooks & call-to-action built-in | ✅ | ✅ |
| One-click copy to clipboard | ✅ | ✅ |
| 5 Carousel slide ideas | ❌ | ✅ |
| 10 Trending hashtags | ❌ | ✅ |
| 3 Alternate opening hooks | ❌ | ✅ |

### 🎨 Tone Options
Choose from **5 writing styles** to match your brand voice:
- **Professional** — Polished and authoritative
- **Friendly** — Conversational and approachable
- **Storytelling** — Narrative-driven and engaging
- **Motivational** — Inspiring and action-oriented
- **Bold** — Direct and impactful

---

## 🛠️ Tech Stack

### Frontend
- **[React 18](https://react.dev)** — UI library
- **[TypeScript](https://www.typescriptlang.org)** — Type-safe development
- **[Vite](https://vitejs.dev)** — Blazing-fast build tool
- **[Tailwind CSS](https://tailwindcss.com)** — Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com)** + **[Radix UI](https://www.radix-ui.com)** — Accessible component primitives
- **[Framer Motion](https://www.framer-motion.com)** — Smooth animations
- **[React Router v6](https://reactrouter.com)** — Client-side routing
- **[TanStack Query](https://tanstack.com/query)** — Server state management
- **[React Hook Form](https://react-hook-form.com)** + **[Zod](https://zod.dev)** — Form validation

### Backend (Supabase Edge Functions)
- **[Supabase](https://supabase.com)** — Backend-as-a-service + Edge Functions (Deno runtime)
- **[Google Gemini 3 Flash](https://deepmind.google/technologies/gemini/)** — AI content generation via Lovable AI Gateway
- **[Razorpay](https://razorpay.com)** — Secure Indian payment processing

### Testing
- **[Vitest](https://vitest.dev)** — Unit & integration testing
- **[Playwright](https://playwright.dev)** — End-to-end testing
- **[@testing-library/react](https://testing-library.com)** — Component testing utilities

---

## 🏗️ Project Structure

```
viral-labs/
├── src/
│   ├── components/
│   │   ├── GeneratorForm.tsx     # Topic + tone input form
│   │   ├── PostResult.tsx        # Generated post display with copy
│   │   ├── LockedContent.tsx     # Premium content with Razorpay unlock
│   │   └── ui/                   # shadcn/ui component library
│   ├── pages/
│   │   ├── Index.tsx             # Main app page
│   │   └── NotFound.tsx          # 404 page
│   ├── hooks/
│   │   └── use-toast.ts          # Toast notification hook
│   ├── integrations/
│   │   └── supabase/             # Supabase client & type definitions
│   └── lib/
│       └── utils.ts              # Utility helpers
├── supabase/
│   └── functions/
│       ├── generate-post/        # AI post generation (Gemini)
│       ├── create-razorpay-order/  # Payment order creation
│       └── verify-razorpay-payment/ # Payment verification
└── public/                       # Static assets
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) 18+ or [Bun](https://bun.sh)
- A [Supabase](https://supabase.com) project
- A [Razorpay](https://razorpay.com) account (for payments)
- A Lovable AI Gateway API key (for AI generation)

### Installation

```bash
# Clone the repository
git clone https://github.com/2003mahi/viral-labs.git
cd viral-labs

# Install dependencies
npm install
# or
bun install
```

### Environment Setup

Create a `.env` file in the root (see `.env.example` if available):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Set the following **Supabase Edge Function secrets**:

```bash
supabase secrets set LOVABLE_API_KEY=your_lovable_api_key
supabase secrets set RAZORPAY_KEY_SECRET=your_razorpay_secret_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### Build for Production

```bash
npm run build
```

### Running Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch
```

---

## 🔄 How It Works

```
User Input (Topic + Tone)
        │
        ▼
  Supabase Edge Function: generate-post
        │
        ▼
  Google Gemini AI (via Lovable Gateway)
        │
        ▼
  ┌─────────────────────────┐
  │  Free Tier              │  ← Displayed immediately
  │  • LinkedIn Post        │
  └─────────────────────────┘
  ┌─────────────────────────┐
  │  Premium (Locked) Tier  │  ← Unlocked after payment
  │  • 5 Carousel Ideas     │
  │  • 10 Hashtags          │
  │  • 3 Alternate Hooks    │
  └─────────────────────────┘
        │
        ▼ (on "Unlock" click)
  Razorpay Checkout (₹199)
        │
        ▼
  Supabase Edge Function: verify-razorpay-payment
        │
        ▼
  Premium Content Revealed ✅
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues and pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private. All rights reserved.

---

<div align="center">

Built with ❤️ using AI · Payments via Razorpay

</div>
