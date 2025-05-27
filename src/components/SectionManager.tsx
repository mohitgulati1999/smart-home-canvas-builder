
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface SectionManagerProps {
  onAddSection: (name: string, columns: number) => void;
}

const SectionManager: React.FC<SectionManagerProps> = ({ onAddSection }) => {
  const [sectionName, setSectionName] = useState('');
  const [columns, setColumns] = useState(4);

  const handleAddSection = () => {
    if (sectionName.trim()) {
      onAddSection(sectionName.trim(), columns);
      setSectionName('');
      setColumns(4);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-sm font-medium text-white mb-3">
        Create New Section
      </h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">
            Section Name
          </label>
          <input
            type="text"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            placeholder="e.g., Living Room, Lights, etc."
            className="w-full px-3 py-2 text-sm border border-gray-700/50 rounded-lg bg-gray-800/40 backdrop-blur-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-200"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">
            Columns
          </label>
          <select
            value={columns}
            onChange={(e) => setColumns(Number(e.target.value))}
            className="w-full px-3 py-2 text-sm border border-gray-700/50 rounded-lg bg-gray-800/40 backdrop-blur-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-200"
          >
            <option value={1}>1 Column</option>
            <option value={2}>2 Columns</option>
            <option value={3}>3 Columns</option>
            <option value={4}>4 Columns</option>
            <option value={5}>5 Columns</option>
          </select>
        </div>
        
        <button
          onClick={handleAddSection}
          disabled={!sectionName.trim()}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600/80 backdrop-blur-md text-white text-sm font-medium rounded-lg hover:bg-blue-600/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-blue-500/30 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30"
        >
          <Plus className="w-4 h-4" />
          Add Section
        </button>
      </div>
    </div>
  );
};

export default SectionManager;
