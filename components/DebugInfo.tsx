import React from 'react';

const DebugInfo: React.FC = () => {
  const [debugInfo, setDebugInfo] = React.useState<string>('Loading...');

  React.useEffect(() => {
    const info = {
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      hasReact: typeof React !== 'undefined',
      hasWindow: typeof window !== 'undefined',
      hasDocument: typeof document !== 'undefined'
    };
    
    setDebugInfo(JSON.stringify(info, null, 2));
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg text-xs max-w-sm">
      <h3 className="font-bold mb-2">Debug Info</h3>
      <pre className="whitespace-pre-wrap overflow-auto">
        {debugInfo}
      </pre>
    </div>
  );
};

export default DebugInfo;
