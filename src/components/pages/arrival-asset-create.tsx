import { useConstantsStore } from "@/data/store/constants-store";
import { useModelStore } from '@/data/store/model-store';
import type { NewArrival, NewAsset } from '@/lib/arrival-validator';
import { NewAssetSchema } from '@/lib/arrival-validator';
import type { Model } from '@/types/model-types';
import type { CoreFunction } from '@/types/reference-data-types';
import { UNSELECTED } from '@/types/select-option-types';
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@phosphor-icons/react";
import { Controller, useForm, type FieldArrayWithId, type UseFieldArrayAppend, type UseFieldArrayRemove } from 'react-hook-form';
import { ControlledInputWithClear } from "../custom/controlled-input-with-clear";
import { ControlledPopoverSearch } from "../custom/controlled-popover-search";
import { SelectOptions } from "../custom/select-options";
import { Button } from "../shadcn/button";
import { DataTable } from "../shadcn/data-table";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "../shadcn/field";
import MultipleSelector from "../shadcn/multiple-selector";
import { getNewAssetTableColumns } from "./column-defs/new-assets-columns";

interface ArrivalAssetCreateSectionProps {
  newAssets: FieldArrayWithId<NewArrival, "assets", "id">[],
  addNewAsset: UseFieldArrayAppend<NewArrival, "assets">
  deleteNewAsset: UseFieldArrayRemove
}

export function ArrivalAssetCreateSection({
  newAssets,
  addNewAsset,
  deleteNewAsset
}: ArrivalAssetCreateSectionProps): React.JSX.Element {

  const newAssetForm = useForm<NewAsset>({
    resolver: zodResolver(NewAssetSchema),
    defaultValues: getDefaultNewAsset()
  })
  const tempId = newAssetForm.watch('tempId')
  const technicalStatuses = useConstantsStore((state) => state.technicalStatuses)
  const coreFunctions = useConstantsStore((state) => state.coreFunctions)
  const getCoreFunctionOptions = (cfs: CoreFunction[]) => cfs.map(f => ({ id: f.id, label: f.accessory, value: f.accessory }))
  const models = useModelStore((state) => state.models)

  function clearNewAsset() {
    newAssetForm.reset(getDefaultNewAsset())
  }

  async function submitNewAsset() {
    newAssetForm.handleSubmit(onValidNewAsset)()
  }

  function onValidNewAsset(newAsset: NewAsset) {
    addNewAsset(newAsset)
    clearNewAsset()
  }

  function getDefaultNewAsset() {
    return {
      tempId: crypto.randomUUID(),
      serialNumber: '',
      model: null,
      technicalStatus: UNSELECTED,
      meterBlack: null,
      meterColour: null,
      cassettes: null,
      internalFinisher: '',
      coreFunctions: []
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <form onSubmit={e => e.preventDefault()} className='border rounded-md p-2 flex flex-col gap-2'>
        <FieldSet>
          <FieldLegend>Asset Information</FieldLegend>
          <FieldGroup
            className='grid grid-cols-3 gap-x-6 gap-y-3 max-w-4xl'
            key={tempId}
          >

            <ControlledPopoverSearch
              control={newAssetForm.control}
              name='model'
              options={models}
              searchKey='model_name'
              getLabel={(m: Model) => `${m.brand_name} ${m.model_name}`}
              fieldLabel='Model'
              fieldRequired={true}
              className='max-w-60'
            />

            <ControlledInputWithClear
              control={newAssetForm.control}
              name='serialNumber'
              fieldLabel='Serial Number'
              fieldRequired={true}
              inputType='string'
              className='max-w-60'
            />

            <Controller
              control={newAssetForm.control}
              name='technicalStatus'
              render={({ field: { onChange, value: technicalStatus }, fieldState }) => (
                <SelectOptions
                  selection={technicalStatus}
                  onSelectionChange={onChange}
                  options={technicalStatuses}
                  getLabel={t => t.status}
                  fieldLabel='Testing Status'
                  fieldRequired={true}
                  error={fieldState.invalid}
                  className='max-w-60'
                />
              )}
            />

            <ControlledInputWithClear
              control={newAssetForm.control}
              name='meterBlack'
              fieldLabel='Meter Black'
              fieldRequired={true}
              inputType='number'
              className='max-w-60'
            />

            <ControlledInputWithClear
              control={newAssetForm.control}
              name='meterColour'
              fieldLabel='Meter Colour'
              fieldRequired={true}
              inputType='number'
              className='max-w-60'
            />

            <ControlledInputWithClear
              control={newAssetForm.control}
              name='cassettes'
              fieldLabel='Cassettes'
              fieldRequired={true}
              inputType='number'
              className='max-w-60'
            />

            <ControlledInputWithClear
              control={newAssetForm.control}
              name='internalFinisher'
              fieldLabel='Internal Finisher'
              inputType='string'
              className='max-w-60'
            />

            <Field className='max-w-60'>
              <FieldLabel>Core Functions</FieldLabel>
              <Controller
                name='coreFunctions'
                control={newAssetForm.control}
                render={({ field: { onChange, value } }) => (
                  <MultipleSelector
                    options={getCoreFunctionOptions(coreFunctions)}
                    placeholder='Select functions'
                    emptyIndicator={<p>No results found.</p>}
                    value={getCoreFunctionOptions(value)}
                    onChange={options => onChange(coreFunctions.filter(c => options.map(o => o.id).includes(c.id)))}
                  />
                )}
              />
            </Field>

          </FieldGroup>
        </FieldSet>

        <div className='flex items-start gap-4'>
          <Button
            variant='secondary'
            className='rounded-md'
            onClick={submitNewAsset}
            type='button'
          >
            <PlusIcon /> Add Asset
          </Button>
          <Button
            variant='outline'
            className='rounded-md'
            onClick={clearNewAsset}
            type='button'
          >
            Clear
          </Button>
        </div>
      </form>

      <DataTable columns={getNewAssetTableColumns({ onDelete: (id) => deleteNewAsset(id) })} data={newAssets}></DataTable>
    </div>
  )
}