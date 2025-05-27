
import React from 'react';

interface MediaCardProps {
  title: string;
  subtitle: string;
  image: string;
  className?: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ title, subtitle, image, className = '' }) => {
  return (
    <div className={`
      bg-gray-800 rounded-xl border border-gray-700 
      hover:bg-gray-750 transition-all duration-200 cursor-pointer
      p-0 overflow-hidden min-h-[200px] ${className}
    `}>
      <div className="relative h-full">
        <div className="h-32 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
          <div className="text-white text-4xl">▶</div>
        </div>
        <div className="p-4">
          <div className="text-white font-medium text-sm mb-1">{title}</div>
          <div className="text-gray-400 text-xs">{subtitle}</div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
