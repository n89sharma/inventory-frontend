import { useInvoiceStore } from "@/data/store/invoice-store"
import { getInvoices } from "@/data/api/invoice-api"
import { DateSearchBar } from "../custom/date-search-bar"
import { invoiceTableColumns } from "./column-defs/invoice-columns"
import { DataTable } from "@/components/shadcn/data-table"

export function InvoicesPage(): React.JSX.Element {
  const invoices = useInvoiceStore(state => state.invoices)
  const setInvoices = useInvoiceStore(state => state.setInvoices)
  const fromDate = useInvoiceStore(state => state.fromDate)
  const toDate = useInvoiceStore(state => state.toDate)
  const setFromDate = useInvoiceStore(state => state.setFromDate)
  const setToDate = useInvoiceStore(state => state.setToDate)

  async function onSearchSetData(from: Date, to: Date) {
    setFromDate(from)
    setToDate(to)
    setInvoices(await getInvoices(from, to))
  }

  return (
    <div className="flex flex-col gap-2">
      <DateSearchBar onSearchSetData={onSearchSetData} initialFromDate={fromDate} initialToDate={toDate} />
      <DataTable columns={invoiceTableColumns} data={invoices} />
    </div>
  )
}
