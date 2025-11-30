import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: Date;
  image: string | null;
  location: {
    name: string;
  } | null;
  category: {
    name: string;
  } | null;
}

interface LocationNewsCardProps {
  locationName: string;
  news: NewsItem[];
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal' | 'pink' | 'indigo';
}

const colorVariants = {
  blue: {
    bg: 'bg-blue-600',
    bgLight: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-800',
  },
  green: {
    bg: 'bg-green-600',
    bgLight: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-800',
  },
  purple: {
    bg: 'bg-purple-600',
    bgLight: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-800',
  },
  orange: {
    bg: 'bg-orange-600',
    bgLight: 'bg-orange-50',
    text: 'text-orange-600',
    border: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-800',
  },
  red: {
    bg: 'bg-red-600',
    bgLight: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-800',
  },
  teal: {
    bg: 'bg-teal-600',
    bgLight: 'bg-teal-50',
    text: 'text-teal-600',
    border: 'border-teal-200',
    badge: 'bg-teal-100 text-teal-800',
  },
  pink: {
    bg: 'bg-pink-600',
    bgLight: 'bg-pink-50',
    text: 'text-pink-600',
    border: 'border-pink-200',
    badge: 'bg-pink-100 text-pink-800',
  },
  indigo: {
    bg: 'bg-indigo-600',
    bgLight: 'bg-indigo-50',
    text: 'text-indigo-600',
    border: 'border-indigo-200',
    badge: 'bg-indigo-100 text-indigo-800',
  },
};

const colors: Array<keyof typeof colorVariants> = [
  'blue',
  'green',
  'purple',
  'orange',
  'red',
  'teal',
  'pink',
  'indigo',
];

// Deterministic color assignment based on location name hash
function getColorForLocation(locationName: string, providedColor?: keyof typeof colorVariants): keyof typeof colorVariants {
  if (providedColor) return providedColor;
  
  // Create a simple hash from location name for deterministic color assignment
  let hash = 0;
  for (let i = 0; i < locationName.length; i++) {
    hash = locationName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function LocationNewsCard({
  locationName,
  news,
  color,
}: LocationNewsCardProps) {
  const selectedColor = getColorForLocation(locationName, color);
  const variant = colorVariants[selectedColor];

  if (!news || news.length === 0) {
    return null;
  }

  const mainNews = news[0];
  const otherNews = news.slice(1, 5); // Show 4 more news items

  // Calculate time ago
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);

    if (diffInWeeks > 0) return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    if (diffInDays > 0) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    if (diffInHours > 0) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInMinutes > 0) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <Card className={cn('overflow-hidden hover:shadow-xl transition-all duration-300 !p-0 !gap-0', variant.border)}>
      {/* Location Header */}
      <div className={cn('px-6 py-4 text-white', variant.bg)}>
        <h2 className="text-xl font-bold">{locationName}</h2>
      </div>

      <div className="p-0">
        {/* Main Featured News */}
        {mainNews && (
          <Link href={`/news/${mainNews.id}`}>
            <div className="relative group">
              <div className="relative h-64 md:h-80 w-full overflow-hidden">
                {mainNews.image ? (
                  <Image
                    src={mainNews.image}
                    alt={mainNews.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className={cn('w-full h-full flex items-center justify-center', variant.bgLight)}>
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                
                {/* Location Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={cn('text-white border-0', variant.bg)}>
                    {locationName}
                  </Badge>
                </div>
              </div>

              {/* Main News Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                {/* Metadata */}
                <div className="flex items-center gap-4 text-sm text-white/80 mb-3">
                  <span>Web Desk</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {getTimeAgo(mainNews.date)}
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-2xl md:text-3xl font-bold mb-3 line-clamp-2">
                  {mainNews.title}
                </h3>

                {/* Snippet */}
                <p className="text-white/90 text-sm md:text-base mb-4 line-clamp-3">
                  {mainNews.content}
                </p>

                {/* Read More Button */}
                <Button 
                  className={cn('text-white border-white/30 hover:bg-white/20', variant.bg)}
                  variant="outline"
                  size="sm"
                >
                  Read More <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </Link>
        )}

        {/* Other News Grid - 2x2 */}
        {otherNews.length > 0 && (
          <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50">
            {otherNews.map((item) => (
              <Link key={item.id} href={`/news/${item.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white">
                  <div className="relative h-32 w-full overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className={cn('w-full h-full flex items-center justify-center', variant.bgLight)}>
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {getTimeAgo(item.date)}
                    </p>
                    <h4 className="text-sm font-semibold line-clamp-2 text-gray-900 hover:text-blue-600 transition-colors mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {item.content}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* View All Link */}
        {news.length > 5 && (
          <div className="p-4 text-center border-t bg-white">
            <Link
              href={`/location/${locationName}`}
              className={cn('text-sm font-medium hover:underline', variant.text)}
            >
              View All News ({news.length})
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
}
