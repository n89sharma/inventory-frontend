import { useDepartureStore } from "@/data/store/departure-store"
import { getDepartures } from "@/data/api/departure-api"
import { CollectionPage } from "./collection"
import { departureTableColumns } from "./column-defs/departure-columns"

export function DeparturePage(): React.JSX.Element {
  const departures = useDepartureStore((state) => state.departures)
  const setDepartures = useDepartureStore((state) => state.setDepartures)

  async function onSearchSetData(from: Date, to: Date) {
    setDepartures(await getDepartures(from, to))
  }

  return (
    <CollectionPage
      collection={departures}
      onSearchSetData={onSearchSetData}
      columns={departureTableColumns}
    />
  )
}
