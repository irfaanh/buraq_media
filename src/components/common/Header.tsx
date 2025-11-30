import HeaderWithDropdowns from './HeaderWithDropdowns';
import { getAllLocations } from '@/actions/location-actions';
import { getAllCategories } from '@/actions/category-actions';

export default async function Header() {
  // Fetch locations and categories on server
  const [locations, categories] = await Promise.all([
    getAllLocations(),
    getAllCategories(),
  ]);

  return <HeaderWithDropdowns locations={locations} categories={categories} />;
}
