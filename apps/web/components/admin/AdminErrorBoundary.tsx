"use client"

import { Component, ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: string
}

export class AdminErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: "" }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error.message }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "4rem 2rem",
            fontFamily: "monospace",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <h1 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
            Admin Error
          </h1>
          <pre
            style={{
              background: "#f4f4f4",
              padding: "1rem",
              overflow: "auto",
              fontSize: "0.875rem",
              whiteSpace: "pre-wrap",
            }}
          >
            {this.state.error}
          </pre>
          <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
            Check Vercel function logs for full details.
          </p>
          <a href="/admin/login" style={{ color: "#4A6FA5" }}>
            Try logging in again
          </a>
        </div>
      )
    }
    return this.props.children
  }
}
