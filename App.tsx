
import React, { useState, useCallback, useEffect } from 'react';
import { generateImage } from './services/geminiService';
import LoadingSpinner from './components/LoadingSpinner';
import DebugInfo from './components/DebugInfo';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    // Set app as ready after component mounts
    console.log('App component mounted');
    setIsAppReady(true);
  }, []);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate an image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const url = await generateImage(prompt);
      setImageUrl(url);
    } catch (err) {
      console.error('Error in handleGenerateImage:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  // Show loading state while app is initializing
  if (!isAppReady) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Pawan's AI Image Generator
          </h1>
          <p className="text-slate-400 mt-2">Bring your creative visions to life with the power of AI.</p>
        </header>

        <main className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A majestic lion wearing a crown, photorealistic style"
              className="w-full h-24 sm:h-auto flex-grow p-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200 resize-none placeholder-slate-500"
              disabled={isLoading}
            />
            <button
              onClick={handleGenerateImage}
              disabled={isLoading || !prompt.trim()}
              className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/50"
            >
              {isLoading ? 'Generating...' : 'Generate Image'}
            </button>
          </div>

          <div className="w-full aspect-square bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center p-4 relative overflow-hidden">
            {error && (
              <div className="text-center text-red-400 p-4">
                <h3 className="font-bold text-lg">Generation Failed</h3>
                <p className="text-sm">{error}</p>
              </div>
            )}
            {isLoading && <LoadingSpinner />}
            {!isLoading && !error && imageUrl && (
              <img
                src={imageUrl}
                alt={prompt}
                className="w-full h-full object-contain rounded-md animate-fade-in"
              />
            )}
            {!isLoading && !error && !imageUrl && (
              <div className="text-center text-slate-500">
                 <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 font-medium">Your generated image will appear here.</p>
              </div>
            )}
          </div>
        </main>
      </div>
      <DebugInfo />
       <style>{`
          @keyframes fade-in {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-in-out;
          }
        `}</style>
    </div>
  );
};

export default App;
