"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import styles from "./login.module.css"

function LoginForm() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      const from = searchParams.get("from") ?? "/admin/hotels"
      router.push(from)
    } else {
      setError("Incorrect password.")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
        autoFocus
        autoComplete="current-password"
      />
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? "..." : "Enter"}
      </button>
    </form>
  )
}

export default function AdminLogin() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <p className={styles.wordmark}>The Boutique Standard</p>
        <h1 className={styles.heading}>Admin access</h1>
        <Suspense fallback={<div className={styles.form} />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
