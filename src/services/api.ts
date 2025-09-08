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
    barcode: string,
    serial_number: string,
    asset_location: string,
    asset_type: string,
    tracking_status: string,
    exit_status: string,
    technical_status: string,
    is_held: boolean,
    created_at: string,
    model: {
        name: string,
    },
    warehouse: {
        city_code: string,
        street: string
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
    cost: {
        purchase_cost: number,
        transport_cost: number,
        processing_cost: number,
        other_cost: number,
        parts_cost: number,
        total_cost: number,
        sale_price: number
    }
}

export type AssetDetails = {
    barcode: string,
    serial_number: string,
    location: string,
    asset_type: string,
    tracking_status: string,
    exit_status: string,
    technical_status: string,
    is_held: boolean,
    created_at: Date,
    model: string,
    warehouse_code: string,
    warehouse_street: string,
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
    cost: {
        purchase_cost: string,
        transport_cost: string,
        processing_cost: string,
        other_cost: string,
        parts_cost: string,
        total_cost: string,
        sale_price: string
    }
}

function formatThousandsK(value: number): string {
  if (value < 1000) return value.toString()
  return (value / 1000).toFixed(0) + " K"
}

function formatUSD (value: number) {

    const maxLength = 14
    const currencyValue = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        // currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)

    const padding = " ".repeat(maxLength - currencyValue.length)
    console.log(padding.length)
    console.log(currencyValue)
    return padding + currencyValue
}
   

function mapAssetDetail(res: AssetDetailResponse): AssetDetails {
    const rspec = res.technical_specification
    const rcost = res.cost
    return {
        barcode: res.barcode,
        serial_number: res.serial_number,
        location: res.asset_location,
        asset_type: res.asset_type,
        tracking_status: res.tracking_status,
        exit_status: res.exit_status,
        technical_status: res.technical_status,
        is_held: res.is_held,
        created_at: new Date(res.created_at),
        model: res.model.name,
        warehouse_code: res.warehouse.city_code,
        warehouse_street: res.warehouse.street,
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
        cost: {
            purchase_cost: formatUSD(rcost.purchase_cost),
            transport_cost: formatUSD(rcost.transport_cost),
            processing_cost: formatUSD(rcost.processing_cost),
            other_cost: formatUSD(rcost.other_cost),
            parts_cost: formatUSD(rcost.parts_cost),
            total_cost: formatUSD(rcost.total_cost),
            sale_price: formatUSD(rcost.sale_price)
        }
    }
}

export async function getAssetDetail(params: { barcode: string }): Promise<AssetDetails> {
    const res = await api.get<AssetDetailResponse>(`/assets/${params.barcode}`)
    return mapAssetDetail(res.data)
}