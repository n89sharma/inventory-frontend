import { createArrival, updateArrival } from '@/data/api/arrival-api'
import { useConstantsStore } from '@/data/store/constants-store'
import { useOrgStore } from '@/data/store/org-store'
import { flattenFieldErrors } from '@/lib/utils'
import { ArrivalFormSchema, type ArrivalForm } from '@/types/arrival-types'
import { UNSELECTED } from '@/types/select-option-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleNotchIcon, PlusIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { Controller, useFieldArray, useForm, type FieldErrors } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ControlledPopoverSearch } from '../../custom/controlled-popover-search'
import { PageBreadcrumb } from '../../custom/page-breadcrumb'
import { SelectOptions } from '../../custom/select-options'
import { AssetModal } from '../../modals/create-asset-modal'
import { Button } from '../../shadcn/button'
import { DataTable } from '../../shadcn/data-table'
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '../../shadcn/field'
import { Textarea } from '../../shadcn/textarea'
import { getNewAssetTableColumns } from '../column-defs/new-assets-columns'

interface CreateArrivalPageProps {
  defaultValues?: ArrivalForm
  arrivalId?: string
}

export function CreateArrivalPage({ defaultValues, arrivalId }: CreateArrivalPageProps = {}): React.JSX.Element {
  const navigate = useNavigate()
  const isEditMode = !!arrivalId
  const newArrivalForm = useForm<ArrivalForm>({
    resolver: zodResolver(ArrivalFormSchema),
    defaultValues: defaultValues ?? getDefaultArrival()
  })
  const warehouses = useConstantsStore((state) => state.warehouses)
  const activeWarehouses = warehouses.filter(w => w.is_active)
  const orgs = useOrgStore((state) => state.organizations)
  const { fields: newAssets, append: addNewAsset, remove: deleteNewAsset, update: updateAsset } = useFieldArray({ control: newArrivalForm.control, name: 'assets' })
  const { isSubmitting } = newArrivalForm.formState
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false)
  const [editingAssetIndex, setEditingAssetIndex] = useState<number | null>(null)
  const editingAsset = editingAssetIndex !== null ? newArrivalForm.getValues('assets')[editingAssetIndex] : null

  const pageConfig = {
    pageHeading: isEditMode ? `Edit Arrival ${arrivalId}` : 'Create Arrival',
    saveButtonText: isEditMode ? 'Save Changes' : 'Create Arrival',
    submittingText: isEditMode ? 'Saving...' : 'Creating...',
    cancelNavUrl: isEditMode ? `/arrivals/${arrivalId}` : '/arrivals',
  }

  function getDefaultArrival() {
    return {
      vendor: null,
      transporter: null,
      warehouse: UNSELECTED,
      assets: [],
      comment: ''
    }
  }

  function getSubmitButtonContent() {
    if (isSubmitting) {
      return <><CircleNotchIcon className='animate-spin mr-1' size={16} />{pageConfig.submittingText}</>
    }
    return pageConfig.saveButtonText
  }

  function submitNewArrival() {
    newArrivalForm.handleSubmit(
      onValidArrival,
      onInvalidArrival)()
  }

  async function onValidArrival(newArrival: ArrivalForm) {
    try {
      if (isEditMode) {
        const res = await updateArrival(arrivalId, newArrival)
        if (res.success) {
          navigate(`/arrivals/${arrivalId}`, {
            state: { successMessage: `Arrival ${arrivalId} updated!` }
          })
        }
      } else {
        const res = await createArrival(newArrival)
        if (res.success) {
          navigate(`/arrivals/${res.data.arrivalNumber}`, {
            state: { successMessage: `Arrival ${res.data.arrivalNumber} created!` }
          })
        }
      }
    } catch {
      toast.error('Something went wrong on the server.', { position: 'top-center' })
    }
  }

  function onInvalidArrival(errors: FieldErrors<ArrivalForm>) {
    toast.error(`Form has errors: ${flattenFieldErrors(errors, ['id', 'tempId'])}`, { position: 'top-center' })
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

  return (
    <div className='flex flex-col gap-2 max-w-6xl'>
      <PageBreadcrumb segments={getBreadcrumbSegments()} />
      <h1 className='text-3xl font-bold p-2'>{pageConfig.pageHeading}</h1>
      <form onSubmit={e => e.preventDefault()} className='border rounded-md p-2 flex flex-col gap-2'>
        <fieldset disabled={isSubmitting} className='contents'>
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

          <Button
            variant='secondary'
            type='button'
            onClick={() => { setEditingAssetIndex(null); setIsAssetModalOpen(true) }}
            className='w-fit'
          >
            <PlusIcon /> Add Asset
          </Button>

          <div className='flex gap-4'>
            <Button
              className='rounded-md'
              onClick={submitNewArrival}
              type='submit'
            >
              {getSubmitButtonContent()}
            </Button>
            <Button
              variant='outline'
              type='button'
              disabled={isSubmitting}
              onClick={() => navigate(pageConfig.cancelNavUrl)}
            >
              Cancel
            </Button>
          </div>
        </fieldset>
      </form>
      <AssetModal
        open={isAssetModalOpen}
        onOpenChange={setIsAssetModalOpen}
        addNewAsset={addNewAsset}
        updateAsset={updateAsset}
        editingAsset={editingAsset}
        editingIndex={editingAssetIndex}
      />

      <DataTable
        columns={getNewAssetTableColumns({
          onDelete: id => deleteNewAsset(id),
          onEdit: index => { setEditingAssetIndex(index); setIsAssetModalOpen(true) }
        })}
        data={newAssets}
      />

    </div>
  )
}
