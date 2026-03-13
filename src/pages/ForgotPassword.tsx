import { useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { Link } from "react-router-dom"

export function ForgotPassword() {

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    setError("")
    setMessage("")
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password"
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage("Te enviamos un correo para recuperar tu contraseña.")
    }

    setLoading(false)

  }

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#fbc2eb,#a6c1ee)",
        fontFamily: "Segoe UI, sans-serif",
        padding: "20px"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "35px",
          color: "white"
        }}
      >

        <div style={{ fontSize: "55px", marginBottom: "10px" }}>
          📩
        </div>

        <h1 style={{
          margin: 0,
          fontSize: "32px",
          fontWeight: 700
        }}>
          Recuperar acceso
        </h1>

        <p style={{
          marginTop: "10px",
          fontSize: "16px",
          opacity: 0.9
        }}>
          Te enviaremos un enlace para restablecer tu contraseña
        </p>

      </div>


      {/* TARJETA */}

      <div
        style={{
          width: "380px",
          background: "white",
          padding: "35px",
          borderRadius: "18px",
          boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
          color: "#374151"
        }}
      >

        {error && (
          <div
            style={{
              background: "#ffe4e6",
              color: "#be123c",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "15px",
              fontSize: "14px"
            }}
          >
            {error}
          </div>
        )}

        {message && (
          <div
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "15px",
              fontSize: "14px"
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <label
            style={{
              fontSize: "13px",
              color: "#6b7280",
              marginBottom: "6px",
              display: "block"
            }}
          >
            Correo electrónico
          </label>

          <input
            type="email"
            placeholder="correo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              background: "#f9fafb",
              outline: "none",
              marginBottom: "20px"
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              border: "none",
              borderRadius: "12px",
              background: "linear-gradient(135deg,#f472b6,#ec4899)",
              color: "white",
              fontWeight: "600",
              fontSize: "15px",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 6px 15px rgba(236,72,153,0.4)"
            }}
          >
            {loading ? "Enviando enlace..." : "Enviar enlace de recuperación"}
          </button>

        </form>

        <div
          style={{
            marginTop: "25px",
            textAlign: "center",
            fontSize: "14px"
          }}
        >

          <Link
            to="/login"
            style={{
              color: "#ec4899",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            ← Volver al login
          </Link>

        </div>

      </div>

    </div>
  )
}