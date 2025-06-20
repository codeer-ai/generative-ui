# Generative UI

A Next.js application that uses Google's Gemini AI to dynamically generate React components from user data. The app features a Linear-inspired design with real-time component generation and data visualization capabilities.

## Features

- **AI-Powered Component Generation**: Transforms CSV, JSON, and text data into interactive React components
- **Real-time Streaming**: Components are generated and rendered in real-time using AI SDK
- **Data Visualization**: Automatic chart generation using Recharts and shadcn/ui
- **Dark/Light Theme**: Seamless theme switching with Linear-inspired design
- **Sample Data Generation**: AI can generate realistic sample datasets on demand
- **Runtime Component Rendering**: Uses Babel standalone to compile components in the browser

## Prerequisites

- Node.js 18.17 or later
- A Google API key with access to Gemini models

## Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Get your Google API key:
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Add it to `.env.local`:
     ```
     GOOGLE_API_KEY=your_actual_api_key_here
     ```

## Getting Started

First, install dependencies and run the development server:

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **Input Data**: Paste your data (CSV, JSON, or text) into the input field
2. **Generate Sample Data**: Click "Generate Sample Data" for AI-generated datasets
3. **Generate UI**: Click "Generate UI" to create a React component from your data
4. **View Result**: The generated component will render in real-time below

## Project Structure

```
generative-ui/
├── app/
│   ├── api/
│   │   ├── generate/         # AI endpoint for component generation
│   │   └── generate-data/    # AI endpoint for sample data
│   ├── page.tsx             # Main application page
│   └── layout.tsx           # Root layout with theme provider
├── components/
│   ├── dynamic-component.tsx # Runtime component renderer
│   ├── theme-provider.tsx   # Theme context provider
│   ├── theme-toggle.tsx     # Theme toggle button
│   └── ui/                  # shadcn/ui components
├── .env.example             # Environment variables template
└── vercel.json             # Vercel deployment configuration
```

## Deploy on Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fgenerative-ui&env=GOOGLE_API_KEY&envDescription=Google%20API%20key%20for%20Gemini%20AI&envLink=https%3A%2F%2Faistudio.google.com%2Fapp%2Fapikey)

### Manual Deployment

1. **Push to GitHub**: Ensure your code is pushed to a GitHub repository

2. **Import to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**:
   - In the Vercel project settings, go to "Environment Variables"
   - Add `GOOGLE_API_KEY` with your Google API key value
   - This is required for the AI features to work

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Environment Variables on Vercel

The following environment variable must be set in your Vercel project:

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_API_KEY` | Google Generative AI API key for Gemini model access | Yes |

### Deployment Configuration

The project includes a `vercel.json` file that:
- Configures Edge Runtime for API routes
- Sets up proper build commands
- Defines environment variable requirements
- Optimizes function execution times

## Troubleshooting

### Common Issues

1. **"Google API key not configured" error**:
   - Ensure `GOOGLE_API_KEY` is set in your environment variables
   - Verify the API key has access to Gemini models

2. **Component generation fails**:
   - Check that your API key is valid
   - Ensure you're using supported data formats (CSV, JSON, text)

3. **Deployment fails on Vercel**:
   - Verify all environment variables are set correctly
   - Check the Vercel build logs for specific errors

## License

This project is open source and available under the [MIT License](LICENSE).
