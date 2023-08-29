import classNames from 'classnames';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  isNegative: boolean;
}

export function Badge({ children, isNegative }: BadgeProps) {
  return (
    <span
      className={classNames('px-3 py-1 rounded-full', {
        'bg-green-100 border border-green-200 text-green-600': !isNegative,
        'bg-red-100 border border-red-200 text-red-600': isNegative,
      })}
    >
      {children}
    </span>
  );
}
