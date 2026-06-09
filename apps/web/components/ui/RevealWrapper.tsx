"use client"

import { useReveal } from "@/lib/useReveal"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
}

export function RevealWrapper({ children, className = "" }: Props) {
  const ref = useReveal()
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal-on-scroll${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  )
}
