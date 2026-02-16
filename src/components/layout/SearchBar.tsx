import { cn } from "@/lib/utils"
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { getAssetAccessories, getAssetComments, getAssetDetail, getAssetErrors } from "@/services/api"
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

    async function handleSearch() {
        if (!inputBarcode.trim()) return
        try {
            setLoading(true)
            const assetDetails = await getAssetDetail({ barcode: inputBarcode })
            setAssetDetails(assetDetails)
            const accessories = await getAssetAccessories({ barcode: inputBarcode})
            setAssetAccessories(accessories)
            const errors = await getAssetErrors({barcode: inputBarcode})
            setAssetErrors(errors)
            const comments = await getAssetComments({barcode: inputBarcode})
            console.log(comments)
            setAssetComments(comments)
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