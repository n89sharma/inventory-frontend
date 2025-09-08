type LabelProps = {
  label: string
}

export function DataLabel({ label }: LabelProps): React.JSX.Element {
  return (
    <div className="w-30"><p className="text-left text-xs font-medium text-gray-500">{label}</p></div>
  )
}

type ValueProps = {
  value: string | number | undefined,
  curr?: boolean
}

export function DataValue({ value, curr = false }: ValueProps): React.JSX.Element {
  var formattedValue = value ? value : "-"
  if (curr) {
    return (
      <div className="flex flex-row gap-1">
        <p className={`text-sm font-bold text-gray-900`}>{value ? "$" : ""}</p>
        <p className={`text-sm font-bold text-gray-900 text-right w-19`}>{formattedValue}</p>
      </div>
    )
  } else {
    return (
      <div className="flex flex-row">
        <p className={`text-sm font-bold text-gray-900 text-left`}>{formattedValue}</p>
      </div>
    )
  }

}

type DataPointProps = {
  label: string,
  value: string | number | undefined,
  isFirst?: boolean,
  curr?: boolean
}

export function DataRow({ label, value, isFirst = false, curr = false }: DataPointProps): React.JSX.Element {
  const className = isFirst
    ? "border-t-1 border-b-1 border-gray-200 flex flex-col p-1"
    : "border-b-1 border-gray-200 flex flex-col p-1"
  return (
    <div className={className}>
      <div className="flex flex-row items-center gap-4">
        <DataLabel label={label} />
        <DataValue value={value} curr={curr} />
      </div>
    </div>
  )
}

type CMYKDataProps = {
  label: string,
  c_value: number | undefined,
  m_value: number | undefined,
  y_value: number | undefined,
  k_value: number | undefined
}

export function CMYKRow({ label, c_value, m_value, y_value, k_value }: CMYKDataProps): React.JSX.Element {
  return (
    <div className="border-b-1 border-gray-200 flex flex-col p-1">
      <div className="flex flex-row items-center gap-4">
        <DataLabel label={label} />
        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-1">
            <p className={`text-sm font-bold text-cyan-400 text-left`}>C</p>
            <p className={`text-sm font-bold text-gray-900 text-left`}>{c_value}</p>
          </div>

          <div className="flex flex-row gap-1">
            <p className={`text-sm font-bold text-fuchsia-400 text-left`}>M</p>
            <p className={`text-sm font-bold text-gray-900 text-left`}>{m_value}</p>
          </div>

          <div className="flex flex-row gap-1">
            <p className={`text-sm font-bold text-yellow-400 text-left`}>Y</p>
            <p className={`text-sm font-bold text-gray-900 text-left`}>{y_value}</p>
          </div>

          <div className="flex flex-row gap-1">
            <p className={`text-sm font-bold text-black text-left`}>K</p>
            <p className={`text-sm font-bold text-gray-900 text-left`}>{k_value}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

type ChildrenProps = {
  children: React.ReactNode
}

export function DataRowContainer({ children }: ChildrenProps): React.JSX.Element {
  return (
    <div className="flex flex-col">
      {children}
    </div>
  )
}

export function Section({ children }: ChildrenProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4 p-2 max-w-sm min-w-3xs">
      {children}
    </div>
  )
}

type HeaderProps = {
  title: string
}

export function Header({ title }: HeaderProps): React.JSX.Element {
  return (
    <div className="flex h-8 max-w-sm"><h2 className="text-2xl font-bold font-sans">{title}</h2></div>
  )
}


export function DetailsContainer({ children }: ChildrenProps): React.JSX.Element {
  return (
    <div className="flex flex-col px-4 border-1 rounded-lg border-gray-300 gap-4 py-4">
      {children}
    </div>
  )
}