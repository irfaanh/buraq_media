'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

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

interface FeaturedNewsCarouselProps {
  news: NewsItem[];
}

const CARDS_PER_VIEW = 4;
const AUTO_SCROLL_INTERVAL = 4000; // 4 seconds

export default function FeaturedNewsCarousel({ news }: FeaturedNewsCarouselProps) {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  
  // Calculate total number of groups (each group has 4 cards)
  const totalGroups = news && news.length > 0 ? Math.ceil(news.length / CARDS_PER_VIEW) : 0;

  // Auto-scroll to next group every 4 seconds
  useEffect(() => {
    if (totalGroups <= 1) return;

    const interval = setInterval(() => {
      setCurrentGroupIndex((prev) => (prev + 1) % totalGroups);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [totalGroups]);
  
  if (!news || news.length === 0) {
    return (
      <div className="w-full mb-8 p-8 bg-gray-100 border border-gray-200 rounded-lg text-center">
        <p className="text-gray-500">No featured news available</p>
      </div>
    );
  }

  const goToPreviousGroup = () => {
    setCurrentGroupIndex((prev) => (prev - 1 + totalGroups) % totalGroups);
  };

  const goToNextGroup = () => {
    setCurrentGroupIndex((prev) => (prev + 1) % totalGroups);
  };

  const goToGroup = (index: number) => {
    setCurrentGroupIndex(index);
  };

  return (
    <section className="w-full mb-8">
      <div className="relative">
        {/* Cards Grid Container */}
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentGroupIndex * 100}%)` }}
          >
            {Array.from({ length: totalGroups }).map((_, groupIndex) => {
              const groupNews = news.slice(
                groupIndex * CARDS_PER_VIEW,
                groupIndex * CARDS_PER_VIEW + CARDS_PER_VIEW
              );
              
              return (
                <div key={groupIndex} className="min-w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {groupNews.map((item) => (
                      <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-200 p-0">
                        <Link href={`/news/${item.id}`}>
                          <div className="relative h-64 md:h-72 w-full overflow-hidden">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">No Image</span>
                              </div>
                            )}
                            <div className="absolute top-2 left-2">
                              <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm text-gray-900">
                                {item.location?.name || 'Unknown'}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="text-base font-bold line-clamp-2 mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="h-4 w-4" />
                              <span>{formatDate(item.date)}</span>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                    {/* Fill empty slots if last group has less than 4 items */}
                    {groupNews.length < CARDS_PER_VIEW &&
                      Array.from({ length: CARDS_PER_VIEW - groupNews.length }).map((_, idx) => (
                        <div key={`empty-${idx}`} className="hidden sm:block" />
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        {totalGroups > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg z-10"
              onClick={goToPreviousGroup}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg z-10"
              onClick={goToNextGroup}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Dots Indicator */}
        {totalGroups > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {Array.from({ length: totalGroups }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToGroup(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentGroupIndex
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to group ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

