import { useInvoiceStore } from "@/data/store/invoice-store"
import { getInvoices } from "@/data/api/invoice-api"
import { SearchBar } from "../custom/search-bar"
import { invoiceTableColumns } from "./column-defs/invoice-columns"
import { DataTable } from "@/components/shadcn/data-table"
import { useAutoSearch } from "@/hooks/use-auto-search"
import type { SearchOptions } from "@/types/search-types"

export function InvoicesPage(): React.JSX.Element {
  const invoices = useInvoiceStore(state => state.invoices)
  const setInvoices = useInvoiceStore(state => state.setInvoices)
  const fromDate = useInvoiceStore(state => state.fromDate)
  const toDate = useInvoiceStore(state => state.toDate)
  const setFromDate = useInvoiceStore(state => state.setFromDate)
  const setToDate = useInvoiceStore(state => state.setToDate)
  const hasSearched = useInvoiceStore(state => state.hasSearched)
  const setHasSearched = useInvoiceStore(state => state.setHasSearched)

  async function onSearchSetData(from: Date, to: Date, _options: SearchOptions) {
    setFromDate(from)
    setToDate(to)
    setHasSearched(true)
    setInvoices(await getInvoices(from, to))
  }

  useAutoSearch(hasSearched, onSearchSetData)

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold p-2">
        Invoices
      </h1>
      <SearchBar criteria={{ fromDate, toDate, setFromDate, setToDate }} onSearchSetData={onSearchSetData} />
      <DataTable columns={invoiceTableColumns} data={invoices} />
    </div>
  )
}
