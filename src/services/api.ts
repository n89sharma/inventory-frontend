import axios from "axios"
import { format } from 'date-fns'

const apiUrl = import.meta.env.VITE_INVENTORY_API_URL
export const api = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
})

interface AssetDetailResponse {
    barcode: string,
    serial_number: string,
    model: string,
    brand: string
    asset_type: string,
    tracking_status: string,
    availability_status: string,
    technical_status: string,
    location_city_code: string,
    location_street: string,
    location: string,
    created_at: string,
    is_held: boolean,
    purchase_cost: number,
    transport_cost: number,
    processing_cost: number,
    other_cost: number,
    parts_cost: number,
    total_cost: number,
    sale_price: number
    ts_cassettes: number,
    internal_finisher: string,
    meter_black: string,
    meter_colour: string,
    drum_life_c: number,
    drum_life_m: number,
    drum_life_y: number,
    drum_life_k: number,
    hold_by_email: string,
    hold_by_name: string,
    hold_for_email: string,
    hold_for_name: string,
    hold_created_at: string,
    hold_customer: string,
    hold_from: string,
    hold_to: string,
    hold_notes: string,
    hold_number: string,
    arrival_number: string,
    arrival_origin: string,
    arrival_destination_city_code: string,
    arrival_destination_street: string,
    arrival_transporter: string,
    arrival_created_by_email: string,
    arrival_created_by_name: string,
    arrival_notes: string,
    arrival_created_at: string,
    departure_number: string,
    departure_origin_city_code: string,
    departure_origin_street: string,
    departure_destination: string,
    departure_transporter: string,
    departure_created_by_email: string,
    departure_created_by_name: string,
    departure_notes: string,
    departure_created_at: string,
    purchase_invoice_number: string,
    purchase_invoice_is_cleared: boolean
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
    hold: {
        created_by: string,
        created_for: string,
        created_at: string | null,
        customer: string,
        from_dt: string,
        to_dt: string,
        notes: string,
        hold_number: string
    }
    created_at: string,
    is_held: boolean,
    arrival: {
        arrival_number: string,
        origin: string,
        destination_code: string,
        destination_street: string,
        transporter: string,
        created_by: string,
        notes: string,
        created_at: string
    },
    departure: {
        departure_number: string,
        origin_code: string,
        origin_street: string,
        destination: string,
        transporter: string,
        created_by: string,
        notes: string,
        created_at: string
    }
    purchase_invoice: {
        invoice_number: string,
        is_cleared: boolean
    }
}

export interface Error {
    code: string,
    description: string,
    category: string,
    is_fixed: boolean,
    added_at: string,
    added_by: string,
    fixed_at: string,
    fixed_by: string
}

interface CommentResponse {
    comment: string,
    username: string,
    created_at: string,
    updated_at: string
}

export type Comment = {
    comment: string,
    username: string,
    created_at: string,
    updated_at: string,
    initials: string
}

export type Transfer = {
    created_at: string,
    source_code: string,
    source_stree: string,
    destination_code: string,
    destination_street: string,
    transfer_number: string,
    transporter: string
}

interface PartResponse {
    recipient: string,
    donor: string,
    store_part_number: string,
    updated_at: string,
    username: string,
    notes: string
}

export type Part = {
    recipient: string,
    donor: string,
    store_part_number: string,
    type: string,
    part: string
}

function formatThousandsK(value: number): string {
    if (value < 1000) return value.toString()
    return (value / 1000).toFixed(0) + " K"
}

function formatUSD(value: number) {
    const currencyValue = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)
    return currencyValue
}

function getFormattedDate(rawDate: string, withTime?: boolean) {
    if(withTime) {
        return format(new Date(rawDate), 'MMMM dd, yyyy, h:mm a')
    }
    return format(new Date(rawDate), 'MMMM dd, yyyy')
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/)

  if (words.length === 1) {
    // Single word: take first 2 characters
    return words[0].slice(0, 2).toUpperCase()
  }

  // Multiple words: take first letter of first 2 words
  return words
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase()
}

