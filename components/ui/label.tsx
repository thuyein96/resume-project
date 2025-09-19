import * as React from 'react';

export function Label({ className = '', ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={`text-sm font-medium ${className}`} {...props} />;
}
