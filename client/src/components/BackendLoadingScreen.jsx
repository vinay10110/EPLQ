import { useState, useEffect } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';

const BackendLoadingScreen = ({ onBackendReady }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);
    const [error, setError] = useState(null);
    const [statusMessage, setStatusMessage] = useState('Connecting to server...');

    const checkBackendHealth = async () => {
        try {
            setStatusMessage('Checking server status...');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/health`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Add timeout to prevent hanging
                signal: AbortSignal.timeout(10000) // 10 second timeout
            });

            if (response.ok) {
                const data = await response.json();
                if (data.status === 'ok') {
                    setStatusMessage('Server connected successfully!');
                    setIsLoading(false);
                    setError(null);
                    setTimeout(() => onBackendReady(), 500); // Small delay for UX
                    return true;
                }
            }
            throw new Error(`Server responded with status: ${response.status}`);
        } catch (err) {
            console.error('Backend health check failed:', err);
            
            if (err.name === 'TimeoutError') {
                setStatusMessage('Server is taking longer than expected...');
            } else if (err.name === 'TypeError' && err.message.includes('fetch')) {
                setStatusMessage('Unable to reach server. Retrying...');
            } else {
                setStatusMessage(`Connection error: ${err.message}`);
            }
            
            setError(err.message);
            return false;
        }
    };

    const retryConnection = async () => {
        setRetryCount(prev => prev + 1);
        setError(null);
        setIsLoading(true);
        
        // Exponential backoff: 2s, 4s, 8s, then 10s max
        const delay = Math.min(2000 * Math.pow(2, retryCount), 10000);
        setStatusMessage(`Retrying in ${delay / 1000} seconds...`);
        
        setTimeout(async () => {
            await checkBackendHealth();
        }, delay);
    };

    useEffect(() => {
        let mounted = true;
        let retryInterval;

        const initializeConnection = async () => {
            const isHealthy = await checkBackendHealth();
            
            if (!isHealthy && mounted) {
                // Auto-retry for the first few attempts
                if (retryCount < 3) {
                    retryInterval = setTimeout(() => {
                        if (mounted) {
                            retryConnection();
                        }
                    }, 3000);
                } else {
                    setIsLoading(false);
                }
            }
        };

        initializeConnection();

        return () => {
            mounted = false;
            if (retryInterval) {
                clearTimeout(retryInterval);
            }
        };
    }, [retryCount]);

    if (!isLoading && !error) {
        return null; // Component will unmount when backend is ready
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex align-items-center justify-content-center bg-black-alpha-50 z-5">
            <Card className="w-11 md:w-6 lg:w-4 text-center">
                <div className="flex flex-column align-items-center gap-4">
                    <div className="flex align-items-center gap-3">
                        <i className="pi pi-server text-4xl text-primary"></i>
                        <h2 className="m-0 text-primary">Connecting to Server</h2>
                    </div>
                    
                    {isLoading ? (
                        <>
                            <ProgressSpinner 
                                style={{ width: '50px', height: '50px' }} 
                                strokeWidth="4" 
                                animationDuration="1s"
                            />
                            <p className="text-600 m-0">{statusMessage}</p>
                            {retryCount > 0 && (
                                <small className="text-500">
                                    Attempt {retryCount + 1} - Server may be starting up...
                                </small>
                            )}
                        </>
                    ) : error ? (
                        <>
                            <i className="pi pi-exclamation-triangle text-4xl text-orange-500"></i>
                            <div className="text-center">
                                <h3 className="text-800 mt-0">Connection Failed</h3>
                                <p className="text-600 mb-3">
                                    Unable to connect to the server. This might be due to:
                                </p>
                                <ul className="text-left text-600 mb-4">
                                    <li>Server is starting up (cold start)</li>
                                    <li>Network connectivity issues</li>
                                    <li>Server maintenance</li>
                                </ul>
                                <Button 
                                    label="Retry Connection" 
                                    icon="pi pi-refresh" 
                                    onClick={retryConnection}
                                    className="p-button-primary"
                                />
                            </div>
                        </>
                    ) : null}
                </div>
            </Card>
        </div>
    );
};

export default BackendLoadingScreen;
