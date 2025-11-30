'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle, Facebook, Twitter, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface NewsShareDialogSimpleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  content: string;
  url: string;
}

export const NewsShareDialogSimple = ({ open, setOpen, title, content, url }: NewsShareDialogSimpleProps) => {
  const [copied, setCopied] = useState(false);

  // Get full URL
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;
  // Format: Title, Content, then Link
  const shareText = `${title}\n\n${content}\n\n${fullUrl}`;

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
    window.open(facebookUrl, '_blank');
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast.success('Message copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy message');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share News</DialogTitle>
          <DialogDescription>
            Share this news article on social media
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Share buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleWhatsAppShare}
              className="bg-green-600 hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button
              onClick={handleFacebookShare}
              variant="outline"
            >
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </Button>
            <Button
              onClick={handleTwitterShare}
              variant="outline"
            >
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </Button>
            <Button
              onClick={handleCopyToClipboard}
              variant="outline"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Text
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

