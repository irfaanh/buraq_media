import { getPublicNewsList } from '@/actions/news-actions';
import LatestNewsSection from '@/components/news/LatestNewsSection';
import LocationNewsGrid from '@/components/news/LocationNewsGrid';
import FeaturedNewsCarousel from '@/components/news/FeaturedNewsCarousel';
import AdvertisementSpace from '@/components/news/AdvertisementSpace';

export const dynamic = 'force-dynamic';

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

export default async function HomePage() {
  let news: NewsItem[] = [];
  
  try {
    const result = await getPublicNewsList();
    
    // SafeActionResult returns { data: { news } } or { serverError } or { validationErrors }
    if (result?.data?.news && Array.isArray(result.data.news)) {
      news = result.data.news;
    } else if (result?.serverError) {
      console.error('Server error:', result.serverError);
    } else if (result?.validationErrors) {
      console.error('Validation errors:', result.validationErrors);
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    // Continue with empty array to prevent white screen
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full py-8">
        <div className="relative flex">
          {/* Left Advertisement Space - Outside Content Container */}
          <aside className="hidden xl:block shrink-0 w-[200px] px-4">
            <div className="sticky top-24">
              <AdvertisementSpace />
            </div>
          </aside>

          {/* Main Content - Full width matching header/footer */}
          <div className="flex-1 max-w-7xl mx-auto px-4">
            {/* Featured News Carousel - Auto Scrolling */}
            {Array.isArray(news) && news.length > 0 ? (
              <FeaturedNewsCarousel news={news} />
            ) : (
              <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800">No news available to display in carousel.</p>
              </div>
            )}

            {/* Latest News Section */}
            {Array.isArray(news) && news.length > 0 && (
              <LatestNewsSection news={news} />
            )}

            {/* Location-based News Grid */}
            <LocationNewsGrid />
          </div>

          {/* Right Advertisement Space - Outside Content Container */}
          <aside className="hidden xl:block shrink-0 w-[200px] px-4">
            <div className="sticky top-24">
              <AdvertisementSpace />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
