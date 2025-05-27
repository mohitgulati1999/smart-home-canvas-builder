
import React from 'react';
import { Lightbulb, Fan, Monitor, Calendar } from 'lucide-react';

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
}

const getDeviceIcon = (type: string) => {
  switch (type) {
    case 'light': return <Lightbulb className="w-6 h-6" />;
    case 'fan': return <Fan className="w-6 h-6" />;
    case 'switch': return <Monitor className="w-6 h-6" />;
    case 'sensor': return <Calendar className="w-6 h-6" />;
    default: return <Monitor className="w-6 h-6" />;
  }
};

const getDeviceColor = (type: string) => {
  switch (type) {
    case 'light': return 'bg-yellow-500';
    case 'fan': return 'bg-blue-500';
    case 'switch': return 'bg-green-500';
    case 'sensor': return 'bg-purple-500';
    default: return 'bg-gray-500';
  }
};

const RoomCanvas = ({ room, draggedDevice, onDeviceDrop, onDragEnd }: RoomCanvasProps) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedDevice) {
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
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">{room.name} Layout</h3>
        <p className="text-slate-400">Drag devices from the library to place them in this room</p>
      </div>
      
      <div
        className="relative w-full h-96 bg-slate-900/50 border-2 border-dashed border-slate-600 rounded-xl overflow-hidden"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      >
        {/* Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="border-b border-slate-600" style={{ height: '5%' }} />
            ))}
          </div>
        </div>

        {/* Placed Devices */}
        {room.devices.map(device => (
          <div
            key={device.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-move"
            style={{ left: device.x, top: device.y }}
          >
            <div className={`p-3 rounded-xl ${getDeviceColor(device.type)} text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110`}>
              <div className="flex flex-col items-center gap-1">
                {getDeviceIcon(device.type)}
                <span className="text-xs font-medium text-center whitespace-nowrap">
                  {device.name.replace(/\d+$/, '').trim()}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {room.devices.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-slate-500">
              <div className="text-4xl mb-2">🏠</div>
              <p className="text-lg font-medium">Empty Room</p>
              <p className="text-sm">Drag devices from the library to get started</p>
            </div>
          </div>
        )}
      </div>

      {/* Device Count */}
      <div className="mt-4 text-sm text-slate-400">
        {room.devices.length} device{room.devices.length !== 1 ? 's' : ''} configured
      </div>
    </div>
  );
};

export default RoomCanvas;
