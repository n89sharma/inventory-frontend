import { cn } from "@/lib/utils"
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { getAssetDetail } from "@/services/api"
import { useState } from 'react'
import { useSearchStore } from '@/store/useSearchStore'

interface SearchBarProps {
    className?: string
}

export const SearchBar = ({ className }: SearchBarProps) => {

    const [inputBarcode, setInputBarcode] = useState("")
    const [loading, setLoading] = useState(false)

    const setAssetDetails = useSearchStore((state) => state.setAssetDetails)

    async function handleSearch() {
        if (!inputBarcode.trim()) return
        try {
            setLoading(true)
            const data = await getAssetDetail({ barcode: inputBarcode })
            setAssetDetails(data)
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