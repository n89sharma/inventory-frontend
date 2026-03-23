import { DataTable } from "@/components/shadcn/data-table"
import { getHolds } from "@/data/api/hold-api"
import { useHoldStore } from "@/data/store/hold-store"
import { useAutoSearch } from "@/hooks/use-auto-search"
import type { SearchOptions } from "@/types/search-option-types"
import { ANY_OPTION } from "@/types/select-option-types"
import { SearchBar } from "../custom/search-bar"
import { holdTableColumns } from "./column-defs/hold-columns"

export function HoldSummaryPage(): React.JSX.Element {
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

  async function onSearchSetData({ fromDate, toDate, holdBy, holdFor }: SearchOptions) {
    setHasSearched(true)
    setHolds(await getHolds(fromDate, toDate, holdBy ?? ANY_OPTION, holdFor ?? ANY_OPTION))
  }

  useAutoSearch(hasSearched, onSearchSetData, { setFromDate, setToDate, setHoldBy, setHoldFor })

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold p-2">
        Holds
      </h1>
      <SearchBar
        searchOptions={{ fromDate, toDate, holdBy, holdFor }}
        setSearchOptions={{ setFromDate, setToDate, setHoldBy, setHoldFor }}
        onSearch={onSearchSetData}
        showHeldByFor={true}
      />
      <DataTable columns={holdTableColumns} data={holds} />
    </div>
  )
}
