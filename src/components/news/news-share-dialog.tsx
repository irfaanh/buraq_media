"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { News } from "../../types/news";
import { MessageCircle, Facebook, Twitter, Copy, Check } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../../lib/utils";
import { toast } from "sonner";

interface NewsShareDialogProps {
  news: News;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const NewsShareDialog = ({ news, open, setOpen }: NewsShareDialogProps) => {
  const [copied, setCopied] = useState(false);

  // Format the news message in WhatsApp style
  const formatMessage = () => {
    const date = news.date ? formatDate(news.date) : new Date().toLocaleDateString();
    // Use simple text-based symbols that work universally
    // These avoid encoding issues that cause question marks in WhatsApp
    const satelliteEmoji = '📡'; // Keep satellite - usually works
    const downArrowEmoji = '⬇'; // Simple down arrow without variation selector
    const phoneEmoji = '📱'; // Mobile phone emoji
    const whatsappEmoji = '💬'; // Speech balloon
    const copyrightEmoji = '©'; // Copyright sign
    
    let message = `*${satelliteEmoji} ${news.title}*\n\n`;
    message += `*${date}*\n\n`;
    
    // Add location before content if available
    if (news.location?.name) {
      message += `${news.location.name} : `;
    }
    
    message += `${news.content}\n\n`;
    
    if (news.link) {
      message += `*കൂടുതൽ വായിക്കുന്നതിന് ലിങ്കിൽ ക്ലിക്ക് ചെയ്യുക${downArrowEmoji}*\n\n`;
      message += `${news.link}\n\n`;
    }
    
    if (news.whatsappLink) {
      message += `*വാട്ട്സ്ആപ്പിലൂടെ വാർത്തകൾ  ലഭിക്കുവാൻ താഴെ കാണുന്ന ലിങ്കിൽ അമർത്തുക${downArrowEmoji}*\n\n`;
      message += `${news.whatsappLink}\n\n`;
    }
    
    if (news.contactPhone || news.contactWhatsApp) {
      message += `*ഞങ്ങളിലൂടെ പരസ്യങ്ങളും അറിയിപ്പുകളും പങ്കിടുന്നതിനായി ബന്ധപ്പെടുക*\n\n`;
      if (news.contactPhone) {
        message += `${phoneEmoji} ${news.contactPhone}\n`;
      }
      if (news.contactWhatsApp) {
        message += `${whatsappEmoji} ${news.contactWhatsApp}\n`;
      }
      message += `\n`;
    }
    
    message += `-------------------------------------\n\n`;
    message += `${copyrightEmoji}  www.buraqbulletin.in`;
    
    return message;
  };

  const shareMessage = formatMessage();
  const shareUrl = news.link || (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = news.title;

  const handleWhatsAppShare = () => {
    // Use api.whatsapp.com which handles emoji encoding better than wa.me
    // This endpoint is more reliable for emoji support
    const encodedMessage = encodeURIComponent(shareMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, "_blank");
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      toast.success("Message copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Share News</DialogTitle>
          <DialogDescription>
            Share this news on social media or copy the message
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview of formatted message */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border">
            <div className="whitespace-pre-wrap text-sm font-mono">
              {shareMessage}
            </div>
          </div>

          {/* Share buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleWhatsAppShare}
              className="flex-1 min-w-[140px] bg-green-600 hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button
              onClick={handleFacebookShare}
              variant="outline"
              className="flex-1 min-w-[140px]"
            >
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </Button>
            <Button
              onClick={handleTwitterShare}
              variant="outline"
              className="flex-1 min-w-[140px]"
            >
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </Button>
            <Button
              onClick={handleCopyToClipboard}
              variant="outline"
              className="flex-1 min-w-[140px]"
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

