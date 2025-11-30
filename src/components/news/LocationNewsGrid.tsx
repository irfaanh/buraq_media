import { prisma } from '@/lib/prisma';
import LocationNewsCard from './LocationNewsCard';
import RightSidebar from './RightSidebar';

export default async function LocationNewsGrid() {
  type LocationWithNews = {
    id: string;
    name: string;
    news: Array<{
      id: string;
      title: string;
      content: string;
      date: Date;
      image: string | null;
      location: { id: string; name: string } | null;
      category: { id: string; name: string } | null;
    }>;
  };

  let locationsWithNews: LocationWithNews[] = [];

  try {
    // Get all locations with their news
    const locations = await prisma.location.findMany({
      include: {
        news: {
          take: 5,
          orderBy: { date: 'desc' },
          include: {
            location: true,
            category: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    // Filter locations that have news
    locationsWithNews = locations.filter((loc) => loc.news.length > 0) as LocationWithNews[];
  } catch (error) {
    console.error('Error fetching location news:', error);
    // Continue with empty array to prevent crash
  }

  if (locationsWithNews.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 text-center py-12 text-gray-500">
          <p>No news available by location yet.</p>
        </div>
        <div className="lg:col-span-1">
          <RightSidebar />
        </div>
      </div>
    );
  }

  return (
    <section className="w-full py-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-1 w-12 bg-blue-600"></div>
        <h2 className="text-2xl font-bold text-gray-900">News by Location</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Location Cards - Stacked Vertically - Wider Now */}
        <div className="lg:col-span-3 space-y-6">
          {locationsWithNews.map((location) => (
            <LocationNewsCard
              key={location.id}
              locationName={location.name}
              news={location.news.map((item: {
                id: string;
                title: string;
                content: string;
                date: Date;
                image: string | null;
                location: { id: string; name: string } | null;
                category: { id: string; name: string } | null;
              }) => ({
                id: item.id,
                title: item.title,
                content: item.content,
                date: item.date,
                image: item.image,
                location: item.location,
                category: item.category,
              }))}
            />
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          <RightSidebar />
        </div>
      </div>
    </section>
  );
}

