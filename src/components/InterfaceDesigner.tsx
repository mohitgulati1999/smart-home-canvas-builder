
import React, { useState } from 'react';
import { Plus, Home, Settings, Monitor } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-6">
        <ProjectHeader />
        
        <div className="grid grid-cols-12 gap-6 mt-6">
          {/* Device Library Sidebar */}
          <div className="col-span-3">
            <DeviceLibrary 
              onDragStart={setDraggedDevice}
              draggedDevice={draggedDevice}
            />
          </div>

          {/* Main Canvas Area */}
          <div className="col-span-9">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700">
              {/* Room Tabs */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700">
                <div className="flex gap-2">
                  {rooms.map(room => (
                    <button
                      key={room.id}
                      onClick={() => setActiveRoomId(room.id)}
                      className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                        activeRoomId === room.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      <Home className="w-4 h-4" />
                      {room.name}
                    </button>
                  ))}
                  <button
                    onClick={addRoom}
                    className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-all duration-200 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Room
                  </button>
                </div>

                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-all duration-200">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-200">
                    <Monitor className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Canvas */}
              <RoomCanvas
                room={activeRoom}
                draggedDevice={draggedDevice}
                onDeviceDrop={addDeviceToRoom}
                onDragEnd={() => setDraggedDevice(null)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfaceDesigner;
