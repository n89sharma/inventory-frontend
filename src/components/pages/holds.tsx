import { useHoldStore } from "@/data/store/hold-store"
import { getHolds } from "@/data/api/hold-api"
import { DateSearchBar } from "../custom/date-search-bar"
import { holdTableColumns } from "./column-defs/hold-columns"
import { DataTable } from "@/components/shadcn/data-table"

export function HoldPage(): React.JSX.Element {
  const holds = useHoldStore(state => state.holds)
  const setHolds = useHoldStore(state => state.setHolds)
  const fromDate = useHoldStore(state => state.fromDate)
  const toDate = useHoldStore(state => state.toDate)
  const setFromDate = useHoldStore(state => state.setFromDate)
  const setToDate = useHoldStore(state => state.setToDate)

  async function onSearchSetData(from: Date, to: Date) {
    setFromDate(from)
    setToDate(to)
    setHolds(await getHolds(from, to))
  }

  return (
    <div className="flex flex-col gap-2">
      <DateSearchBar onSearchSetData={onSearchSetData} initialFromDate={fromDate} initialToDate={toDate} />
      <DataTable columns={holdTableColumns} data={holds} />
    </div>
  )
}
