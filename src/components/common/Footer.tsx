import Link from 'next/link';
import { Facebook, Youtube, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickLinks1 = [
  { href: '/', label: 'Home' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Most Viewed News */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">Most Viewed News</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block group">
                  <span className="group-hover:text-blue-400">Latest News Article Title</span>
                  <p className="text-xs text-gray-500 mt-1.5">15 hours ago</p>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block group">
                  <span className="group-hover:text-blue-400">Another News Article Title</span>
                  <p className="text-xs text-gray-500 mt-1.5">16 hours ago</p>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Recent News */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">Recent News</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block group">
                  <span className="group-hover:text-blue-400">Recent News Article Title</span>
                  <p className="text-xs text-gray-500 mt-1.5">15 hours ago</p>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 block group">
                  <span className="group-hover:text-blue-400">Another Recent News Title</span>
                  <p className="text-xs text-gray-500 mt-1.5">16 hours ago</p>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Subscribe to YouTube */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">Subscribe to our YOUTUBE channel</h3>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-red-500/50">
                <Youtube className="text-white h-7 w-7" />
              </div>
              <div>
                <p className="font-bold text-white">Buraq Media</p>
                <p className="text-xs text-gray-400">News Channel</p>
              </div>
            </div>
            <Button variant="destructive" size="sm" className="w-full hover:scale-105 transition-transform duration-300 shadow-lg">
              <Youtube className="h-4 w-4 mr-2" />
              YouTube
            </Button>
            <p className="text-xs text-gray-400 mt-3 text-center">3K subscribers</p>
          </div>

          {/* Column 4: Find us on Facebook */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">Find us on Facebook</h3>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-blue-500/50">
                <Facebook className="text-white h-7 w-7" />
              </div>
              <div>
                <p className="font-bold text-white">Buraq Media</p>
                <p className="text-xs text-gray-400">23,015 followers</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="default" size="sm" className="flex-1 hover:scale-105 transition-transform duration-300 shadow-lg">
                <Facebook className="h-4 w-4 mr-2" />
                Follow Page
              </Button>
              <Button variant="outline" size="sm" className="flex-1 border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300">
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <Link
            href="#"
            className="w-12 h-12 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
            aria-label="Facebook"
          >
            <Facebook className="h-6 w-6" />
          </Link>
          <Link
            href="#"
            className="w-12 h-12 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
            aria-label="YouTube"
          >
            <Youtube className="h-6 w-6" />
          </Link>
          <Link
            href="#"
            className="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
            aria-label="Telegram"
          >
            <MessageCircle className="h-6 w-6" />
          </Link>
          <Link
            href="#"
            className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-full hover:bg-green-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-6 w-6" />
          </Link>
        </div>

        {/* Website Description */}
        <div className="text-center mb-10 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <p className="text-sm text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Through This Website, We Are Trying To Visualise You &quot;Buraq Bulletin&quot; As A Whole About Various Organizations, 
            Prominent Personalities, And Government Institutions, Our Celebration, Important Activities And So On That Are Related To Our Community.
          </p>
        </div>

      

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-all duration-300 hover:scale-105 font-medium">
                www.buraqmedia.com
              </Link>
              <span className="text-white/30">•</span>
              <span>Copyright 2025, All Rights Reserved</span>
              <span className="text-white/30">•</span>
              <span className="flex items-center gap-1">
                I Love My India <span className="text-red-400 animate-pulse">❤</span>
              </span>
            </div>
            <nav className="flex items-center gap-6 text-sm">
              {quickLinks1.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

