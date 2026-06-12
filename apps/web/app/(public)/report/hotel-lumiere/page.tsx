export const dynamic = "force-dynamic"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hotel Lumiere - The Boutique Standard",
  description: "A guest experience intelligence report. Mallorca, Spain.",
}

export default function HotelLumierePage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#F8F5F0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Georgia, serif",
    }}>
      <div style={{
        textAlign: "center",
        padding: "4rem 2rem",
        maxWidth: "520px",
      }}>
        <p style={{
          fontSize: "0.6875rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#9E9890",
          marginBottom: "1.5rem",
          fontFamily: "DM Sans, sans-serif",
        }}>
          Case Report
        </p>
        <h1 style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 300,
          color: "#1C1C1C",
          lineHeight: 1.1,
          marginBottom: "1rem",
        }}>
          Hotel Lumiere
        </h1>
        <p style={{
          fontSize: "1rem",
          color: "#9E9890",
          fontFamily: "DM Sans, sans-serif",
          marginBottom: "2rem",
        }}>
          Mallorca, Spain
        </p>
        <p style={{
          fontSize: "0.875rem",
          color: "#9E9890",
          fontFamily: "DM Sans, sans-serif",
        }}>
          Case report coming soon.
        </p>
      </div>
    </main>
  )
}
