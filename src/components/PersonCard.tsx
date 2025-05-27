
import React from 'react';

interface PersonCardProps {
  name: string;
  status: string;
  avatar?: string;
  duration?: string;
  className?: string;
}

const PersonCard: React.FC<PersonCardProps> = ({ name, status, avatar, duration, className = '' }) => {
  const isHome = status === 'Ja';
  
  return (
    <div className={`
      bg-gray-800 rounded-xl border border-gray-700 
      hover:bg-gray-750 transition-all duration-200 cursor-pointer
      p-4 min-h-[100px] ${className}
    `}>
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-white text-sm font-medium">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <div className="text-white font-medium text-sm">{name}</div>
            <div className="text-gray-400 text-xs uppercase tracking-wide">{status}</div>
          </div>
        </div>
        {duration && (
          <div className="text-gray-400 text-xs border border-gray-600 rounded-full px-2 py-1">
            {duration}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonCard;
