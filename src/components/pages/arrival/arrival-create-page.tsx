import { createArrival, updateArrival } from '@/data/api/arrival-api'
import { useConstantsStore } from '@/data/store/constants-store'
import { useOrgStore } from '@/data/store/org-store'
import { ArrivalFormSchema, type ArrivalForm } from '@/types/arrival-types'
import { UNSELECTED } from '@/types/select-option-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useFieldArray, useForm, type FieldErrors } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from "sonner"
import { PageBreadcrumb } from '../../custom/page-breadcrumb'
import { ControlledPopoverSearch } from '../../custom/controlled-popover-search'
import { SelectOptions } from '../../custom/select-options'
import { Button } from '../../shadcn/button'
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '../../shadcn/field'
import { Textarea } from '../../shadcn/textarea'
import { ArrivalAssetCreateSection } from './arrival-asset-create-section'

interface ArrivalCreatePageProps {
  defaultValues?: ArrivalForm
  arrivalId?: string
}

export function ArrivalCreatePage({ defaultValues, arrivalId }: ArrivalCreatePageProps = {}): React.JSX.Element {
  const navigate = useNavigate()
  const isEditMode = !!arrivalId
  const newArrivalForm = useForm<ArrivalForm>({
    resolver: zodResolver(ArrivalFormSchema),
    defaultValues: defaultValues ?? getDefaultArrival()
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

  async function onValidArrival(newArrival: ArrivalForm) {
    if (isEditMode) {
      const apiResponse = await updateArrival(arrivalId, newArrival)
      if (apiResponse.success) {
        toast.success(`Arrival ${arrivalId} updated!`, { position: "top-center" })
        navigate(`/arrivals/${arrivalId}`)
      }
    } else {
      const apiResponse = await createArrival(newArrival)
      console.log(newArrival)
      if (apiResponse.success) {
        toast.success(`Arrival ${apiResponse.data.arrivalNumber} created!`, { position: "top-center" })
      }
    }
  }

  function onInvalidArrival(errors: FieldErrors<ArrivalForm>) {
    console.log(errors)
  }

  function getBreadcrumbSegments() {
    if (isEditMode) {
      return [
        { label: 'Arrivals', href: '/arrivals' },
        { label: arrivalId!, href: `/arrivals/${arrivalId}` },
        { label: 'Edit' },
      ]
    }
    return [
      { label: 'Arrivals', href: '/arrivals' },
      { label: 'Create' },
    ]
  }

  useEffect(() => {
    if (!isEditMode && newArrivalForm.formState.isSubmitSuccessful) {
      newArrivalForm.reset(getDefaultArrival())
    }
  }, [newArrivalForm.formState.isSubmitSuccessful])

  return (
    <div className='flex flex-col gap-2 max-w-6xl'>
      <PageBreadcrumb segments={getBreadcrumbSegments()} />
      <h1 className='text-3xl font-bold p-2'>
        {isEditMode ? `Edit Arrival ${arrivalId}` : 'Create Arrival'}
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
            {isEditMode ? 'Save Changes' : 'Create Arrival'}
          </Button>
          <Button
            variant='outline'
            type='button'
            onClick={() => navigate(isEditMode ? `/arrivals/${arrivalId}` : '/arrivals')}
          >
            Cancel
          </Button>
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