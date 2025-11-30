export const dynamic = "force-dynamic";
import { locationColumns } from "../../../../components/locations/location-colums";
import { LocationTable } from "../../../../components/locations/location-table";
import { LocationFormDialog } from "../../../../components/locations/location-form";
import { getLocationList } from "../../../../actions/location-actions";

export default async function LocationPage() {
  const { data } = await getLocationList();

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Locations</h1>
              <p className="text-muted-foreground">Manage your Locations</p>
            </div>
            <LocationFormDialog />
          </div>
          <LocationTable columns={locationColumns} data={data?.locations ?? []} />
        </div>
      </div>
    </div>
  );
}

