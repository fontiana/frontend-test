import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-600">
      {children}
    </span>
  );
}
