import React from 'react'
import { Link } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/shadcn/breadcrumb'

interface BreadcrumbSegment {
  label: string
  href?: string
}

interface PageBreadcrumbProps {
  segments: BreadcrumbSegment[]
}

export function PageBreadcrumb({ segments }: PageBreadcrumbProps): React.JSX.Element {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((seg, i) => {
          const isLast = i === segments.length - 1
          return (
            <React.Fragment key={i}>
              {i > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast
                  ? <BreadcrumbPage>{seg.label}</BreadcrumbPage>
                  : <BreadcrumbLink asChild><Link to={seg.href!}>{seg.label}</Link></BreadcrumbLink>
                }
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
