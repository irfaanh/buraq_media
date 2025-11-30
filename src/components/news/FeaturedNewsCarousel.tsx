'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

export default function FeaturedNewsCarousel({ news }: FeaturedNewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredNews = news && news.length > 0 ? news.slice(0, 4) : []; // Show 4 featured news

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (featuredNews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredNews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredNews.length]);

  if (!featuredNews || featuredNews.length === 0) {
    return (
      <div className="w-full mb-8 p-8 bg-gray-100 border border-gray-200 rounded-lg text-center">
        <p className="text-gray-500">No featured news available</p>
      </div>
    );
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredNews.length) % featuredNews.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredNews.length);
  };

  return (
    <section className="w-full mb-8">
      <div className="relative">
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {featuredNews.map((item) => (
              <div key={item.id} className="min-w-full">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/news/${item.id}`}>
                    <div className="relative h-64 md:h-96 w-full">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6">
                        <Badge variant="secondary" className="mb-2">
                          {item.location?.name || 'Unknown'}
                        </Badge>
                        <h3 className="text-white text-xl md:text-2xl font-bold line-clamp-2 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {formatDate(item.date)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {featuredNews.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Dots Indicator */}
        {featuredNews.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {featuredNews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

