import * as React from 'react';

type Variant = 'default' | 'secondary' | 'outline' | 'ghost';
type Size = 'default' | 'icon';

export function Button({
  className = '',
  variant = 'default',
  size = 'default',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  const variantClass =
    variant === 'secondary'
      ? 'bg-gray-200 text-gray-900'
      : variant === 'outline'
      ? 'border'
      : variant === 'ghost'
      ? 'bg-transparent'
      : 'bg-gray-900 text-white';

  const sizeClass = size === 'icon' ? 'h-9 w-9 p-0 inline-flex items-center justify-center' : 'px-3 py-2';
  return <button className={`rounded ${variantClass} ${sizeClass} ${className}`} {...props} />;
}
