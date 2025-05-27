
import React, { useState } from 'react';
import { Plus, Home, Settings, Monitor, Grid3X3 } from 'lucide-react';
import RoomCanvas from './RoomCanvas';
import DeviceLibrary from './DeviceLibrary';
import ProjectHeader from './ProjectHeader';

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

const InterfaceDesigner = () => {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 'room-1', name: 'Living Room', devices: [] }
  ]);
  const [activeRoomId, setActiveRoomId] = useState('room-1');
  const [draggedDevice, setDraggedDevice] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(true);

  const addRoom = () => {
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      name: `Room ${rooms.length + 1}`,
      devices: []
    };
    setRooms([...rooms, newRoom]);
    setActiveRoomId(newRoom.id);
  };

  const addDeviceToRoom = (deviceType: string, x: number, y: number) => {
    const newDevice: Device = {
      id: `device-${Date.now()}`,
      type: deviceType,
      name: `${deviceType} ${Date.now()}`,
      x,
      y,
      roomId: activeRoomId
    };

    setRooms(rooms.map(room => 
      room.id === activeRoomId 
        ? { ...room, devices: [...room.devices, newDevice] }
        : room
    ));
  };

  const activeRoom = rooms.find(room => room.id === activeRoomId) || rooms[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Dashboard Editor
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Design your smart home interface
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isEditMode
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
              </button>
            </div>
          </div>

          {/* Device Library */}
          <div className="flex-1 overflow-y-auto">
            <DeviceLibrary 
              onDragStart={setDraggedDevice}
              draggedDevice={draggedDevice}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              {/* Room Tabs */}
              <div className="flex items-center gap-2">
                {rooms.map(room => (
                  <button
                    key={room.id}
                    onClick={() => setActiveRoomId(room.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      activeRoomId === room.id
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    {room.name}
                  </button>
                ))}
                <button
                  onClick={addRoom}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add View
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
            <RoomCanvas
              room={activeRoom}
              draggedDevice={draggedDevice}
              onDeviceDrop={addDeviceToRoom}
              onDragEnd={() => setDraggedDevice(null)}
              isEditMode={isEditMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfaceDesigner;
