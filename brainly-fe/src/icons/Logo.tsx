
import React from 'react';
import { Layers } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 px-6 py-4">
      <Layers className="h-8 w-8 text-indigo-600" />
      <span className="text-xl font-bold text-gray-800">Second Brain</span>
    </div>
  );
};