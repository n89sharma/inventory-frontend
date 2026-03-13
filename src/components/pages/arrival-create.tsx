import { SelectOptions } from '../custom/select-options'
import { UNSELECTED } from '@/types/select-option-types'
import { Button } from '../shadcn/button'
import { FieldGroup, Field, FieldLabel, FieldLegend, FieldSet, FieldError } from '../shadcn/field'
import { Textarea } from '../shadcn/textarea'
import { useConstantsStore } from '@/data/store/constants-store'
import { useOrgStore } from '@/data/store/org-store'
import { Controller, useFieldArray, useForm, type FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewArrivalSchema } from '@/lib/arrival-validator'
import type { NewArrival } from '@/lib/arrival-validator'
import { ControlledPopoverSearch } from '../custom/controlled-popover-search'
import { ArrivalAssetCreateSection } from './arrival-asset-create'
import { createArrival } from '@/data/api/arrival-api'
import { toast } from "sonner"

export function ArrivalCreatePage(): React.JSX.Element {
  const newArrivalForm = useForm<NewArrival>({
    resolver: zodResolver(NewArrivalSchema),
    defaultValues: getDefaultArrival()
  })
  const warehouses = useConstantsStore((state) => state.warehouses)
  const activeWarehouses = warehouses.filter(w => w.is_active)
  const orgs = useOrgStore((state) => state.organizations)
  const { fields: newAssets, append: addNewAsset, remove: deleteNewAsset } = useFieldArray({ control: newArrivalForm.control, name: "assets" })

  function getDefaultArrival() {
    return {
      vendor: null,
      transporter: null,
      warehouse: UNSELECTED,
      assets: [],
      comment: ''
    }
  }

  function submitNewArrival() {
    newArrivalForm.handleSubmit(
      onValidArrival,
      onInvalidArrival)()
  }

  async function onValidArrival(newArrival: NewArrival) {
    const apiResponse = await createArrival(newArrival)
    if (apiResponse.success) {
      newArrivalForm.reset(getDefaultArrival())
      toast.success(`Arrival ${apiResponse.data.arrivalNumber} created!`, { position: "top-center" })
    }
  }

  function onInvalidArrival(errors: FieldErrors<NewArrival>) {
    console.log(errors)
  }

  return (
    <div className='flex flex-col gap-2 max-w-6xl'>
      <h1 className='text-3xl font-bold p-2'>
        Create Arrival
      </h1>
      <form onSubmit={e => e.preventDefault()} className='border rounded-md p-2 flex flex-col gap-2'>
        <FieldSet>
          <FieldLegend>General Arrival Information</FieldLegend>
          <FieldGroup className='grid grid-cols-3 gap-x-6 gap-y-3 max-w-4xl'>

            <ControlledPopoverSearch
              control={newArrivalForm.control}
              name='vendor'
              options={orgs}
              searchKey='name'
              getLabel={o => o.name}
              fieldLabel='Vendor'
              fieldRequired={true}
              className='max-w-60'
            />

            <ControlledPopoverSearch
              control={newArrivalForm.control}
              name='transporter'
              options={orgs}
              searchKey='name'
              getLabel={o => o.name}
              fieldLabel='Transporter'
              fieldRequired={true}
              className='max-w-60'
            />

            <Controller
              control={newArrivalForm.control}
              name='warehouse'
              render={({ field: { onChange, value: warehouse }, fieldState }) => (
                <SelectOptions
                  selection={warehouse}
                  onSelectionChange={onChange}
                  options={activeWarehouses}
                  getLabel={w => w.city_code}
                  fieldLabel='Warehouse'
                  anyAllowed={false}
                  fieldRequired={true}
                  error={fieldState.invalid}
                  className='max-w-60'
                />
              )}
            />
          </FieldGroup>

          <Controller
            control={newArrivalForm.control}
            name='comment'
            render={({ field }) => (
              <Field className='max-w-xl'>
                <FieldLabel>
                  Comments
                </FieldLabel>
                <Textarea
                  placeholder='Arrival notes'
                  className='resize-none'
                  {...field}
                />
              </Field>
            )}
          />

          <Controller
            control={newArrivalForm.control}
            name='assets'
            render={({ fieldState }) => (
              <div>
                {
                  fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )
                }
              </div>
            )}
          />
        </FieldSet>

        <div className='flex gap-4'>
          <Button
            className='rounded-md'
            onClick={submitNewArrival}
            type='submit'
          >
            Create Arrival
          </Button>
          <Button variant='outline'>Save</Button>
        </div>

      </form>
      <ArrivalAssetCreateSection
        newAssets={newAssets}
        addNewAsset={addNewAsset}
        deleteNewAsset={deleteNewAsset}
      />

    </div >
  )
}