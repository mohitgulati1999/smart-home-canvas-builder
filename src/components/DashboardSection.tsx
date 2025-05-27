
import React from 'react';

interface DashboardSectionProps {
  title: string;
  children: React.ReactNode;
  columns?: number;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ 
  title, 
  children, 
  columns = 4 
}) => {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5'
  };

  return (
    <div className="mb-8">
      <h2 className="text-white text-xl font-medium mb-4">{title}</h2>
      <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-4`}>
        {children}
      </div>
    </div>
  );
};

export default DashboardSection;
