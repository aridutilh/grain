import { useState, useEffect } from 'react';

interface BackgroundRotatorProps {
  images: string[];
  interval?: number;
  children?: React.ReactNode;
}

const BackgroundRotator: React.FC<BackgroundRotatorProps> = ({
  images,
  children,
}) => {
  // Just use the first image from the array
  const backgroundImage = images[0];

  return (
    <div className="relative w-full h-full min-h-screen">
      <div
        className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundRotator; 