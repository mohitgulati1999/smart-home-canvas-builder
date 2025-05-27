
import React from 'react';
import { Lightbulb, Fan, Monitor, Radio, Thermometer, Lock, Camera, Speaker, Plus, User, Home as HomeIcon, Layout, Trash2 } from 'lucide-react';

interface Device {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  roomId: string;
  sectionId?: string;
}

interface Section {
  id: string;
  name: string;
  columns: number;
  devices: Device[];
}

interface Room {
  id: string;
  name: string;
  sections: Section[];
}

interface RoomCanvasProps {
  room: Room;
  draggedDevice: any;
  onDeviceDrop: (deviceType: string, sectionId: string, x: number, y: number) => void;
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
    case 'person': return <User className="w-5 h-5" />;
    case 'media': return <Monitor className="w-5 h-5" />;
    case 'automation': return <HomeIcon className="w-5 h-5" />;
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
    case 'person': return 'bg-cyan-500 hover:bg-cyan-600';
    case 'media': return 'bg-violet-500 hover:bg-violet-600';
    case 'automation': return 'bg-teal-500 hover:bg-teal-600';
    default: return 'bg-gray-500 hover:bg-gray-600';
  }
};

const RoomCanvas = ({ room, draggedDevice, onDeviceDrop, onDragEnd, isEditMode }: RoomCanvasProps) => {
  const handleSectionDrop = (e: React.DragEvent, sectionId: string) => {
    e.preventDefault();
    if (draggedDevice && isEditMode) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      onDeviceDrop(draggedDevice.id, sectionId, x, y);
      onDragEnd();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const getGridColumns = (columns: number) => {
    const gridClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5'
    };
    return gridClasses[columns as keyof typeof gridClasses] || 'grid-cols-4';
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
              {isEditMode ? 'Drag cards from the sidebar to sections below' : 'Dashboard preview'}
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
        className="w-full space-y-6"
        style={{ minHeight: 'calc(100vh - 200px)' }}
      >
        {room.sections.length === 0 ? (
          // Empty State
          <div className="h-full flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="text-center text-gray-400 dark:text-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-current flex items-center justify-center">
                <Layout className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                No sections configured
              </h3>
              <p className="text-sm max-w-md">
                Create sections using the "Sections" button in the sidebar to organize your dashboard cards
              </p>
            </div>
          </div>
        ) : (
          // Sections
          room.sections.map((section, index) => (
            <div key={section.id} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                  {section.name}
                </h2>
                {isEditMode && (
                  <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div
                className={`grid ${getGridColumns(section.columns)} gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg ${
                  isEditMode 
                    ? 'border-2 border-dashed border-blue-300 dark:border-blue-600' 
                    : 'border border-gray-200 dark:border-gray-700'
                } min-h-[200px]`}
                onDrop={(e) => handleSectionDrop(e, section.id)}
                onDragOver={handleDragOver}
              >
                {section.devices.length === 0 && isEditMode ? (
                  <div className={`${getGridColumns(section.columns)} col-span-full flex items-center justify-center`}>
                    <div className="text-center text-gray-400 dark:text-gray-500">
                      <Plus className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Drop cards here</p>
                    </div>
                  </div>
                ) : (
                  section.devices.map(device => (
                    <div
                      key={device.id}
                      className={`${isEditMode ? 'cursor-move' : 'cursor-pointer'}`}
                    >
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200 p-4">
                        <div className="flex flex-col items-center gap-2 text-center">
                          <div className={`p-2 rounded-lg ${getDeviceColor(device.type)} text-white transition-colors`}>
                            {getDeviceIcon(device.type)}
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {device.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {device.type === 'automation' ? 'OFF' : 'OFF'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Status Bar */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div>
          {room.sections.length} section{room.sections.length !== 1 ? 's' : ''} configured
        </div>
        {isEditMode && (
          <div>
            Tip: Use the "Sections" button to create new sections, then drag cards into them
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomCanvas;
