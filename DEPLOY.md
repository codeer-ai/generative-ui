# Vercel Deployment Guide

This guide walks you through deploying the Generative UI application to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- A [Google Cloud account](https://console.cloud.google.com/) with Generative AI API access
- Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Get Google API Key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Create a new API key or use an existing one
3. Copy the API key for later use

### 2. Deploy to Vercel

#### Option A: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts and add environment variables when asked
```

#### Option B: Deploy via Vercel Dashboard

1. Push your code to a Git repository
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import your Git repository
4. Configure your project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

### 3. Configure Environment Variables

In the Vercel dashboard, add the following environment variable:

- **Name**: `GOOGLE_API_KEY`
- **Value**: Your Google AI API key from step 1

### 4. Deploy

Click "Deploy" and wait for the build to complete. Your app will be live at:
- `https://your-project-name.vercel.app`

## Post-Deployment

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain and follow the DNS configuration instructions

### Environment Variables Update

To update environment variables after deployment:
1. Go to Project Settings → Environment Variables
2. Update the `GOOGLE_API_KEY` value
3. Redeploy from the Deployments tab

## Troubleshooting

### Build Failures

If the build fails:
1. Check the build logs in Vercel dashboard
2. Ensure all dependencies are listed in `package.json`
3. Verify the `GOOGLE_API_KEY` is set correctly

### API Errors

If you see API errors after deployment:
1. Verify your Google API key is valid and has the necessary permissions
2. Check API quotas in Google Cloud Console
3. Review function logs in Vercel dashboard

### Edge Function Timeouts

The app is configured with 30-second timeouts for AI generation. If you experience timeouts:
1. Consider optimizing prompts for faster generation
2. Check Google AI API response times
3. Monitor Edge Function logs for performance issues

## Performance Tips

1. **Edge Runtime**: The app uses Edge Runtime for better global performance
2. **Caching**: Vercel automatically caches static assets
3. **API Rate Limits**: Monitor your Google AI API usage to avoid rate limits

## Security

- Never commit your `GOOGLE_API_KEY` to version control
- Use Vercel's environment variables for all sensitive data
- Regularly rotate your API keys
- Monitor API usage for unusual activity

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Google AI Documentation](https://ai.google.dev/docs)