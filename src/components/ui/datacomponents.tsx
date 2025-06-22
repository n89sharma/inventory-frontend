type LabelProps = {
  label: string
}

export function DataLabel({ label }: LabelProps): React.JSX.Element {
  return (
    <div className="w-30"><p className="text-left text-xs font-medium text-gray-500">{label}</p></div>
  )
}

type ValueProps = {
  value: string | number | null
}

export function DataValue({ value }: ValueProps): React.JSX.Element {
  return (
    <div className="flex flex-1"><p className="text-sm font-bold text-gray-900">{value}</p></div>
  )
}

type DataPointProps = {
  label: string,
  value: string | number | null,
  isFirst?: boolean
}

export function DataRow({ label, value, isFirst=false }: DataPointProps): React.JSX.Element {
  const className = isFirst 
    ? "border-t-1 border-b-1 border-gray-200 flex flex-col item-start p-1 self-stretch" 
    : "border-b-1 border-gray-200 flex flex-col item-start p-1 self-stretch"
  return (
    <div className={className}>
      <div className="flex flex-row items-center self-stretch gap-4">
        <DataLabel label={label} />
        <DataValue value={value} />
      </div>
    </div>
  )
}

type ChildrenProps = {
  children: React.ReactNode
}

export function DataRowContainer({ children }: ChildrenProps): React.JSX.Element {
  return (
    <div className="flex flex-col item-start self-stretch">
      {children}
    </div>
  )
}

{/* <div className="flex flex-col gap-4 item-start p-2 max-w-sm min-w-3xs">
        <div className="flex content-center h-8 max-w-sm">
          <h2 className="text-2xl font-bold font-sans">Summary</h2>
        </div>
         */}

export function Section({ children }: ChildrenProps ): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4 item-start p-2 max-w-sm min-w-3xs">
      { children }
    </div>
  )
}

type HeaderProps = {
  title: string
}

export function Header({ title }: HeaderProps): React.JSX.Element {
  return (
    <div className="flex content-center h-8 max-w-sm"><h2 className="text-2xl font-bold font-sans">{ title }</h2></div>
  )
}


export function DetailsContainer({ children }: ChildrenProps): React.JSX.Element {
  return (
    <div className="flex flex-col px-32 self-stretch border-1 rounded-lg border-gray-300 gap-4 py-4">
      { children }
    </div>
  )
}