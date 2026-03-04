import { useState } from "react";
import { DropdownSelectType } from "../custom/dropdown-select-type";
import { Button } from "../shadcn/button";
import { FieldGroup, Field, FieldLabel } from "../shadcn/field";
import { Textarea } from "../shadcn/textarea";
import { useConstantsStore } from "@/data/store/constants-store";
import { PopoverSearch } from "../custom/popover-search";
import { useOrgStore } from "@/data/store/org-store";
import type { Organization } from "@/data/api/org-api";
import type { Model } from "@/data/api/model-api";
import { PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { InputNumber } from "../custom/input-number";
import MultipleSelector from '@/components/shadcn/multiple-selector';
import { useModelStore } from "@/data/store/model-store";

type NewAsset = {
  tempId: string,
  model: Model | null,
  serialNumber: string,
  meterBlack: string,
  meterColour: string,
  internalFinisher: string,
  coreFunctions: string[],
  cassettes: string,
  technicalStatusId: string
}

type NewArrivalState = {
  vendor: Organization | null,
  transporter: Organization | null,
  warehouseId: string | null,
}

export function ArrivalCreatePage(): React.JSX.Element {
  const [newArrival, setNewArrival] = useState<NewArrivalState>({
    vendor: null,
    transporter: null,
    warehouseId: '2'
  })
  const [newAssets, setNewAssets] = useState<NewAsset[]>([])
  const warehouses = useConstantsStore((state) => state.warehouses)
  const technicalStatuses = useConstantsStore((state) => state.technicalStatuses)
  const coreFunctions = useConstantsStore((state) => state.coreFunctions).map(f => ({ id: f.id, label: f.accessory, value: f.accessory }))
  const models = useModelStore((state) => state.models)
  const orgs = useOrgStore((state) => state.organizations)

  function updateNewArrival(field: string, entity: Organization | string | null) {
    setNewArrival(prev => ({
      ...prev,
      [field]: entity
    }))
  }

  function submitNewArrival() {
    console.log(newArrival)
    console.log(newAssets)
  }

  function addNewAsset() {
    const newAsset: NewAsset = {
      tempId: crypto.randomUUID(),
      serialNumber: '',
      model: null,
      technicalStatusId: '1',
      meterBlack: '',
      meterColour: '',
      cassettes: '',
      internalFinisher: '',
      coreFunctions: []
    }

    setNewAssets(prev => ([...prev, newAsset]))
  }

  function updateNewAsset(tempId: string, field: keyof NewAsset, value: any) {

    setNewAssets(prev => (
      prev.map(a => {
        if (a.tempId === tempId) {
          return {
            ...a,
            [field]: value
          }
        }
        return a
      })
    ))
  }

  function deleteNewAsset(targetAsset: NewAsset) {
    setNewAssets(prev => prev.filter(a => a.tempId != targetAsset.tempId))
  }

  function getModelDisplay(n: NewAsset) {
    if (!!n.model) {
      return `${n.model.brand_name} ${n.model.model_name}`
    }
    return ''
  }

  return (
    <div className="flex flex-col gap-2 max-w-6xl">
      <h1 className="text-3xl font-bold p-2">
        Create Arrival
      </h1>
      <div className="border rounded-md p-2">
        <form className="flex flex-col gap-2" onSubmit={e => e.preventDefault()}>

          <FieldGroup className="flex flex-row">

            <PopoverSearch
              defaultVal={newArrival.vendor?.name}
              onSelection={o => updateNewArrival('vendor', o)}
              onClear={() => updateNewArrival('vendor', null)}
              allOptions={orgs}
              searchKey='name'
              displayString={o => o.name}
              fieldLabel='Vendor'
              fieldRequired={true}
            />

            <PopoverSearch
              defaultVal={newArrival.transporter?.name}
              onSelection={o => updateNewArrival('transporter', o)}
              onClear={() => updateNewArrival('transporter', null)}
              allOptions={orgs}
              searchKey='name'
              displayString={o => o.name}
              fieldLabel='Transporter'
              fieldRequired={true}
            />

            <DropdownSelectType
              fieldLabel='Warehouse'
              defaultVal='2'
              options={warehouses.filter(w => w.is_active).map(w => ({ id: w.id, val: w.city_code }))}
              onSelection={id => updateNewArrival('warehouseId', id)}
            />

          </FieldGroup>

          <Field>
            <FieldLabel>
              Comments
            </FieldLabel>
            <Textarea
              placeholder="Arrival notes"
              className="resize-none"
            />
          </Field>

          <FieldGroup>
            {newAssets.map(a => (
              <div
                className="flex flex-row gap-2 items-end"
                key={a.tempId}
              >

                <PopoverSearch
                  defaultVal={getModelDisplay(a)}
                  onSelection={m => updateNewAsset(a.tempId, 'model', m)}
                  onClear={() => updateNewAsset(a.tempId, 'model', null)}
                  allOptions={models}
                  searchKey='model_name'
                  displayString={(m: Model) => `${m.brand_name} ${m.model_name}`}
                  fieldLabel='Model'
                  fieldRequired={true}
                >
                </PopoverSearch>

                <InputNumber
                  defaultVal={a.serialNumber ?? ''}
                  onSelection={s => updateNewAsset(a.tempId, 'serialNumber', s)}
                  fieldLabel='Serial Number'
                  className='max-w-64'
                  inputType="text"
                />

                <InputNumber
                  defaultVal={a.cassettes ?? ''}
                  onSelection={c => updateNewAsset(a.tempId, 'cassettes', c)}
                  fieldLabel='Cassettes'
                  className='max-w-24'
                />

                <InputNumber
                  defaultVal={a.meterBlack ?? ''}
                  onSelection={m => updateNewAsset(a.tempId, 'meterBlack', m)}
                  fieldLabel='Meter Black'
                  className='max-w-24'
                />

                <InputNumber
                  defaultVal={a.meterColour ?? ''}
                  onSelection={m => updateNewAsset(a.tempId, 'meterColour', m)}
                  fieldLabel='Meter Colour'
                  className='max-w-24'
                />

                <Field className="max-w-60">
                  <FieldLabel>Core Functions</FieldLabel>
                  <MultipleSelector
                    defaultOptions={coreFunctions}
                    placeholder="Select functions"
                    emptyIndicator={<p>No results found.</p>}
                    className="m-0"
                    onChange={o => updateNewAsset(a.tempId, 'coreFunctions', o.map(i => i.id))}
                  />
                </Field>

                <InputNumber
                  defaultVal={a.internalFinisher ?? ''}
                  onSelection={f => updateNewAsset(a.tempId, 'internalFinisher', f)}
                  fieldLabel='Internal Finisher'
                  className='max-w-64'
                  inputType="text"
                />

                <DropdownSelectType
                  fieldLabel='Testing Status'
                  defaultVal={a.technicalStatusId}
                  options={technicalStatuses.map(s => ({ id: s.id, val: s.status }))}
                  onSelection={id => updateNewAsset(a.tempId, 'technicalStatusId', id)}
                />

                <Button
                  variant="outline"
                  type="button"
                  onClick={() => deleteNewAsset(a)}
                ><TrashIcon /></Button>

              </div>
            ))}
          </FieldGroup>
          <div>
            <Button
              variant="secondary"
              className="rounded-md"
              onClick={addNewAsset}
              type="button"
            >
              <PlusIcon /> Add Asset
            </Button>
          </div>

          <div className="flex gap-4">
            <Button
              className="rounded-md"
              onClick={submitNewArrival}
              type="submit"
            >
              Create Arrival
            </Button>
            <Button variant="outline">Save</Button>
          </div>
        </form>
      </div>
    </div >
  )
}