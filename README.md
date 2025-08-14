<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Pawan's AI Image Generator

A React-based web application that generates images using Google's Gemini AI API.

## Features

- Generate images from text prompts using Gemini AI
- Modern, responsive UI with Tailwind CSS
- Real-time image generation with loading states
- Error handling and user feedback

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
4. Start the development server: `npm run dev`
5. Open http://localhost:5173 in your browser

## Deployment

This project is configured for automatic deployment to GitHub Pages.

### Prerequisites

1. Push your code to a GitHub repository
2. Set up GitHub Pages in your repository settings
3. Add your Gemini API key as a repository secret:
   - Go to Settings → Secrets and variables → Actions
   - Add a new repository secret named `GEMINI_API_KEY`
   - Set the value to your actual Gemini API key

### Automatic Deployment

The project includes a GitHub Actions workflow that automatically:
- Builds the application when you push to the main branch
- Deploys to GitHub Pages
- Handles routing and SPA configuration

### Manual Deployment

If you prefer manual deployment:

1. Build the project: `npm run build`
2. The built files will be in the `dist` directory
3. Upload the contents of `dist` to your web server

## Troubleshooting

### Blank Page on GitHub Pages

If you see a blank page after deployment:
1. Check that the repository name in `vite.config.ts` matches your actual repository name
2. Ensure the GitHub Actions workflow completed successfully
3. Check the browser console for any JavaScript errors

### Build Failures

If the build fails:
1. Ensure all dependencies are properly installed
2. Check that the `GEMINI_API_KEY` secret is set in GitHub
3. Verify that the TypeScript configuration is correct

## Technologies Used

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini AI API
- GitHub Pages
- GitHub Actions
