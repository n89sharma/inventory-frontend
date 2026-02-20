import { api } from '@/api/axios-client'

export type Arrival = {
  arrival_number: string,
  created_at: Date,
  destination_code: string,
  destination_street: string,
  vendor: string,
  transporter: string,
  created_by: string
}

interface ArrivalResponse {
  arrival_number: string,
  created_at: string,
  destination_code: string,
  destination_street: string,
  vendor: string,
  transporter: string,
  created_by: string
}

function mapArrival(r: ArrivalResponse): Arrival {
  return {
    arrival_number: r.arrival_number,
    created_at: new Date(r.created_at),
    destination_code: r.destination_code,
    destination_street: r.destination_street,
    vendor: r.vendor,
    transporter: r.transporter,
    created_by: r.created_by
  }
}

export async function getArrivals(fromDate: Date, toDate: Date | undefined): Promise<Arrival[]> {
  const res = await api.get<ArrivalResponse[]>(`/arrivals`, {
    params: { fromDate: fromDate, toDate: toDate }
  })
  return res.data.map(mapArrival)
}