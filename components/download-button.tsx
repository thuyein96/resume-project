'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function DownloadButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button onClick={handlePrint} className="flex items-center gap-2">
      <Download size={16} />
      <span>Download PDF</span>
    </Button>
  );
}
