import React from 'react';
import { Button } from "../components/ui/button"
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage(){
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate('/');
      };

      return (
        <div className="flex h-screen flex-col items-center justify-center bg-black">
          <h1 className="text-6xl font-bold text-gray-900 text-purple-500">404</h1>
          <p className="mt-4 text-lg text-gray-400">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Button variant="secondary" className="mt-6 bg-purple-600 text-white hover:bg-purple-700" onClick={handleGoBack}>
            Go Back to Home
          </Button>
        </div>
      );
}

