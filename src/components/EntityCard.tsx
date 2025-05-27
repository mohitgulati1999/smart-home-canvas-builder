
import React from 'react';
import { Lightbulb, Fan, Monitor, Radio, Thermometer, Lock, Camera, Speaker, Tv, User, Home } from 'lucide-react';

interface EntityCardProps {
  entity: {
    id: string;
    type: string;
    name: string;
    state: string;
    room?: string;
    value?: string;
    unit?: string;
    image?: string;
  };
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const getEntityIcon = (type: string) => {
  switch (type) {
    case 'light': return <Lightbulb className="w-6 h-6" />;
    case 'fan': return <Fan className="w-6 h-6" />;
    case 'switch': return <Monitor className="w-6 h-6" />;
    case 'sensor': return <Radio className="w-6 h-6" />;
    case 'temperature': return <Thermometer className="w-6 h-6" />;
    case 'lock': return <Lock className="w-6 h-6" />;
    case 'camera': return <Camera className="w-6 h-6" />;
    case 'speaker': return <Speaker className="w-6 h-6" />;
    case 'tv': return <Tv className="w-6 h-6" />;
    case 'person': return <User className="w-6 h-6" />;
    case 'climate': return <Home className="w-6 h-6" />;
    default: return <Monitor className="w-6 h-6" />;
  }
};

const getEntityColor = (type: string, state: string) => {
  if (state === 'on' || state === 'home') {
    switch (type) {
      case 'light': return 'text-yellow-400';
      case 'fan': return 'text-blue-400';
      case 'switch': return 'text-green-400';
      case 'speaker': return 'text-purple-400';
      default: return 'text-blue-400';
    }
  }
  return 'text-gray-400';
};

const EntityCard: React.FC<EntityCardProps> = ({ entity, size = 'medium', className = '' }) => {
  const isActive = entity.state === 'on' || entity.state === 'home' || entity.state === 'playing';
  
  const sizeClasses = {
    small: 'p-3 min-h-[80px]',
    medium: 'p-4 min-h-[100px]',
    large: 'p-6 min-h-[200px]'
  };

  return (
    <div className={`
      bg-gray-800 rounded-xl border border-gray-700 
      hover:bg-gray-750 transition-all duration-200 cursor-pointer
      ${sizeClasses[size]} ${className}
    `}>
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-start justify-between">
          <div className={`${getEntityColor(entity.type, entity.state)} transition-colors`}>
            {getEntityIcon(entity.type)}
          </div>
          {entity.value && (
            <div className="text-right">
              <div className="text-white text-lg font-medium">{entity.value}</div>
              {entity.unit && (
                <div className="text-gray-400 text-sm">{entity.unit}</div>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-2">
          <div className="text-white font-medium text-sm mb-1">{entity.name}</div>
          <div className="text-gray-400 text-xs uppercase tracking-wide">
            {entity.state}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityCard;
