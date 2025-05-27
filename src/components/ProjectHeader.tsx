
import React from 'react';
import { Settings, Save, Eye, Upload } from 'lucide-react';

const ProjectHeader = () => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Smart Home Interface Designer</h1>
          <p className="text-slate-300">Design custom automation interfaces for your clients</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-700 text-slate-300 hover:bg-slate-600 rounded-lg transition-all duration-200 flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Project
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all duration-200 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-all duration-200 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Deploy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
