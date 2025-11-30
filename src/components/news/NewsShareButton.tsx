'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { NewsShareDialogSimple } from './NewsShareDialogSimple';
import { usePathname } from 'next/navigation';

interface NewsShareButtonProps {
  title: string;
  content: string;
}

export default function NewsShareButton({ title, content }: NewsShareButtonProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
      <NewsShareDialogSimple 
        open={open} 
        setOpen={setOpen}
        title={title}
        content={content}
        url={pathname}
      />
    </>
  );
}

