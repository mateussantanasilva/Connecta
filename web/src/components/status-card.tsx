import { ReactNode } from 'react';

interface CardProps {
  title: string;
  count: number | string;
  description: string;
  icon: ReactNode;
}

export default function StatusCard({ title, count, description, icon }: CardProps) {
  return (
    <div className="border border-zinc-300 rounded-md p-4 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-zinc-700">{title}</h3>
        {icon}
      </div>
      <div className="mt-2">
        <span className="text-2xl font-bold text-zinc-900">{count}</span>
        <p className="text-xs text-zinc-500">{description}</p>
      </div>
    </div>
  );
}
