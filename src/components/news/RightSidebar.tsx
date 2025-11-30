import { Facebook, Youtube, ThumbsUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdvertisementSpace from './AdvertisementSpace';
import { getSpecialNews } from '@/actions/news-actions';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

interface SpecialNewsItem {
  id: string;
  title: string;
  content: string;
  date: Date;
  image: string | null;
  location: { id: string; name: string } | null;
  category: { id: string; name: string } | null;
}

export default async function RightSidebar() {
  let specialNews: SpecialNewsItem[] = [];

  try {
    const result = await getSpecialNews();
    specialNews = (result?.data?.news || []) as SpecialNewsItem[];
  } catch (error) {
    console.error('Error fetching special news:', error);
    // Continue with empty array to prevent crash
  }

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
            <Link href="https://www.facebook.com/asif.buraq" target="_blank" rel="noopener noreferrer" className="block mt-4">
              <Button className="w-full" size="sm">
                <Facebook className="h-4 w-4 mr-2" />
                Like Page
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Subscribe to YouTube */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">            <Youtube className="h-5 w-5 text-red-600" />
            Subscribe to our YOUTUBE channels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Channel 1 */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg font-bold">B</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Buraq Media Live</p>
                <p className="text-xs text-gray-500">News Channel</p>
              </div>
            </div>
            <Link href="https://www.youtube.com/@ASIFBURAQmidealivenews" target="_blank" rel="noopener noreferrer">
              <Button variant="destructive" className="w-full" size="sm">
                <Youtube className="h-4 w-4 mr-2" />
                Subscribe Channel 1
              </Button>
            </Link>
            
            <div className="border-t my-3"></div>
            
            {/* Channel 2 */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg font-bold">B</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Buraq Media</p>
                <p className="text-xs text-gray-500">News Channel</p>
              </div>
            </div>
            <Link href="https://www.youtube.com/@ASIFBURQ" target="_blank" rel="noopener noreferrer">
              <Button variant="destructive" className="w-full" size="sm">
                <Youtube className="h-4 w-4 mr-2" />
                Subscribe Channel 2
              </Button>
            </Link>
          </div>
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

