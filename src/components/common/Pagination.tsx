'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Button */}
      <Link href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : '#'}>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          className={cn(
            'gap-1',
            currentPage === 1 && 'opacity-50 cursor-not-allowed'
          )}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
      </Link>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <Link key={pageNum} href={`${baseUrl}?page=${pageNum}`}>
              <Button
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                className={cn(
                  'min-w-[40px]',
                  isActive && 'bg-blue-600 text-white hover:bg-blue-700'
                )}
              >
                {pageNum}
              </Button>
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      <Link href={currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : '#'}>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          className={cn(
            'gap-1',
            currentPage === totalPages && 'opacity-50 cursor-not-allowed'
          )}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}







