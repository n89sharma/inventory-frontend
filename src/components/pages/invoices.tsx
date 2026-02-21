import { Button } from "@/components/shadcn/button"
import { format } from "date-fns"
import { useInvoiceStore } from "@/store/invoice-store"
import { getInvoices } from "@/api/invoice"
import type { Invoice } from "@/api/invoice"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowsDownUpIcon } from "@phosphor-icons/react"
import { CollectionPage } from "./collection"

export const invoiceTableColumns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoice_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Invoice Number
          <ArrowsDownUpIcon />
        </Button>
      )
    },
  },
  {
    accessorKey: "created_by",
    header: "Created By"
  },
  {
    accessorKey: "organization",
    header: "Organization"
  },
  {
    accessorKey: "created_at",
    cell: ({ getValue }) => {
      const date = getValue<Date>()
      return date ? format(date, "PPP") : "-"
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowsDownUpIcon />
        </Button>
      )
    },
  },
  {
    accessorKey: "is_cleared",
    header: "Cleared"
  },
  {
    accessorKey: "invoice_type",
    header: "Invoice Type"
  }
]

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
