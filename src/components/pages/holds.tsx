import { useHoldStore } from "@/data/store/hold-store"
import { getHolds } from "@/data/api/hold-api"
import { CollectionPage } from "./collection"
import { holdTableColumns } from "./column-defs/hold-columns"

export function HoldPage(): React.JSX.Element {
  const holds = useHoldStore((state) => state.holds)
  const setHolds = useHoldStore((state) => state.setHolds)

  async function onSearchSetData(from: Date, to: Date) {
    setHolds(await getHolds(from, to))
  }

  return (
    <CollectionPage
      collection={holds}
      onSearchSetData={onSearchSetData}
      columns={holdTableColumns}
    />
  )
}
