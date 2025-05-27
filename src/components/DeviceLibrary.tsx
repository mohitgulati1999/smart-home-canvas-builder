
import React from 'react';
import { Lightbulb, Fan, Monitor, Calendar } from 'lucide-react';

interface DeviceType {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  color: string;
}

const deviceTypes: DeviceType[] = [
  { id: 'light', name: 'Smart Light', icon: <Lightbulb className="w-6 h-6" />, category: 'Lighting', color: 'bg-yellow-500' },
  { id: 'fan', name: 'Smart Fan', icon: <Fan className="w-6 h-6" />, category: 'Climate', color: 'bg-blue-500' },
  { id: 'switch', name: 'Smart Switch', icon: <Monitor className="w-6 h-6" />, category: 'Controls', color: 'bg-green-500' },
  { id: 'sensor', name: 'Motion Sensor', icon: <Calendar className="w-6 h-6" />, category: 'Sensors', color: 'bg-purple-500' }
];

const categories = ['Lighting', 'Climate', 'Controls', 'Sensors'];

interface DeviceLibraryProps {
  onDragStart: (device: DeviceType) => void;
  draggedDevice: DeviceType | null;
}

const DeviceLibrary = ({ onDragStart, draggedDevice }: DeviceLibraryProps) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Device Library</h2>
      
      {categories.map(category => {
        const categoryDevices = deviceTypes.filter(device => device.category === category);
        
        return (
          <div key={category} className="mb-6">
            <h3 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">{category}</h3>
            <div className="space-y-2">
              {categoryDevices.map(device => (
                <div
                  key={device.id}
                  draggable
                  onDragStart={() => onDragStart(device)}
                  className={`p-4 rounded-xl border border-slate-600 cursor-grab active:cursor-grabbing transition-all duration-200 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 ${
                    draggedDevice?.id === device.id ? 'opacity-50' : 'hover:scale-105'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${device.color} text-white`}>
                      {device.icon}
                    </div>
                    <div>
                      <div className="text-white font-medium">{device.name}</div>
                      <div className="text-slate-400 text-sm">Drag to canvas</div>
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
