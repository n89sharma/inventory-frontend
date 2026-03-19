import { isSelected, type SelectOption } from '@/types/select-option-types'
import { CoreFunctionsSchema, StatusSchema, WarehouseSchema, type CoreFunction, type Status, type Warehouse } from "@/data/api/constants-api"
import { ModelSchema, type Model } from "@/data/api/model-api"
import { OrgSchema, type Organization } from "@/data/api/org-api"
import { z } from "zod"

const SelectOptionSchema = <T extends z.ZodTypeAny>(selectedSchema: T) =>
  z.discriminatedUnion('state', [
    z.object({ state: z.literal('SELECTED'), selected: selectedSchema }),
    z.object({ state: z.literal('UNSELECTED') }),
    z.object({ state: z.literal('ANY') }),
  ])

const StatusSelectOptionSchema = SelectOptionSchema(StatusSchema)
const WarehouseSelectOptionSchema = SelectOptionSchema(WarehouseSchema)

export const NewAssetSchema = z.object({
  tempId: z.uuid(),
  model: ModelSchema.nullable().refine(val => !!val, "Model is required"),
  serialNumber: z.string().refine(val => val.length > 0, "Serial number is required"),
  meterBlack: z.number().min(0).nullable().refine(v => !!v, "Black meter is required"),
  meterColour: z.number().min(0).nullable().refine(v => !!v, "Colour meter is required"),
  cassettes: z.number().min(0).nullable().refine(v => !!v, "Cassettes is required"),
  technicalStatus: StatusSelectOptionSchema.refine(val => isSelected(val), "Technical status is required"),
  internalFinisher: z.string(),
  coreFunctions: z.array(CoreFunctionsSchema)
})

export type NewAsset = {
  tempId: string,
  model: Model | null,
  serialNumber: string,
  meterBlack: number | null,
  meterColour: number | null,
  cassettes: number | null,
  technicalStatus: SelectOption<Status>,
  internalFinisher: string,
  coreFunctions: CoreFunction[]
}

export const NewArrivalSchema = z.object({
  vendor: OrgSchema.nullable().refine(val => !!val, "Vendor required"),
  transporter: OrgSchema.nullable().refine(val => !!val, "Transporter required"),
  warehouse: WarehouseSelectOptionSchema.refine(val => isSelected(val), "Warehouse required"),
  comment: z.string(),
  assets: z.array(NewAssetSchema).nonempty("No assets in the arrival")
})

export type NewArrival = {
  vendor: Organization | null,
  transporter: Organization | null,
  warehouse: SelectOption<Warehouse>,
  comment: string
  assets: NewAsset[]
}
