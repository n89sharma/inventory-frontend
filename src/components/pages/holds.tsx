import { useHoldStore } from "@/data/store/hold-store"
import { getHolds } from "@/data/api/hold-api"
import { SearchBar } from "../custom/search-bar"
import { holdTableColumns } from "./column-defs/hold-columns"
import { DataTable } from "@/components/shadcn/data-table"
import { useAutoSearch } from "@/hooks/use-auto-search"
import type { SearchOptions } from "@/types/search-types"

export function HoldPage(): React.JSX.Element {
  const holds = useHoldStore(state => state.holds)
  const setHolds = useHoldStore(state => state.setHolds)
  const fromDate = useHoldStore(state => state.fromDate)
  const toDate = useHoldStore(state => state.toDate)
  const setFromDate = useHoldStore(state => state.setFromDate)
  const setToDate = useHoldStore(state => state.setToDate)
  const holdBy = useHoldStore(state => state.holdBy)
  const holdFor = useHoldStore(state => state.holdFor)
  const setHoldBy = useHoldStore(state => state.setHoldBy)
  const setHoldFor = useHoldStore(state => state.setHoldFor)
  const hasSearched = useHoldStore(state => state.hasSearched)
  const setHasSearched = useHoldStore(state => state.setHasSearched)

  async function onSearchSetData(from: Date, to: Date, { holdBy, holdFor }: SearchOptions) {
    setFromDate(from)
    setToDate(to)
    setHoldBy(holdBy)
    setHoldFor(holdFor)
    setHasSearched(true)
    setHolds(await getHolds(from, to, holdBy, holdFor))
  }

  useAutoSearch(hasSearched, onSearchSetData)

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold p-2">
        Holds
      </h1>
      <SearchBar
        criteria={{ fromDate, toDate, setFromDate, setToDate, holdBy, setHoldBy, holdFor, setHoldFor }}
        onSearchSetData={onSearchSetData}
        showHeldByFor={true}
      />
      <DataTable columns={holdTableColumns} data={holds} />
    </div>
  )
}
