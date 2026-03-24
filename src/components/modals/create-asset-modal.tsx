import { useConstantsStore } from '@/data/store/constants-store'
import { useModelStore } from '@/data/store/model-store'
import { AssetFormSchema, type ArrivalForm, type AssetForm } from '@/types/arrival-types'
import type { Model } from '@/types/model-types'
import type { CoreFunction } from '@/types/reference-data-types'
import { UNSELECTED } from '@/types/select-option-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, type UseFieldArrayAppend } from 'react-hook-form'
import { ControlledInputWithClear } from '../custom/controlled-input-with-clear'
import { ControlledPopoverSearch } from '../custom/controlled-popover-search'
import { SelectOptions } from '../custom/select-options'
import { Button } from '../shadcn/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../shadcn/dialog'
import { Field, FieldGroup, FieldLabel } from '../shadcn/field'
import MultipleSelector from '../shadcn/multiple-selector'

interface CreateAssetModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  addNewAsset: UseFieldArrayAppend<ArrivalForm, 'assets'>
}

export function CreateAssetModal({ open, onOpenChange, addNewAsset }: CreateAssetModalProps): React.JSX.Element {
  const newAssetForm = useForm<AssetForm>({
    resolver: zodResolver(AssetFormSchema),
    defaultValues: getDefaultNewAsset()
  })
  const tempId = newAssetForm.watch('tempId')
  const technicalStatuses = useConstantsStore(state => state.technicalStatuses)
  const coreFunctions = useConstantsStore(state => state.coreFunctions)
  const models = useModelStore(state => state.models)

  function getCoreFunctionOptions(cfs: CoreFunction[]) {
    return cfs.map(f => ({ id: f.id, label: f.accessory, value: f.accessory }))
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

  function clearNewAsset() {
    newAssetForm.reset(getDefaultNewAsset())
  }

  function onValidNewAsset(newAsset: AssetForm) {
    addNewAsset(newAsset)
    newAssetForm.reset(getDefaultNewAsset())
    onOpenChange(false)
  }

  function submitNewAsset() {
    newAssetForm.handleSubmit(onValidNewAsset)()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-2xl overflow-y-auto max-h-[90vh]'>
        <DialogHeader>
          <DialogTitle>Create Asset</DialogTitle>
        </DialogHeader>
        <form onSubmit={e => e.preventDefault()}>
          <FieldGroup className='grid grid-cols-2 gap-x-6 gap-y-3' key={tempId}>

            <ControlledPopoverSearch
              control={newAssetForm.control}
              name='model'
              options={models}
              searchKey='model_name'
              getLabel={(m: Model) => `${m.brand_name} ${m.model_name}`}
              fieldLabel='Model'
              fieldRequired={true}
            />

            <ControlledInputWithClear
              control={newAssetForm.control}
              name='serialNumber'
              fieldLabel='Serial Number'
              fieldRequired={true}
              inputType='string'
            />

            <ControlledInputWithClear
              control={newAssetForm.control}
              name='meterBlack'
              fieldLabel='Meter Black'
              fieldRequired={true}
              inputType='number'
            />

            <ControlledInputWithClear
              control={newAssetForm.control}
              name='meterColour'
              fieldLabel='Meter Colour'
              fieldRequired={true}
              inputType='number'
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
                />
              )}
            />

            <ControlledInputWithClear
              control={newAssetForm.control}
              name='cassettes'
              fieldLabel='Cassettes'
              fieldRequired={true}
              inputType='number'
            />

            <ControlledInputWithClear
              control={newAssetForm.control}
              name='internalFinisher'
              fieldLabel='Internal Finisher'
              inputType='string'
            />

            <Field>
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
        </form>
        <DialogFooter>
          <Button variant='secondary' onClick={submitNewAsset} type='button'>
            Save Asset
          </Button>
          <Button variant='outline' onClick={clearNewAsset} type='button'>
            Clear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
