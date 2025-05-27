
import React from 'react';
import { Lightbulb, Fan, Monitor, Radio, Thermometer, Lock, Camera, Speaker } from 'lucide-react';

interface DeviceType {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  description: string;
}

const deviceTypes: DeviceType[] = [
  { 
    id: 'light', 
    name: 'Light', 
    icon: <Lightbulb className="w-5 h-5" />, 
    category: 'Lighting', 
    description: 'Smart light bulb or switch'
  },
  { 
    id: 'fan', 
    name: 'Fan', 
    icon: <Fan className="w-5 h-5" />, 
    category: 'Climate', 
    description: 'Ceiling or tower fan'
  },
  { 
    id: 'switch', 
    name: 'Switch', 
    icon: <Monitor className="w-5 h-5" />, 
    category: 'Controls', 
    description: 'Smart switch or button'
  },
  { 
    id: 'sensor', 
    name: 'Motion Sensor', 
    icon: <Radio className="w-5 h-5" />, 
    category: 'Sensors', 
    description: 'Motion detection sensor'
  },
  { 
    id: 'temperature', 
    name: 'Temperature', 
    icon: <Thermometer className="w-5 h-5" />, 
    category: 'Climate', 
    description: 'Temperature sensor'
  },
  { 
    id: 'lock', 
    name: 'Smart Lock', 
    icon: <Lock className="w-5 h-5" />, 
    category: 'Security', 
    description: 'Electronic door lock'
  },
  { 
    id: 'camera', 
    name: 'Camera', 
    icon: <Camera className="w-5 h-5" />, 
    category: 'Security', 
    description: 'Security camera'
  },
  { 
    id: 'speaker', 
    name: 'Speaker', 
    icon: <Speaker className="w-5 h-5" />, 
    category: 'Media', 
    description: 'Smart speaker'
  }
];

const categories = ['Lighting', 'Climate', 'Controls', 'Sensors', 'Security', 'Media'];

interface DeviceLibraryProps {
  onDragStart: (device: DeviceType) => void;
  draggedDevice: DeviceType | null;
}

const DeviceLibrary = ({ onDragStart, draggedDevice }: DeviceLibraryProps) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Entities
      </h2>
      
      {categories.map(category => {
        const categoryDevices = deviceTypes.filter(device => device.category === category);
        
        if (categoryDevices.length === 0) return null;
        
        return (
          <div key={category} className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
              {category}
            </h3>
            <div className="space-y-2">
              {categoryDevices.map(device => (
                <div
                  key={device.id}
                  draggable
                  onDragStart={() => onDragStart(device)}
                  className={`group p-3 rounded-lg border border-gray-200 dark:border-gray-600 cursor-grab active:cursor-grabbing transition-all duration-200 hover:border-blue-300 hover:shadow-sm bg-white dark:bg-gray-700 ${
                    draggedDevice?.id === device.id ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300 group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/20 dark:group-hover:text-blue-400 transition-colors">
                      {device.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {device.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {device.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DeviceLibrary;
