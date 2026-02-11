import * as React from "react"
import { cn } from "@/lib/utils"

type ChildrenProps = {
  children: React.ReactNode
  className?: string
}

type HeaderProps = {
  title: string
  className?: string
}

type CMYKDataProps = {
  label: string,
  c_value: number | undefined,
  m_value: number | undefined,
  y_value: number | undefined,
  k_value: number | undefined,
  className?: string
}

type DataPointProps = {
  label: string,
  value: string | number | undefined | null,
  curr?: boolean,
  className?: string
}

type LabelProps = {
  label: string,
  className?: string
}

type ValueProps = {
  value: string | number | undefined | null,
  curr?: boolean,
  className?: string

}

export function DetailsContainer({ children, className }: ChildrenProps): React.JSX.Element {
  return (
    <div className={cn("flex flex-col rounded-lg border bg-card p-6 shadow-sm grow space-y-5", className)}>
      {children}
    </div>
  )
}

export function SectionRow({ children, className }: ChildrenProps): React.JSX.Element {
  return (
    <div className={cn("flex flex-row flex-wrap space-x-25 justify-center", className)}>
      {children}
    </div>
  )
}


export function Section({ children, className }: ChildrenProps): React.JSX.Element {
  return (
    <section className={cn("space-y-5 max-w-96", className)}>
      {children}
    </section>
  )
}

export function Header({ title, className }: HeaderProps): React.JSX.Element {
  return (
    <h2 className={cn("text-2xl font-bold tracking-tight text-left", className)}>
      {title}
    </h2>
  )
}

export function DataRowContainer({ children }: ChildrenProps): React.JSX.Element {
  return (
    <div className="flex flex-col">
      {children}
    </div>
  )
}

export function DataRow({ label, value, curr = false, className }: DataPointProps): React.JSX.Element {
  return (
    <div className={cn("flex items-center gap-4 py-2 border-b last:border-b-0", className)}>
      <DataLabel label={label} />
      <DataValue value={value} curr={curr} />
    </div>
  )
}

export function CMYKRow({ 
  label, 
  c_value, 
  m_value, 
  y_value, 
  k_value,
  className
}: CMYKDataProps): React.JSX.Element {

  return (
    <div className={cn("flex items-center gap-4 py-2 border-b last:border-b-0", className)}>
      <DataLabel label={label} />
      <dd className="flex items-center gap-2 text-sm font-semibold">
        <span className="flex items-center gap-1">
          <span className="text-cyan-500">C</span>
          <span className="tabular-nums">{c_value ?? 0}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="text-fuchsia-500">M</span>
          <span className="tabular-nums">{m_value ?? 0}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="text-yellow-500">Y</span>
          <span className="tabular-nums">{y_value ?? 0}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="text-foreground">K</span>
          <span className="tabular-nums">{k_value ?? 0}</span>
        </span>
      </dd>
    </div>
  )
}

export function DataLabel({ label, className }: LabelProps): React.JSX.Element {
  return (
    <dt className={cn("text-left text-sm font-medium text-muted-foreground min-w-[130px]", className)}>
      {label}
    </dt>
  )
}

export function DataValue({ value, curr = false, className }: ValueProps): React.JSX.Element {
  var formattedValue = value ?? "-"
  if (curr) {
    return (
      <dd className={cn("flex items-center gap-1 text-sm font-semibold", className)}>
        {value && <span>$</span>}
        <span className="tabular-nums text-right w-[80px]">{formattedValue}</span>
      </dd>
    )
  } 
  
  return (
    <dd className={cn("text-sm font-semibold", className)}>
        {formattedValue}
    </dd>
  )

}