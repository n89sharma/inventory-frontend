import { cn } from "@/lib/utils"
import { Button } from '@/components/shadcn/button'
import { Input } from '@/components/shadcn/input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  loading: boolean,
  className?: string
}

export const SearchBar = ({ loading, className }: SearchBarProps) => {
  const [barcode, setBarcode] = useState("")
  const navigate = useNavigate()

  async function handleSearch() {
    if (!barcode) return
    navigate(`/assets/${barcode}`)
  }


  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleSearch()
    }} className={cn("flex flex-row gap-2", className)}>
      <Input
        type="text"
        placeholder="Search"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value.trim())}
      />
      <Button
        type="submit"
        disabled={loading}
      >
        Search
      </Button>
    </form>
  )
}