import { useTransferStore } from "@/data/store/transfer-store"
import { getTransfers } from "@/data/api/transfer-api"
import { CollectionPage } from "./collection"
import { transferTableColumns } from "./column-defs/transfer-columns"

export function TransferPage(): React.JSX.Element {
  const departures = useTransferStore((state) => state.transfers)
  const setTransfers = useTransferStore((state) => state.setTransfers)

  async function onSearchSetData(from: Date, to: Date) {
    setTransfers(await getTransfers(from, to))
  }

  return (
    <CollectionPage
      collection={departures}
      onSearchSetData={onSearchSetData}
      columns={transferTableColumns}
    />
  )
}
