import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Clock } from 'lucide-react';

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

interface LatestNewsSectionProps {
  news: NewsItem[];
}

export default function LatestNewsSection({ news }: LatestNewsSectionProps) {
  const featuredNews = news[0];
  const otherNews = news.slice(1, 5);

  if (!featuredNews) {
    return null;
  }

  return (
    <section className="w-full py-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-1 w-12 bg-red-600"></div>
        <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Featured News - Large Card */}
        <Card className="lg:col-span-2 overflow-hidden hover:shadow-lg transition-shadow">
          <Link href={`/news/${featuredNews.id}`}>
            <div className="relative h-64 md:h-80 w-full">
              {featuredNews.image ? (
                <Image
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <Badge variant="secondary" className="mb-2">
                  {featuredNews.location?.name || 'Unknown'}
                </Badge>
                <h3 className="text-white text-lg font-semibold line-clamp-2">
                  {featuredNews.title}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-white/80 text-xs">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(featuredNews.date)}</span>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                {featuredNews.content}
              </p>
            </CardContent>
          </Link>
        </Card>

        {/* Other News - Small Cards */}
        <div className="space-y-4">
          {otherNews.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <Link href={`/news/${item.id}`}>
                <div className="flex gap-3">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3 flex-1">
                    <Badge variant="outline" className="mb-1 text-xs">
                      {item.location?.name || 'Unknown'}
                    </Badge>
                    <h4 className="text-sm font-semibold line-clamp-2 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {formatDate(item.date)}
                    </p>
                  </CardContent>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

