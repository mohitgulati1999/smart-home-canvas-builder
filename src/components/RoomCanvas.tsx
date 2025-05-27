
import React from 'react';
import { Lightbulb, Fan, Monitor, Radio, Thermometer, Lock, Camera, Speaker, Plus } from 'lucide-react';

interface Device {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  roomId: string;
}

interface Room {
  id: string;
  name: string;
  devices: Device[];
}

interface RoomCanvasProps {
  room: Room;
  draggedDevice: any;
  onDeviceDrop: (deviceType: string, x: number, y: number) => void;
  onDragEnd: () => void;
  isEditMode: boolean;
}

const getDeviceIcon = (type: string) => {
  switch (type) {
    case 'light': return <Lightbulb className="w-5 h-5" />;
    case 'fan': return <Fan className="w-5 h-5" />;
    case 'switch': return <Monitor className="w-5 h-5" />;
    case 'sensor': return <Radio className="w-5 h-5" />;
    case 'temperature': return <Thermometer className="w-5 h-5" />;
    case 'lock': return <Lock className="w-5 h-5" />;
    case 'camera': return <Camera className="w-5 h-5" />;
    case 'speaker': return <Speaker className="w-5 h-5" />;
    default: return <Monitor className="w-5 h-5" />;
  }
};

const getDeviceColor = (type: string) => {
  switch (type) {
    case 'light': return 'bg-yellow-500 hover:bg-yellow-600';
    case 'fan': return 'bg-blue-500 hover:bg-blue-600';
    case 'switch': return 'bg-green-500 hover:bg-green-600';
    case 'sensor': return 'bg-purple-500 hover:bg-purple-600';
    case 'temperature': return 'bg-orange-500 hover:bg-orange-600';
    case 'lock': return 'bg-red-500 hover:bg-red-600';
    case 'camera': return 'bg-indigo-500 hover:bg-indigo-600';
    case 'speaker': return 'bg-pink-500 hover:bg-pink-600';
    default: return 'bg-gray-500 hover:bg-gray-600';
  }
};

const RoomCanvas = ({ room, draggedDevice, onDeviceDrop, onDragEnd, isEditMode }: RoomCanvasProps) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedDevice && isEditMode) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      onDeviceDrop(draggedDevice.id, x, y);
      onDragEnd();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {room.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {isEditMode ? 'Drag entities from the sidebar to add them to this view' : 'Dashboard view'}
            </p>
          </div>
          {isEditMode && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Edit Mode Active
            </div>
          )}
        </div>
      </div>
      
      {/* Canvas Area */}
      <div
        className={`relative w-full bg-white dark:bg-gray-800 rounded-lg border-2 transition-colors ${
          isEditMode 
            ? 'border-dashed border-blue-300 dark:border-blue-600' 
            : 'border-gray-200 dark:border-gray-700'
        }`}
        style={{ height: 'calc(100vh - 200px)' }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* Grid Pattern (only in edit mode) */}
        {isEditMode && (
          <div className="absolute inset-0 opacity-30">
            <svg width="100%" height="100%" className="text-gray-300 dark:text-gray-600">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        )}

        {/* Device Cards */}
        {room.devices.map(device => (
          <div
            key={device.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
              isEditMode ? 'cursor-move' : 'cursor-pointer'
            }`}
            style={{ left: device.x, top: device.y }}
          >
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200 p-4 min-w-[120px]">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className={`p-2 rounded-lg ${getDeviceColor(device.type)} text-white transition-colors`}>
                  {getDeviceIcon(device.type)}
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {device.name.replace(/\d+$/, '').trim()}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {device.type}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {room.devices.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400 dark:text-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-current flex items-center justify-center">
                <Plus className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                {isEditMode ? 'Add your first card' : 'No cards configured'}
              </h3>
              <p className="text-sm max-w-md">
                {isEditMode 
                  ? 'Drag entities from the sidebar to create cards on your dashboard'
                  : 'Enable edit mode to configure this view'
                }
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div>
          {room.devices.length} card{room.devices.length !== 1 ? 's' : ''} configured
        </div>
        {isEditMode && (
          <div>
            Tip: Drag entities from the sidebar to add them to your dashboard
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomCanvas;
