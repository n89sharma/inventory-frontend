import { cn } from "@/lib/utils"
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { getAssetAccessories, getAssetDetail } from "@/services/api"
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

    async function handleSearch() {
        if (!inputBarcode.trim()) return
        try {
            setLoading(true)
            const assetDetails = await getAssetDetail({ barcode: inputBarcode })
            setAssetDetails(assetDetails)
            const accessories = await getAssetAccessories({ barcode: inputBarcode})
            setAssetAccessories(accessories)
        } catch (err) {
            console.error("Search failed", err)
        } finally {
            setLoading(false)
        }
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
                onChange={(e) => setInputBarcode(e.target.value)}
            />
            <Button type="submit" variant="default" onClick={handleSearch} disabled={loading}>
                {loading ? "Searching..." : "Search"}
            </Button>
        </form>
    )
}