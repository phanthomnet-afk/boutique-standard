"use client"
import { useState, useEffect } from "react"

export function usePrice() {
  const [price, setPrice] = useState("€995")

  useEffect(() => {
    const lang = navigator.language || ""
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
    const isDK = lang.startsWith("da") || tz.includes("Copenhagen")
    setPrice(isDK ? "7.450 kr." : "€995")
  }, [])

  return price
}
