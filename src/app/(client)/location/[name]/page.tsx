import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import RightSidebar from '@/components/news/RightSidebar';
import Pagination from '@/components/common/Pagination';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ page?: string }>;
}

const ITEMS_PER_PAGE = 12;

export default async function LocationNewsPage({ params, searchParams }: PageProps) {
  const { name } = await params;
  const { page } = await searchParams;
  const decodedName = decodeURIComponent(name);
  const currentPage = parseInt(page || '1', 10) || 1;

  // Find location by name
  const location = await prisma.location.findFirst({
    where: { name: decodedName },
  });

  if (!location) {
    notFound();
  }

  // Get total count for pagination
  const totalCount = await prisma.news.count({
    where: { locationId: location.id },
  });

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const validPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const skip = (validPage - 1) * ITEMS_PER_PAGE;

  // Get news for this location with pagination
  const news = await prisma.news.findMany({
    where: { locationId: location.id },
    orderBy: { date: 'desc' },
    skip,
    take: ITEMS_PER_PAGE,
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

        {/* Location Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{decodedName} News</h1>
          <p className="text-gray-600">
            {totalCount} {totalCount === 1 ? 'article' : 'articles'} found
            {totalPages > 1 && ` • Page ${validPage} of ${totalPages}`}
          </p>
        </div>

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* News Grid - Takes 3/4 width */}
          <div className="lg:col-span-3">
            {news.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {news.map((item) => (
                  <Card key={item.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 bg-white p-0">
                    <Link href={`/news/${item.id}`} className="block">
                      <div className="relative h-48 w-full overflow-hidden">
                        {item.image ? (
                          <>
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-sm font-medium">No Image</span>
                          </div>
                        )}
                        {/* Badges overlay on image */}
                        <div className="absolute top-3 left-3 right-3 flex items-center gap-2 flex-wrap">
                          {item.category && (
                            <Badge className="bg-white/95 backdrop-blur-sm text-gray-900 border-0 shadow-md font-semibold px-3 py-1">
                              {item.category.name}
                            </Badge>
                          )}
                          <Badge variant="outline" className="bg-white/95 backdrop-blur-sm border-white/50 text-gray-700 shadow-md font-semibold px-3 py-1">
                            {item.location.name}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="p-5 pb-3">
                        <CardTitle className="line-clamp-2 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-3">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-5 pt-0">
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                          {item.content}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-gray-400" />
                            <span className="font-medium">{formatDate(item.date)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                  ))}
                </div>
                <Pagination
                  currentPage={validPage}
                  totalPages={totalPages}
                  baseUrl={`/location/${encodeURIComponent(decodedName)}`}
                />
              </>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-gray-500">No news available for this location.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar - Takes 1/4 width */}
          <div className="lg:col-span-1">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

