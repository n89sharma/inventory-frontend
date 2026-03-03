import { useArrivalStore } from "@/data/store/arrival-store"
import { getArrivals } from "@/data/api/arrival-api"
import { CollectionPage } from "./collection"
import { arrivalTableColumns } from "./column-defs/arrival-columns"

export function ArrivalsPage(): React.JSX.Element {
  const arrivals = useArrivalStore((state) => state.arrivals)
  const setArrivals = useArrivalStore((state) => state.setArrivals)

  async function onSearchSetData(from: Date, to: Date) {
    setArrivals(await getArrivals(from, to))
  }

  return (
    <CollectionPage
      collection={arrivals}
      onSearchSetData={onSearchSetData}
      columns={arrivalTableColumns}
    />
  )
}
