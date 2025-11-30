export const dynamic = "force-dynamic";
import { newsColumns } from "../../../../components/news/news-colums";
import { NewsTable } from "../../../../components/news/news-table";
import { NewsFormDialog } from "../../../../components/news/news-form";
import { getNewsList } from "../../../../actions/news-actions";

export default async function NewsPage() {
  const { data } = await getNewsList();

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">News</h1>
              <p className="text-muted-foreground">Manage your News</p>
            </div>
            <NewsFormDialog />
          </div>
          <NewsTable columns={newsColumns} data={data?.news ?? []} />
        </div>
      </div>
    </div>
  );
}

