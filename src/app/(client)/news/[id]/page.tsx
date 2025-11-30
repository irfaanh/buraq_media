import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Clock, ArrowLeft, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import RightSidebar from '@/components/news/RightSidebar';
import NewsShareButton from '@/components/news/NewsShareButton';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Get news by ID
  const news = await prisma.news.findUnique({
    where: { id },
    include: {
      location: true,
      category: true,
    },
  });

  if (!news) {
    notFound();
  }

  // Get related news (same location or category)
  const relatedNews = await prisma.news.findMany({
    where: {
      AND: [
        { id: { not: news.id } },
        {
          OR: [
            { locationId: news.locationId },
            { categoryId: news.categoryId },
          ],
        },
      ],
    },
    take: 4,
    orderBy: { date: 'desc' },
    include: {
      location: true,
      category: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <article className="lg:col-span-3">
            <Card className="overflow-hidden">
              {/* News Image */}
              {news.image && (
                <div className="relative h-96 w-full">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <CardContent className="p-6">
                {/* Metadata */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(news.date)}</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 mb-6">
                  {news.category && (
                    <Badge variant="secondary">{news.category.name}</Badge>
                  )}
                  {news.location && (
                    <Badge variant="outline">{news.location.name}</Badge>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {news.title}
                </h1>

                {/* Content */}
                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {news.content}
                  </p>
                </div>

                {/* Contact & Links Section */}
                {(news.contactWhatsApp || news.whatsappLink) && (
                  <div className="border-t pt-6 mt-6">
                    <h3 className="font-semibold mb-4">Contact & Links</h3>
                    <div className="flex flex-wrap gap-4">
                      {news.contactWhatsApp && (
                        <Link href={`https://wa.me/${news.contactWhatsApp.replace('wa.me/', '')}`} target="_blank">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            WhatsApp
                          </Button>
                        </Link>
                      )}
                      {news.whatsappLink && (
                        <Link href={news.whatsappLink} target="_blank">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            WhatsApp Link
                          </Button>
                        </Link>
                      )}
                      <NewsShareButton title={news.title} content={news.content} />
                    </div>
                  </div>
                )}
                
                {/* Share Section (if no WhatsApp links) */}
                {!(news.contactWhatsApp || news.whatsappLink) && (
                  <div className="border-t pt-6 mt-6">
                    <h3 className="font-semibold mb-4">Share</h3>
                    <div className="flex flex-wrap gap-4">
                      <NewsShareButton title={news.title} content={news.content} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Related News Section */}
            {relatedNews.length > 0 && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Related News</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedNews.map((item) => (
                      <Link key={item.id} href={`/news/${item.id}`}>
                        <div className="flex gap-3 hover:bg-gray-50 p-2 rounded transition-colors">
                          {item.image && (
                            <div className="relative w-20 h-20 shrink-0">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold line-clamp-2 mb-1">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {formatDate(item.date)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </article>

          {/* Right Sidebar */}
          <aside className="lg:col-span-1">
            <RightSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}

