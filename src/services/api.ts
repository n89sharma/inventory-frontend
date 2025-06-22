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

export interface AssetDetailRequestParams {
    barcode: string
}

export async function getAssetDetail(params: AssetDetailRequestParams): Promise<AssetDetailResponse> {
    const res = await api.get<AssetDetailResponse>(`/assets/${params.barcode}`)
    return res.data
}