export const dynamic = "force-dynamic";
import { categoryColumns } from "../../../../components/categories/category-colums";
import { CategoryTable } from "../../../../components/categories/category-table";
import { CategoryFormDialog } from "../../../../components/categories/category-form";
import { getCategoryList } from "../../../../actions/category-actions";

export default async function CategoryPage() {
  const { data } = await getCategoryList();

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
              <p className="text-muted-foreground">Manage your Categories</p>
            </div>
            <CategoryFormDialog />
          </div>
          <CategoryTable columns={categoryColumns} data={data?.categories ?? []} />
        </div>
      </div>
    </div>
  );
}

