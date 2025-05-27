
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
    case 'light': return 'bg-yellow-500/80 hover:bg-yellow-500/90 shadow-yellow-500/20';
    case 'fan': return 'bg-blue-500/80 hover:bg-blue-500/90 shadow-blue-500/20';
    case 'switch': return 'bg-green-500/80 hover:bg-green-500/90 shadow-green-500/20';
    case 'sensor': return 'bg-purple-500/80 hover:bg-purple-500/90 shadow-purple-500/20';
    case 'temperature': return 'bg-orange-500/80 hover:bg-orange-500/90 shadow-orange-500/20';
    case 'lock': return 'bg-red-500/80 hover:bg-red-500/90 shadow-red-500/20';
    case 'camera': return 'bg-indigo-500/80 hover:bg-indigo-500/90 shadow-indigo-500/20';
    case 'speaker': return 'bg-pink-500/80 hover:bg-pink-500/90 shadow-pink-500/20';
    case 'person': return 'bg-cyan-500/80 hover:bg-cyan-500/90 shadow-cyan-500/20';
    case 'media': return 'bg-violet-500/80 hover:bg-violet-500/90 shadow-violet-500/20';
    case 'automation': return 'bg-teal-500/80 hover:bg-teal-500/90 shadow-teal-500/20';
    default: return 'bg-gray-500/80 hover:bg-gray-500/90 shadow-gray-500/20';
  }
};

const getSectionWidth = (columns: number) => {
  // Calculate section width based on columns - allows sections to fit side by side
  switch (columns) {
    case 1: return 'w-1/4'; // 25% width
    case 2: return 'w-2/5'; // 40% width
    case 3: return 'w-3/5'; // 60% width
    case 4: return 'w-4/5'; // 80% width
    case 5: return 'w-full'; // 100% width
    default: return 'w-full';
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
            <h1 className="text-2xl font-bold text-white">
              {room.name}
            </h1>
            <p className="text-gray-400 mt-1">
              {isEditMode ? 'Drag cards from the sidebar to sections below' : 'Dashboard preview'}
            </p>
          </div>
          {isEditMode && (
            <div className="text-sm text-gray-400 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg px-3 py-1">
              Edit Mode Active
            </div>
          )}
        </div>
      </div>
      
      {/* Canvas Area */}
      <div 
        className="w-full"
        style={{ minHeight: 'calc(100vh - 200px)' }}
      >
        {room.sections.length === 0 ? (
          // Empty State with glass morphism
          <div className="h-full flex items-center justify-center bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-700/50 shadow-2xl">
            <div className="text-center text-gray-400">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-current flex items-center justify-center bg-gray-800/20 backdrop-blur-sm">
                <Layout className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-white">
                No sections configured
              </h3>
              <p className="text-sm max-w-md">
                Create sections using the "Sections" button in the sidebar to organize your dashboard cards
              </p>
            </div>
          </div>
        ) : (
          // Sections with dynamic widths and glass morphism
          <div className="flex flex-wrap gap-6">
            {room.sections.map((section, index) => (
              <div key={section.id} className={`${getSectionWidth(section.columns)} mb-6 min-w-0`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium text-white">
                    {section.name}
                  </h2>
                  {isEditMode && (
                    <button className="p-1 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div
                  className={`grid ${getGridColumns(section.columns)} gap-4 p-6 bg-gray-800/40 backdrop-blur-md rounded-xl ${
                    isEditMode 
                      ? 'border-2 border-dashed border-blue-400/50 shadow-lg shadow-blue-500/10' 
                      : 'border border-gray-700/50 shadow-xl shadow-gray-900/20'
                  } min-h-[200px] transition-all duration-300 hover:shadow-2xl hover:shadow-gray-900/30`}
                  onDrop={(e) => handleSectionDrop(e, section.id)}
                  onDragOver={handleDragOver}
                >
                  {section.devices.length === 0 && isEditMode ? (
                    <div className={`${getGridColumns(section.columns)} col-span-full flex items-center justify-center`}>
                      <div className="text-center text-gray-400">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 flex items-center justify-center">
                          <Plus className="w-6 h-6" />
                        </div>
                        <p className="text-sm">Drop cards here</p>
                      </div>
                    </div>
                  ) : (
                    section.devices.map(device => (
                      <div
                        key={device.id}
                        className={`${isEditMode ? 'cursor-move' : 'cursor-pointer'} group`}
                      >
                        <div className="bg-gray-700/40 backdrop-blur-md rounded-xl border border-gray-600/50 shadow-lg hover:shadow-xl hover:shadow-gray-900/40 transition-all duration-300 p-4 hover:border-gray-500/50 hover:bg-gray-700/60">
                          <div className="flex flex-col items-center gap-3 text-center">
                            <div className={`p-3 rounded-xl ${getDeviceColor(device.type)} text-white transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/10 group-hover:scale-105 group-hover:shadow-xl`}>
                              {getDeviceIcon(device.type)}
                            </div>
                            <div className="text-sm font-medium text-white">
                              {device.name}
                            </div>
                            <div className="text-xs text-gray-400 uppercase tracking-wide bg-gray-800/30 backdrop-blur-sm rounded-full px-2 py-1 border border-gray-700/50">
                              {device.type === 'automation' ? 'OFF' : 'OFF'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar with glass morphism */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-400 bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-lg px-4 py-3">
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
