import { CoreFunctionsSchema, StatusSchema, WarehouseSchema, type CoreFunction, type Status, type Warehouse } from "@/data/api/constants-api"
import { ModelSchema, type Model } from "@/data/api/model-api"
import { OrgSchema, type Organization } from "@/data/api/org-api"
import { z } from "zod"

export const NewAssetSchema = z.object({
  tempId: z.uuid(),
  model: ModelSchema.nullable().refine(val => !!val, "Model is required"),
  serialNumber: z.string().min(1, "Serial number is required"),
  meterBlack: z.string().min(1, "Meter must be positive"),
  meterColour: z.string().min(1, "Meter must be positive"),
  cassettes: z.string().min(1, "Cassettes are required"),
  technicalStatus: StatusSchema.nullable().refine(val => !!val, "Technical status is required"),
  internalFinisher: z.string(),
  coreFunctions: z.array(CoreFunctionsSchema)
})

export type NewAsset = {
  tempId: string,
  model: Model | null,
  serialNumber: string,
  meterBlack: string,
  meterColour: string,
  cassettes: string,
  technicalStatus: Status | null,
  internalFinisher: string,
  coreFunctions: CoreFunction[]
}

export const NewArrivalSchema = z.object({
  vendor: OrgSchema.nullable().refine(val => !!val, "Vendor required"),
  transporter: OrgSchema.nullable().refine(val => !!val, "Transporter required"),
  warehouse: WarehouseSchema.nullable().refine(val => !!val, "Warehouse required"),
  comment: z.string(),
  assets: z.array(NewAssetSchema).nonempty("No assets in the arrival")
})

export type NewArrival = {
  vendor: Organization | null,
  transporter: Organization | null,
  warehouse: Warehouse | null,
  comment: string
  assets: NewAsset[]
}
