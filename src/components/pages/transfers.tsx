import { useTransferStore } from "@/data/store/transfer-store"
import { getTransfers } from "@/data/api/transfer-api"
import { DateSearchBar } from "../custom/date-search-bar"
import { transferTableColumns } from "./column-defs/transfer-columns"
import { DataTable } from "@/components/shadcn/data-table"
import { useAutoSearch } from "@/hooks/use-auto-search"

export function TransferPage(): React.JSX.Element {
  const transfers = useTransferStore(state => state.transfers)
  const setTransfers = useTransferStore(state => state.setTransfers)
  const fromDate = useTransferStore(state => state.fromDate)
  const toDate = useTransferStore(state => state.toDate)
  const setFromDate = useTransferStore(state => state.setFromDate)
  const setToDate = useTransferStore(state => state.setToDate)
  const hasSearched = useTransferStore(state => state.hasSearched)
  const setHasSearched = useTransferStore(state => state.setHasSearched)

  async function onSearchSetData(from: Date, to: Date) {
    setFromDate(from)
    setToDate(to)
    setHasSearched(true)
    setTransfers(await getTransfers(from, to))
  }

  useAutoSearch(hasSearched, onSearchSetData)

  return (
    <div className="flex flex-col gap-2">
      <DateSearchBar fromDate={fromDate} toDate={toDate} setFromDate={setFromDate} setToDate={setToDate} onSearchSetData={onSearchSetData} />
      <DataTable columns={transferTableColumns} data={transfers} />
    </div>
  )
}
