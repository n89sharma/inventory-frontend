import { useTransferStore } from "@/data/store/transfer-store"
import { getTransfers } from "@/data/api/transfer-api"
import { SearchBar } from "../custom/search-bar"
import { transferTableColumns } from "./column-defs/transfer-columns"
import { DataTable } from "@/components/shadcn/data-table"
import { useAutoSearch } from "@/hooks/use-auto-search"
import type { SelectOption } from "@/types/select-option-types"
import type { Warehouse } from "@/data/api/constants-api"

export function TransferPage(): React.JSX.Element {
  const transfers = useTransferStore(state => state.transfers)
  const setTransfers = useTransferStore(state => state.setTransfers)
  const fromDate = useTransferStore(state => state.fromDate)
  const toDate = useTransferStore(state => state.toDate)
  const setFromDate = useTransferStore(state => state.setFromDate)
  const setToDate = useTransferStore(state => state.setToDate)
  const warehouse = useTransferStore(state => state.warehouse)
  const setWarehouse = useTransferStore(state => state.setWarehouse)
  const hasSearched = useTransferStore(state => state.hasSearched)
  const setHasSearched = useTransferStore(state => state.setHasSearched)

  async function onSearchSetData(from: Date, to: Date, warehouse: SelectOption<Warehouse>) {
    setFromDate(from)
    setToDate(to)
    setHasSearched(true)
    setWarehouse(warehouse)
    setTransfers(await getTransfers(from, to, warehouse))
  }

  useAutoSearch(hasSearched, onSearchSetData)

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold p-2">
        Transfers
      </h1>
      <SearchBar criteria={{ fromDate, toDate, warehouse, setFromDate, setToDate, setWarehouse }} onSearchSetData={onSearchSetData} />
      <DataTable columns={transferTableColumns} data={transfers} />
    </div>
  )
}
