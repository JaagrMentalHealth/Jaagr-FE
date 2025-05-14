// components/Loader.tsx
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="spinner" />
      <style jsx>{`
        .loader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(255, 255, 255, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 6px solid #7E22CE;
          border-top: 6px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
