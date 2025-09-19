import * as React from 'react';

type Variant = 'default' | 'secondary' | 'outline';

export function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: Variant }) {
  const variantClass =
    variant === 'secondary' ? 'bg-gray-200 text-gray-800' : variant === 'outline' ? 'border' : 'bg-gray-900 text-white';
  return <span className={`inline-flex items-center px-2 py-1 text-xs rounded ${variantClass}`}>{children}</span>;
}
