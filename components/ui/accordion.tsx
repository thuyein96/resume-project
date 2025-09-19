import * as React from 'react';

export function Accordion({ children }: { type?: 'single' | 'multiple'; defaultValue?: string[]; className?: string; children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function AccordionItem({ children }: { value: string; children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function AccordionTrigger({ children, className = '' }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}

export function AccordionContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
