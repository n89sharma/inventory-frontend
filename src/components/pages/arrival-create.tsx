import { useState } from "react";
import { DropdownSelectType } from "../custom/dropdown-select-type";
import { Button } from "../shadcn/button";
import { FieldGroup, Field, FieldLabel } from "../shadcn/field";
import { Textarea } from "../shadcn/textarea";
import { useConstantsStore } from "@/data/store/constants-store";
import { PopoverSearch } from "../custom/popover-search";

export function ArrivalCreatePage(): React.JSX.Element {
  const [arrival, setArrival] = useState({
    warehouseId: null
  })
  const warehouses = useConstantsStore((state) => state.warehouses)

  function handleSelection(field: string, value: string | number | null) {
    setArrival(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold p-2">
        Create Arrival
      </h1>
      <div className="border rounded-md p-2">
        <form className="flex flex-col gap-2 max-w-xl">

          <FieldGroup>

            <PopoverSearch
              defaultVal={null}
              onSelection={() => { }}
              onClear={() => { }}
              allOptions={[]}
              searchKey='vendor'
              displayString={() => ''}
              fieldLabel='Vendor'
              fieldRequired={true}
            />

            <PopoverSearch
              defaultVal={null}
              onSelection={() => { }}
              onClear={() => { }}
              allOptions={[]}
              searchKey='transporter'
              displayString={() => ''}
              fieldLabel='Transporter'
              fieldRequired={true}
            />

            <DropdownSelectType
              fieldLabel='Warehouse'
              defaultVal={'2'}
              options={warehouses.filter(w => w.is_active).map(w => ({ id: w.id, val: w.city_code }))}
              onSelection={(id) => handleSelection('warehouseId', id)}
            />

            <Field>
              <FieldLabel htmlFor="checkout-7j9-optional-comments">
                Comments
              </FieldLabel>
              <Textarea
                placeholder="Arrival notes"
                className="resize-none"
              />
            </Field>

          </FieldGroup>

          <div className="flex gap-4">
            <Button>Add Assets</Button>
            <Button variant="secondary">Save</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  )
}