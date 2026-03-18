import { useTransferStore } from "@/data/store/transfer-store"
import { getTransfers } from "@/data/api/transfer-api"
import { SearchBar } from "../custom/search-bar"
import { transferTableColumns } from "./column-defs/transfer-columns"
import { DataTable } from "@/components/shadcn/data-table"
import { useAutoSearch } from "@/hooks/use-auto-search"
import type { SearchOptions } from "@/types/search-option-types"
import { ANY_OPTION } from "@/types/select-option-types"

export function TransferPage(): React.JSX.Element {
  const transfers = useTransferStore(state => state.transfers)
  const setTransfers = useTransferStore(state => state.setTransfers)
  const fromDate = useTransferStore(state => state.fromDate)
  const toDate = useTransferStore(state => state.toDate)
  const origin = useTransferStore(state => state.origin)
  const destination = useTransferStore(state => state.destination)
  const setFromDate = useTransferStore(state => state.setFromDate)
  const setToDate = useTransferStore(state => state.setToDate)
  const setOrigin = useTransferStore(state => state.setOrigin)
  const setDestination = useTransferStore(state => state.setDestination)
  const hasSearched = useTransferStore(state => state.hasSearched)
  const setHasSearched = useTransferStore(state => state.setHasSearched)

  async function onSearchSetData({ fromDate, toDate, origin, destination }: SearchOptions) {
    setHasSearched(true)
    setTransfers(await getTransfers(fromDate, toDate, origin ?? ANY_OPTION, destination ?? ANY_OPTION))
  }

  useAutoSearch(hasSearched, onSearchSetData, { setFromDate, setToDate, setOrigin, setDestination })

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold p-2">
        Transfers
      </h1>
      <SearchBar
        searchOptions={{ fromDate, toDate, origin, destination }}
        setSearchOptions={{ setFromDate, setToDate, setOrigin, setDestination }}
        onSearch={onSearchSetData}
        showOrigin={true}
        showDestination={true}
      />
      <DataTable columns={transferTableColumns} data={transfers} />
    </div>
  )
}
