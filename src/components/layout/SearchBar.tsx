import { cn } from "@/lib/utils"
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { getAssetAccessories, getAssetComments, getAssetDetail, getAssetErrors, getAssetParts, getAssetTransfers } from "@/services/api"
import { useState } from 'react'
import { useAssetStore } from '@/store/useAssetStore'

interface SearchBarProps {
    className?: string
}

export const SearchBar = ({ className }: SearchBarProps) => {

    const [inputBarcode, setInputBarcode] = useState("")
    const [loading, setLoading] = useState(false)

    const setAssetDetails = useAssetStore((state) => state.setAssetDetails)
    const setAssetAccessories = useAssetStore((state) => state.setAssetAccessories)
    const setAssetErrors = useAssetStore((state) => state.setAssetErrors)
    const setAssetComments = useAssetStore((state) => state.setAssetComments)
    const setAssetTransfers = useAssetStore((state) => state.setAssetTransfers)
    const setAssetParts = useAssetStore((state) => state.setAssetParts)

    async function handleSearch() {
        if (!inputBarcode) return

        const results = await Promise.allSettled([
            getAssetDetail({ barcode: inputBarcode }),
            getAssetAccessories({ barcode: inputBarcode }),
            getAssetErrors({ barcode: inputBarcode }),
            getAssetComments({ barcode: inputBarcode }),
            getAssetTransfers({ barcode: inputBarcode }),
            getAssetParts({ barcode: inputBarcode })
        ])

        if (results[0].status === 'fulfilled') setAssetDetails(results[0].value)
        if (results[1].status === 'fulfilled') setAssetAccessories(results[1].value)
        if (results[2].status === 'fulfilled') setAssetErrors(results[2].value)
        if (results[3].status === 'fulfilled') setAssetComments(results[3].value)
        if (results[4].status === 'fulfilled') setAssetTransfers(results[4].value)
        if (results[5].status === 'fulfilled') setAssetParts(results[5].value)

        setLoading(false)
    }


    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            handleSearch()
        }} className={cn("flex flex-row gap-2", className)}>
            <Input
                type="text"
                placeholder="Barcode"
                value={inputBarcode}
                onChange={(e) => setInputBarcode(e.target.value.trim())}
            />
            <Button
                type="submit"
                disabled={loading}
            >
                {loading ? "Searching..." : "Search"}
            </Button>
        </form>
    )
}