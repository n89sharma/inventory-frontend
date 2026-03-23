import { getArrivalForEdit } from '@/data/api/arrival-api'
import { useConstantsStore } from '@/data/store/constants-store'
import { useModelStore } from '@/data/store/model-store'
import { useOrgStore } from '@/data/store/org-store'
import type { ArrivalForm } from '@/types/arrival-types'
import { getSelectOption } from '@/types/select-option-types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrivalCreatePage } from './arrival-create-page'

export function ArrivalEditPage(): React.JSX.Element {
  const { collectionId } = useParams<{ collectionId: string }>()
  const [resolved, setResolved] = useState<ArrivalForm | null>(null)

  const orgs = useOrgStore(state => state.organizations)
  const warehouses = useConstantsStore(state => state.warehouses)
  const technicalStatuses = useConstantsStore(state => state.technicalStatuses)
  const coreFunctions = useConstantsStore(state => state.coreFunctions)
  const models = useModelStore(state => state.models)

  useEffect(() => {
    async function load() {
      if (!collectionId) return
      const raw = await getArrivalForEdit(collectionId)
      setResolved({
        id: raw.id,
        vendor: orgs.find(o => o.id === raw.vendorId) ?? null,
        transporter: orgs.find(o => o.id === raw.transporterId) ?? null,
        warehouse: getSelectOption(warehouses.find(w => w.id === raw.warehouseId)!),
        comment: raw.comment,
        assets: raw.assets.map(a => ({
          id: a.id,
          tempId: crypto.randomUUID(),
          model: models.find(m => m.id === a.modelId) ?? null,
          serialNumber: a.serialNumber,
          meterBlack: a.meterBlack,
          meterColour: a.meterColour,
          cassettes: a.cassettes,
          technicalStatus: getSelectOption(
            technicalStatuses.find(t => t.id === a.technicalStatusId)!
          ),
          internalFinisher: a.internalFinisher,
          coreFunctions: coreFunctions.filter(c => a.coreFunctionIds.includes(c.id))
        }))
      })
    }
    load()
  }, [collectionId])

  if (!resolved) return <div>Loading...</div>
  return <ArrivalCreatePage defaultValues={resolved} arrivalId={collectionId} />
}
