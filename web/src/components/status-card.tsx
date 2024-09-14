import { ReactNode } from 'react';

interface CardProps {
  title: string;
  count: number | string;
  description: string;
  icon: ReactNode;
}

export default function StatusCard({ title, count, description, icon }: CardProps) {
  return (
    <div className="border border-gray-300 rounded-md p-4 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        {icon}
      </div>
      <div className="mt-2">
        <span className="text-2xl font-bold text-gray-900">{count}</span>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}
