import { Facebook, Youtube, ThumbsUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdvertisementSpace from './AdvertisementSpace';
import { getSpecialNews } from '@/actions/news-actions';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default async function RightSidebar() {
  const result = await getSpecialNews();
  const specialNews = result?.data?.news || [];

  return (
    <aside className="w-full space-y-6">
      {/* Follow Us Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ThumbsUp className="h-5 w-5" />
            Follow Us
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">
              Facebook Like Widget
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Connect with us on Facebook
            </p>
            <Button className="mt-4 w-full" size="sm">
              <Facebook className="h-4 w-4 mr-2" />
              Like Page
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscribe to YouTube */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Youtube className="h-5 w-5 text-red-600" />
            Subscribe to our YOUTUBE channel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg font-bold">T</span>
            </div>
            <div>
              <p className="font-semibold text-sm">Buraq Media</p>
              <p className="text-xs text-gray-500">News Channel</p>
            </div>
          </div>
          <Button variant="destructive" className="w-full" size="sm">
            <Youtube className="h-4 w-4 mr-2" />
            YouTube
          </Button>
          <p className="text-xs text-gray-500 mt-2 text-center">3K subscribers</p>
        </CardContent>
      </Card>

      {/* Advertisement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Advertisement</CardTitle>
        </CardHeader>
        <CardContent>
          <AdvertisementSpace variant="right" />
        </CardContent>
      </Card>

      {/* Special News Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Special News</CardTitle>
        </CardHeader>
        <CardContent>
          {specialNews.length > 0 ? (
            <div className="space-y-4">
              {specialNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="block hover:bg-gray-50 p-2 rounded-md transition-colors"
                >
                  <div className="flex gap-3">
                    {item.image && (
                      <div className="relative w-20 h-20 shrink-0 rounded overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold line-clamp-2 mb-1 text-gray-900">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 text-sm py-8">
              <p>No special news available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </aside>
  );
}

