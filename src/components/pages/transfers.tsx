import { useTransferStore } from "@/data/store/transfer-store"
import { getTransfers } from "@/data/api/transfer-api"
import { DateSearchBar } from "../custom/date-search-bar"
import { transferTableColumns } from "./column-defs/transfer-columns"
import { DataTable } from "@/components/shadcn/data-table"

export function TransferPage(): React.JSX.Element {
  const transfers = useTransferStore(state => state.transfers)
  const setTransfers = useTransferStore(state => state.setTransfers)
  const fromDate = useTransferStore(state => state.fromDate)
  const toDate = useTransferStore(state => state.toDate)
  const setFromDate = useTransferStore(state => state.setFromDate)
  const setToDate = useTransferStore(state => state.setToDate)

  async function onSearchSetData(from: Date, to: Date) {
    setFromDate(from)
    setToDate(to)
    setTransfers(await getTransfers(from, to))
  }

  return (
    <div className="flex flex-col gap-2">
      <DateSearchBar onSearchSetData={onSearchSetData} initialFromDate={fromDate} initialToDate={toDate} />
      <DataTable columns={transferTableColumns} data={transfers} />
    </div>
  )
}
