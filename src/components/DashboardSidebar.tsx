
import React from 'react';

const DashboardSidebar: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString('sv-SE', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  const currentDate = new Date().toLocaleDateString('sv-SE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <div className="w-80 bg-gray-900 p-6 flex flex-col">
      <div className="mb-8">
        <div className="text-6xl font-light text-white mb-2">{currentTime}</div>
        <div className="text-gray-400 text-sm mb-6">{currentDate}</div>
        
        <div className="text-white text-lg mb-2">God kväll 👋</div>
        
        <div className="space-y-2 text-sm text-gray-400">
          <div>6 lampor, Dator, Fläkt² och TV² är på</div>
          <div className="mt-4">Känns som 23° med ingen risk för regn</div>
          <div className="mt-4">Tvätt imorgon klockan 19:00</div>
        </div>
      </div>
      
      <div className="flex-1"></div>
      
      <div className="flex flex-wrap gap-2 mt-6">
        {[
          'NAS', 'Uppdatera', 'Städa', 'Historik', 
          'Platta', 'Router', 'RPi'
        ].map((item) => (
          <button
            key={item}
            className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-lg hover:bg-gray-700 transition-colors"
          >
            {item}
            {item === 'Uppdatera' && (
              <span className="ml-1 w-2 h-2 bg-red-500 rounded-full inline-block"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardSidebar;
