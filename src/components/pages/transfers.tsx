import { useTransferStore } from "@/data/store/transfer-store"
import { getTransfers } from "@/data/api/transfer-api"
import { DateSearchBar } from "../custom/date-search-bar"
import { transferTableColumns } from "./column-defs/transfer-columns"
import { DataTable } from "@/components/shadcn/data-table"

export function TransferPage(): React.JSX.Element {
  const transfers = useTransferStore((state) => state.transfers)
  const setTransfers = useTransferStore((state) => state.setTransfers)

  async function onSearchSetData(from: Date, to: Date) {
    setTransfers(await getTransfers(from, to))
  }

  return (
    <div className="flex flex-col gap-2">
      <DateSearchBar onSearchSetData={onSearchSetData} />
      <DataTable columns={transferTableColumns} data={transfers} />
    </div>
  )
}
