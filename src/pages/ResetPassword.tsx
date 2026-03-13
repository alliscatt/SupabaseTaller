// src/pages/ResetPassword.tsx

import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export function ResetPassword() {

  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {

    e.preventDefault()

    setLoading(true)
    setMessage("")

    const { error } = await supabase.auth.updateUser({
      password
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Contraseña actualizada correctamente")
    }

    setLoading(false)

  }

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 420px",
        background: "linear-gradient(135deg,#fbc2eb,#a6c1ee)",
        fontFamily: "Segoe UI, sans-serif"
      }}
    >

      {/* PANEL IZQUIERDO */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "white"
        }}
      >

        <h1
          style={{
            fontSize: "40px",
            marginBottom: "20px",
            fontWeight: 700
          }}
        >
          Recupera tu acceso
        </h1>

        <p
          style={{
            maxWidth: "420px",
            fontSize: "18px",
            lineHeight: "1.6",
            opacity: 0.9
          }}
        >
          Cambia tu contraseña para volver a acceder
          a tu panel de tareas y continuar con tu organización diaria.
        </p>

        <div
          style={{
            marginTop: "40px",
            fontSize: "60px",
            opacity: 0.8
          }}
        >
          🔐🌸
        </div>

      </div>

      {/* PANEL DERECHO */}

      <div
        style={{
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px"
        }}
      >

        <div style={{ width: "100%", maxWidth: "320px" }}>

          <h2
            style={{
              marginBottom: "10px",
              color: "#ec4899",
              fontWeight: 700
            }}
          >
            Nueva contraseña
          </h2>

          <p
            style={{
              marginBottom: "25px",
              color: "#6b7280",
              fontSize: "14px"
            }}
          >
            Ingresa una nueva contraseña segura
          </p>

          <form onSubmit={handleReset}>

            <div style={{ marginBottom: "20px" }}>

              <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  background: "#f9fafb"
                }}
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "linear-gradient(135deg,#f472b6,#ec4899)",
                border: "none",
                padding: "13px",
                borderRadius: "10px",
                fontWeight: "600",
                color: "white",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "15px"
              }}
            >
              {loading ? "Actualizando..." : "Cambiar contraseña"}
            </button>

          </form>

          {message && (

            <div
              style={{
                marginTop: "20px",
                padding: "10px",
                borderRadius: "10px",
                fontSize: "14px",
                background: message.includes("correctamente")
                  ? "#dcfce7"
                  : "#ffe4e6",
                color: message.includes("correctamente")
                  ? "#166534"
                  : "#be123c"
              }}
            >
              {message}
            </div>

          )}

        </div>

      </div>

    </div>

  )

}