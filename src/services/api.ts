import axios from "axios"

const apiUrl = import.meta.env.VITE_INVENTORY_API_URL
export const api = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
})

export interface AssetDetailResponse {
    model: {
        name: string,
        brand: {
            name: string
        }
    },
    barcode: string,
    serial_number: string,
    asset_type: string,
    tracking_status: string,
    availability_status: string,
    technical_status: string,
    location: {
        warehouse: {
            city_code: string,
            street: string
        },
        location: string
    },
    cost: {
        purchase_cost: number,
        transport_cost: number,
        processing_cost: number,
        other_cost: number,
        parts_cost: number,
        total_cost: number,
        sale_price: number
    },
    technical_specification: {
        cassettes: number,
        internal_finisher: string,
        meter_black: number,
        meter_colour: number,
        meter_total: number,
        drum_life_c: number,
        drum_life_m: number,
        drum_life_y: number,
        drum_life_k: number
    },
    hold:{
        created_by: {
            email: string,
            name: string
        },
        created_for: {
            email: string,
            name: string
        },
        created_at: string,
        customer: {
            name: string
        },
        from_dt: string,
        to_dt: string,
        notes: string,
        hold_number: string
    },
    created_at: string,
    is_held: boolean
}

export type AssetDetails = {
    model: string,
    brand: string,
    barcode: string,
    serial_number: string,
    asset_type: string,
    tracking_status: string,
    availability_status: string,
    technical_status: string,
    location: string,
    warehouse_code: string,
    warehouse_street: string,
    cost: {
        purchase_cost: string,
        transport_cost: string,
        processing_cost: string,
        other_cost: string,
        parts_cost: string,
        total_cost: string,
        sale_price: string
    }
    specs: {
        cassettes: number,
        internal_finisher: string,
        meter_black: string,
        meter_colour: string,
        meter_total: string,
        drum_life_c: number,
        drum_life_m: number,
        drum_life_y: number,
        drum_life_k: number
    },
    hold:{
        created_by: string,
        created_for: string,
        created_at: Date | null,
        customer: string,
        from_dt: string,
        to_dt: string,
        notes: string,
        hold_number: string
    }
    created_at: Date,
    is_held: boolean,
}

function formatThousandsK(value: number): string {
  if (value < 1000) return value.toString()
  return (value / 1000).toFixed(0) + " K"
}

function formatUSD (value: number) {
    const currencyValue = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)
    return currencyValue
}
   

function mapAssetDetail(r: AssetDetailResponse): AssetDetails {
    const rspec = r.technical_specification
    const rcost = r.cost
    return {
        model: r.model.name,
        brand: r.model.brand.name,
        barcode: r.barcode,
        serial_number: r.serial_number,
        asset_type: r.asset_type,
        tracking_status: r.tracking_status,
        availability_status: r.availability_status,
        technical_status: r.technical_status,
        location: r.location?.location,
        warehouse_code: r.location?.warehouse.city_code,
        warehouse_street: r.location?.warehouse.street,
        cost: {
            purchase_cost: formatUSD(rcost.purchase_cost),
            transport_cost: formatUSD(rcost.transport_cost),
            processing_cost: formatUSD(rcost.processing_cost),
            other_cost: formatUSD(rcost.other_cost),
            parts_cost: formatUSD(rcost.parts_cost),
            total_cost: formatUSD(rcost.total_cost),
            sale_price: formatUSD(rcost.sale_price)
        },
        specs: {
            cassettes: rspec.cassettes,
            internal_finisher: rspec.internal_finisher,
            meter_black: formatThousandsK(rspec.meter_black),
            meter_colour: formatThousandsK(rspec.meter_colour),
            meter_total: formatThousandsK(rspec.meter_total),
            drum_life_c: rspec.drum_life_c,
            drum_life_m: rspec.drum_life_m,
            drum_life_y: rspec.drum_life_y,
            drum_life_k: rspec.drum_life_k,
        },
        hold: {
            created_by: r.hold?.created_by?.name,
            created_for: r.hold?.created_for?.name,
            created_at: r.hold?.created_at ? new Date(r.hold.created_at) : null,
            customer: r.hold?.customer?.name,
            from_dt: r.hold?.from_dt,
            to_dt: r.hold?.to_dt,
            notes: r.hold?.notes,
            hold_number: r.hold?.hold_number
        },
        created_at: new Date(r.created_at),
        is_held: r.is_held

    }
}

export async function getAssetDetail(params: { barcode: string }): Promise<AssetDetails> {
    const res = await api.get<AssetDetailResponse>(`/assets/${params.barcode}`)
    return mapAssetDetail(res.data)
}