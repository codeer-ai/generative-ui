# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Architecture Overview

This is a Generative UI application that uses Google's Gemini AI to dynamically generate React components from user data. The app features a Linear-inspired design with clean typography and minimal aesthetics.

### Core Flow
1. **Data Input**: User inputs data (CSV, JSON, text, Markdown) or generates sample data using AI
2. **AI Generation**: Data is sent to `/api/generate` which uses Google's Generative AI (Gemini 2.5 Flash)
3. **Component Streaming**: AI generates a React component code string that is streamed back
4. **Runtime Rendering**: `DynamicComponent` uses Babel standalone to transform and render the component at runtime

### Key Technologies
- **Next.js 15** with App Router and Edge Runtime
- **React 19** with TypeScript
- **Google Generative AI** (Gemini 2.5 Flash) for component generation
- **shadcn/ui** component library with chart components
- **Recharts** for data visualizations
- **Tailwind CSS v4** for styling with Linear design system colors
- **next-themes** for seamless dark/light theme switching
- **Babel standalone** for runtime component transformation
- **AI SDK (Vercel)** for streaming responses

### Important Files
- `app/api/generate/route.ts` - AI endpoint that creates React components from data
- `app/api/generate-data/route.ts` - AI endpoint that generates sample datasets
- `components/dynamic-component.tsx` - Runtime component renderer with error handling
- `components/theme-provider.tsx` - Theme context provider using next-themes
- `components/theme-toggle.tsx` - Animated theme toggle button component
- `components/ui/` - shadcn/ui components including charts
- `app/page.tsx` - Main UI with Linear-inspired design and theme support
- `app/layout.tsx` - Root layout with theme provider integration
- `app/globals.css` - Global styles with Linear design tokens and dark mode support

### Environment Variables
- `GOOGLE_API_KEY` - Required for Google Generative AI

### Design System
**Linear-Inspired Aesthetics with Dark/Light Theme:**

**Light Theme:**
- Colors: `#0f1419` (text), `#666666` (muted), `#0969da` (accent), `#fafafa` (background)
- Borders: `#e6e6e6` with subtle shadows

**Dark Theme:**
- Colors: `#f0f6fc` (text), `#8b949e` (muted), `#58a6ff` (accent), `#0d1117` (background)
- Borders: `#30363d` with GitHub-style dark UI
- Cards: `#161b22` background with `#21262d` secondary surfaces

**Common:**
- Typography: Font weights 450-650, -0.02em letter spacing, optimized font features
- Borders: 12px border radius for modern aesthetics
- Spacing: 8px grid system with precise padding/margins
- Interactions: 150ms cubic-bezier transitions with smooth hover states
- Theme Toggle: Animated sun/moon icon with seamless switching

### Component Generation Rules
The AI is instructed to:
- Generate complete React components with TypeScript
- Use shadcn/ui components: Cards, Tables, Buttons, Badges, Tabs, etc.
- Include Recharts for data visualization: BarChart, LineChart, PieChart, etc.
- Use ChartContainer wrapper for proper chart styling
- Handle chart component placement errors automatically
- Support Lucide icons with proper naming conventions
- Create responsive layouts with Tailwind CSS
- Generate realistic interactive components with state management

### Data Generation Features
- **12 Data Templates**: Sales, analytics, inventory, tasks, events, etc.
- **Random Selection**: Each generation picks a different data type
- **CSV Format**: 8-12 rows of structured, realistic data
- **Auto-Fill**: Generated data populates input automatically

### Error Handling & Robustness
- **Chart Error Recovery**: Automatic fixes for common AI-generated JSX errors
- **Component Validation**: Regex patterns fix Dialog component naming issues
- **Graceful Degradation**: Error boundaries show friendly messages instead of crashes
- **Loading States**: Proper loading indicators and disabled states

### Example Data Templates
The app includes 5 built-in examples:
- Health Vitals (📊) - Blood pressure and pulse tracking
- Task List (✅) - Project management with status indicators  
- Sales Data (💰) - Quarterly revenue and pipeline metrics
- Events (🎪) - Conference and workshop attendance data
- Inventory (📦) - Product stock levels and categories