
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
      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
        Create New Section
      </h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            Section Name
          </label>
          <input
            type="text"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            placeholder="e.g., Living Room, Lights, etc."
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            Columns
          </label>
          <select
            value={columns}
            onChange={(e) => setColumns(Number(e.target.value))}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Section
        </button>
      </div>
    </div>
  );
};

export default SectionManager;
