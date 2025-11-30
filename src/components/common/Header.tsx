import HeaderWithDropdowns from './HeaderWithDropdowns';
import { getAllLocations } from '@/actions/location-actions';
import { getAllCategories } from '@/actions/category-actions';

export default async function Header() {
  // Fetch locations and categories on server with error handling
  let locations: { id: string; name: string }[] = [];
  let categories: { id: string; name: string }[] = [];

  try {
    const [locationsResult, categoriesResult] = await Promise.allSettled([
      getAllLocations().catch(() => []),
      getAllCategories().catch(() => []),
    ]);
    
    if (locationsResult.status === 'fulfilled') {
      locations = Array.isArray(locationsResult.value) ? locationsResult.value : [];
    }
    
    if (categoriesResult.status === 'fulfilled') {
      categories = Array.isArray(categoriesResult.value) ? categoriesResult.value : [];
    }
  } catch (error) {
    console.error('Error fetching header data:', error);
    // Continue with empty arrays to prevent white screen
  }

  return <HeaderWithDropdowns locations={locations} categories={categories} />;
}