function mapAssetDetail(r: AssetDetailResponse): AssetDetails {
    return {
        barcode: r.barcode,
        serial_number: r.serial_number,
        model: r.model,
        brand: r.brand,
        asset_type: r.asset_type,
        tracking_status: r.tracking_status,
        availability_status: r.availability_status,
        technical_status: r.technical_status,
        location: r.location,
        warehouse_code: r.location_city_code,
        warehouse_street: r.location_street,
        cost: {
            purchase_cost: formatUSD(r.purchase_cost),
            transport_cost: formatUSD(r.transport_cost),
            processing_cost: formatUSD(r.processing_cost),
            other_cost: formatUSD(r.other_cost),
            parts_cost: formatUSD(r.parts_cost),
            total_cost: formatUSD(r.total_cost),
            sale_price: formatUSD(r.sale_price)
        },
        specs: {
            cassettes: r.ts_cassettes,
            internal_finisher: r.internal_finisher,
            meter_black: formatThousandsK(parseInt(r.meter_black)),
            meter_colour: formatThousandsK(parseInt(r.meter_colour)),
            meter_total: formatThousandsK(parseInt(r.meter_black) + parseInt(r.meter_colour)),
            drum_life_c: r.drum_life_c,
            drum_life_m: r.drum_life_m,
            drum_life_y: r.drum_life_y,
            drum_life_k: r.drum_life_k,
        },
        created_at: getFormattedDate(r.created_at),
        is_held: r.is_held,
        hold: {
            created_by: r.hold_by_name,
            created_for: r.hold_for_name,
            created_at: !!r.hold_created_at ? getFormattedDate(r.hold_created_at) : null,
            customer: r.hold_customer,
            from_dt: r.hold_from,
            to_dt: r.hold_to,
            notes: r.hold_notes,
            hold_number: r.hold_number
        },
        arrival: {
            arrival_number: r.arrival_number,
            origin: r.arrival_origin,
            destination_code: r.arrival_destination_city_code,
            destination_street: r.arrival_destination_street,
            transporter: r.arrival_transporter,
            created_by: r.arrival_created_by_name,
            notes: r.arrival_notes,
            created_at: !!r.arrival_created_at ? getFormattedDate(r.arrival_created_at) : ''
        },
        departure:{
            departure_number: r.departure_number,
            origin_code: r.departure_origin_city_code,
            origin_street: r.departure_origin_city_code,
            destination: r.departure_destination,
            transporter: r.departure_transporter,
            created_by: r.departure_created_by_name,
            notes: r.departure_notes,
            created_at: !!r.departure_created_at ? getFormattedDate(r.departure_created_at) : ''
        },
        purchase_invoice: {
            invoice_number: r.purchase_invoice_number,
            is_cleared: r.purchase_invoice_is_cleared
        }
    }
}

function mapAssetComments(c: CommentResponse) : Comment {
    return {
        comment: c.comment,
        username: c.username,
        created_at: getFormattedDate(c.created_at, true),
        updated_at: getFormattedDate(c.updated_at, true),
        initials: getInitials(c.username)
    }
}

function mapAssetTransfers(t: Transfer): Transfer {
    return {
        created_at: getFormattedDate(t.created_at),
        source_code: t.source_code,
        source_stree: t.source_stree,
        destination_code: t.destination_code,
        destination_street: t.destination_street,
        transfer_number: t.transfer_number,
        transporter: t.transporter
    }
}

function getPartNames(notes: string) : string {
    const sqrBracketRegex = /\[(.*?)\]/g
    const goodBadRegex = /Exchanged(.*?)\(GOOD\)/g
    
    const sqrBracketResults = Array.from(notes.matchAll(sqrBracketRegex)).map((m) => m[1])
    const goodBadResults = Array.from(notes.matchAll(goodBadRegex)).map((m) => m[1])

    if(sqrBracketResults[0]) return sqrBracketResults[0]
    return goodBadResults[0]
}

function mapAssetParts(p: PartResponse): Part {
    return {
        recipient: p.recipient,
        donor: p.donor,
        store_part_number: p.store_part_number,
        type: p.store_part_number ? 'STORE' : 'MACHINE',
        part: getPartNames(p.notes)
    }
}

export async function getAssetDetail(params: { barcode: string }): Promise<AssetDetails> {
    const res = await api.get<AssetDetailResponse>(`/assets/${params.barcode}`)
    return mapAssetDetail(res.data)
}

export async function getAssetAccessories(params: { barcode: string }): Promise<string[]> {
    const res = await api.get<string[]>(`/assets/${params.barcode}/accessories`)
    return res.data
}

export async function getAssetErrors(params: { barcode: string }): Promise<Error[]> {
    const res = await api.get<Error[]>(`/assets/${params.barcode}/errors`)
    return res.data
}

export async function getAssetComments(params: { barcode: string }): Promise<Comment[]> {
    const res = await api.get<CommentResponse[]>(`/assets/${params.barcode}/comments`)
    return res.data.map(mapAssetComments)
}

export async function getAssetTransfers(params: {barcode: string}): Promise<Transfer[]> {
    const res = await api.get<Transfer[]>(`/assets/${params.barcode}/transfers`)
    return res.data.map(mapAssetTransfers)
}

export async function getAssetParts(params: {barcode: string}): Promise<Part[]> {
    const res = await api.get<PartResponse[]>(`/assets/${params.barcode}/parts`)
    return res.data.map(mapAssetParts)
}