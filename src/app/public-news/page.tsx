export const dynamic = "force-dynamic";
import { getPublicNewsList } from "@/actions/news-actions";
import { formatDate } from "../../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Phone, MessageCircle } from "lucide-react";

export default async function PublicNewsPage() {
  const { data } = await getPublicNewsList();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Daily News Updates</h1>
        <p className="text-muted-foreground">Stay updated with the latest news</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.news && data.news.length > 0 ? (
          data.news.map((news) => (
            <Card key={news.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{news.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                        {news.location?.name || "-"}
                      </span>
                      <span className="text-xs">{formatDate(news.date)}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-4">
                  {news.content}
                </p>
                <div className="mt-auto space-y-2">
                  {news.link && (
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href={news.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Read More
                      </a>
                    </Button>
                  )}
                  {news.whatsappLink && (
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href={news.whatsappLink} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Join WhatsApp Group
                      </a>
                    </Button>
                  )}
                  {(news.contactPhone || news.contactWhatsApp) && (
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      {news.contactPhone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{news.contactPhone}</span>
                        </div>
                      )}
                      {news.contactWhatsApp && (
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          <a href={`https://${news.contactWhatsApp}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {news.contactWhatsApp}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No news available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

