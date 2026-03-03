import { useState } from "react";
import { DropdownSelectType } from "../custom/dropdown-select-type";
import { Button } from "../shadcn/button";
import { FieldGroup, Field, FieldLabel } from "../shadcn/field";
import { Textarea } from "../shadcn/textarea";
import { useConstantsStore } from "@/data/store/constants-store";
import { PopoverSearch } from "../custom/popover-search";
import { useOrgStore } from "@/data/store/org-store";
import type { Organization } from "@/data/api/org-api";

type NewArrivalState = {
  vendor: Organization | null,
  transporter: Organization | null,
  warehouseId: string | null
}

export function ArrivalCreatePage(): React.JSX.Element {
  const [newArrival, setNewArrival] = useState<NewArrivalState>({
    vendor: null,
    transporter: null,
    warehouseId: '2'
  })
  const warehouses = useConstantsStore((state) => state.warehouses)
  const orgs = useOrgStore((state) => state.organizations)

  function handleSelection(field: string, entity: Organization | string | null) {
    setNewArrival(prev => ({
      ...prev,
      [field]: entity
    }))
  }

  function submitNewArrival() {
    console.log(newArrival)
    return
  }

  return (
    <div className="flex flex-col gap-2 max-w-4xl">
      <h1 className="text-3xl font-bold p-2">
        Create Arrival
      </h1>
      <div className="border rounded-md p-2">
        <form className="flex flex-col gap-2" onSubmit={e => e.preventDefault()}>

          <FieldGroup className="flex flex-row">

            <PopoverSearch
              defaultVal={newArrival.vendor?.name}
              onSelection={o => handleSelection('vendor', o)}
              onClear={() => handleSelection('vendor', null)}
              allOptions={orgs}
              searchKey='name'
              displayString={o => o.name}
              fieldLabel='Vendor'
              fieldRequired={true}
            />

            <PopoverSearch
              defaultVal={newArrival.transporter?.name}
              onSelection={o => handleSelection('transporter', o)}
              onClear={() => handleSelection('transporter', null)}
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
              onSelection={(id) => handleSelection('warehouseId', id)}
            />

          </FieldGroup>
          <Field>
            <FieldLabel htmlFor="checkout-7j9-optional-comments">
              Comments
            </FieldLabel>
            <Textarea
              placeholder="Arrival notes"
              className="resize-none"
            />
          </Field>

          <div className="flex gap-4">
            <Button
              className="rounded-md"
              onClick={submitNewArrival}
              type="submit"
            >
              Add Assets
            </Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  )
}