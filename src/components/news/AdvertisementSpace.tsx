import { cn } from '@/lib/utils';

interface AdvertisementSpaceProps {
  className?: string;
  variant?: 'left' | 'right';
}

export default function AdvertisementSpace({ 
  className,
}: AdvertisementSpaceProps) {
  return (
    <div
      className={cn(
        'w-full bg-gray-50 border border-gray-200 rounded-md p-4 flex items-center justify-center min-h-[400px]',
        className
      )}
    >
      <div className="text-center text-gray-400 text-sm">
        <p className="mb-2">Advertisement</p>
        <p className="text-xs">Space Available</p>
        <p className="text-xs mt-1">Sidebar Ad</p>
      </div>
    </div>
  );
}

