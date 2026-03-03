import { useInvoiceStore } from "@/data/store/invoice-store"
import { getInvoices } from "@/data/api/invoice-api"
import { CollectionPage } from "./collection"
import { invoiceTableColumns } from "./column-defs/invoice-columns"

export function InvoicesPage(): React.JSX.Element {
  const invoices = useInvoiceStore((state) => state.invoices)
  const setInvoices = useInvoiceStore((state) => state.setInvoices)

  async function onSearchSetData(from: Date, to: Date) {
    setInvoices(await getInvoices(from, to))
  }

  return (
    <CollectionPage
      collection={invoices}
      onSearchSetData={onSearchSetData}
      columns={invoiceTableColumns}
    />
  )
}
