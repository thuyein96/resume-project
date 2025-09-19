import * as React from 'react';

type SelectRootProps<T extends string = string> = {
  value: T;
  onValueChange: (value: T) => void;
  children: React.ReactNode;
};

export function Select<T extends string = string>({ value, onValueChange, children }: SelectRootProps<T>) {
  const items: Array<{ value: string; label: React.ReactNode }> = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const type = ((child as React.ReactElement).type as { displayName?: string } | undefined);
    if (type && type.displayName === 'UISelectContent') {
      const contentChildren = (child as React.ReactElement<{ children?: React.ReactNode }>).props
        .children;
      React.Children.forEach(contentChildren, (grand) => {
        if (!React.isValidElement(grand)) return;
        const gtype = ((grand as React.ReactElement).type as { displayName?: string } | undefined);
        if (gtype && gtype.displayName === 'UISelectItem') {
          const grandEl = grand as React.ReactElement<{ value: string; children: React.ReactNode }>;
          items.push({ value: grandEl.props.value, label: grandEl.props.children });
        }
      });
    }
  });

  return (
    <select
      className="border rounded px-3 py-2"
      value={value}
      onChange={(e) => onValueChange(e.target.value as T)}
    >
      {items.map((it) => (
        <option key={it.value} value={it.value}>
          {it.label}
        </option>
      ))}
    </select>
  );
}

export function SelectTrigger({ children }: { className?: string; children?: React.ReactNode }) {
  return <>{children}</>;
}
SelectTrigger.displayName = 'UISelectTrigger';

export function SelectValue({}: { placeholder?: string }) {
  return null;
}
SelectValue.displayName = 'UISelectValue';

export function SelectContent({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}
SelectContent.displayName = 'UISelectContent';

export function SelectItem({ children }: { value: string; children: React.ReactNode }) {
  return <>{children}</>;
}
SelectItem.displayName = 'UISelectItem';
