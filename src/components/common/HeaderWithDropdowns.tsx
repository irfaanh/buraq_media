'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface HeaderWithDropdownsProps {
  locations: Array<{ id: string; name: string }>;
  categories: Array<{ id: string; name: string }>;
}

export default function HeaderWithDropdowns({ locations, categories }: HeaderWithDropdownsProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localNewsOpen, setLocalNewsOpen] = useState(false);
  const [categoryNewsOpen, setCategoryNewsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="w-full bg-gradient-to-r from-white via-red-500 to-red-800 shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left Side */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo11.png" alt="Logo" width={80} height={80} />
          </Link>

          {/* Navigation - Right Side */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Home Button */}
            <Link href="/">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                className={cn(
                  'px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-lg',
                  isActive('/')
                    ? 'bg-white text-red-700 shadow-md hover:shadow-lg hover:scale-105'
                    : 'text-white hover:bg-white/20 hover:text-white backdrop-blur-sm'
                )}
              >
                Home
              </Button>
            </Link>

            {/* Local News Hover Popover */}
            <Popover open={localNewsOpen} onOpenChange={setLocalNewsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={pathname.startsWith('/location/') ? 'default' : 'ghost'}
                  className={cn(
                    'px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-lg',
                    pathname.startsWith('/location/')
                      ? 'bg-white text-red-700 shadow-md hover:shadow-lg hover:scale-105'
                      : 'text-white hover:bg-white/20 hover:text-white backdrop-blur-sm'
                  )}
                  onMouseEnter={() => setLocalNewsOpen(true)}
                  onMouseLeave={() => setLocalNewsOpen(false)}
                >
                  Local News
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                align="end" 
                className="w-56 p-2 bg-white/95 backdrop-blur-md shadow-xl border-0"
                onMouseEnter={() => setLocalNewsOpen(true)}
                onMouseLeave={() => setLocalNewsOpen(false)}
              >
                {locations.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {locations.map((location) => (
                      <Link
                        key={location.id}
                        href={`/location/${encodeURIComponent(location.name)}`}
                        className="px-3 py-2.5 text-sm rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-medium"
                      >
                        {location.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="px-3 py-2 text-sm text-gray-500">No locations available</p>
                )}
              </PopoverContent>
            </Popover>

            {/* Category News Hover Popover */}
            <Popover open={categoryNewsOpen} onOpenChange={setCategoryNewsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={pathname.startsWith('/category/') ? 'default' : 'ghost'}
                  className={cn(
                    'px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-lg',
                    pathname.startsWith('/category/')
                      ? 'bg-white text-red-700 shadow-md hover:shadow-lg hover:scale-105'
                      : 'text-white hover:bg-white/20 hover:text-white backdrop-blur-sm'
                  )}
                  onMouseEnter={() => setCategoryNewsOpen(true)}
                  onMouseLeave={() => setCategoryNewsOpen(false)}
                >
                  Category News
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                align="end" 
                className="w-56 p-2 bg-white/95 backdrop-blur-md shadow-xl border-0"
                onMouseEnter={() => setCategoryNewsOpen(true)}
                onMouseLeave={() => setCategoryNewsOpen(false)}
              >
                {categories.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${encodeURIComponent(category.name)}`}
                        className="px-3 py-2.5 text-sm rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-medium"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="px-3 py-2 text-sm text-gray-500">No categories available</p>
                )}
              </PopoverContent>
            </Popover>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4 bg-white/10 backdrop-blur-md">
            <nav className="flex flex-col gap-2">
              {/* Home Link */}
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300',
                  isActive('/')
                    ? 'bg-white text-red-700 shadow-md'
                    : 'text-white hover:bg-white/20'
                )}
              >
                Home
              </Link>
              
              {/* Mobile Local News */}
              <div className="px-4 py-2">
                <p className="text-sm font-bold text-white mb-3">Local News</p>
                <div className="flex flex-col gap-1">
                  {locations.map((location) => (
                    <Link
                      key={location.id}
                      href={`/location/${encodeURIComponent(location.name)}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-2.5 text-sm text-white/90 hover:bg-white/20 hover:text-white rounded-lg transition-all duration-200"
                    >
                      {location.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Category News */}
              <div className="px-4 py-2">
                <p className="text-sm font-bold text-white mb-3">Category News</p>
                <div className="flex flex-col gap-1">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${encodeURIComponent(category.name)}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-2.5 text-sm text-white/90 hover:bg-white/20 hover:text-white rounded-lg transition-all duration-200"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

