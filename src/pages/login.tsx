// src/pages/Login.tsx

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

export function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { signIn } = useAuthContext()

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    setError("")
    setLoading(true)

    try {

      await signIn(email, password)
      navigate("/")

    } catch (err: any) {

      setError(err.message || "Credenciales incorrectas")

    } finally {

      setLoading(false)

    }

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

      {/* PANEL IZQUIERDO DECORATIVO */}

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
            fontSize: "42px",
            marginBottom: "20px",
            fontWeight: 700
          }}
        >
          Organiza tus tareas
        </h1>

        <p
          style={{
            maxWidth: "420px",
            fontSize: "18px",
            lineHeight: "1.6",
            opacity: 0.9
          }}
        >
          Gestiona tu productividad diaria, visualiza tu progreso
          y mantén todo bajo control en un solo lugar.
        </p>

        <div
          style={{
            marginTop: "40px",
            fontSize: "60px",
            opacity: 0.8
          }}
        >
          📝✨📊
        </div>

      </div>

      {/* PANEL DERECHO FORMULARIO */}

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
            Bienvenidos
          </h2>

          <p
            style={{
              marginBottom: "25px",
              color: "#6b7280",
              fontSize: "14px"
            }}
          >
            Inicia sesión para continuar
          </p>

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

          <form onSubmit={handleSubmit}>

            {/* INPUT CORREO */}

            <div style={{ marginBottom: "18px" }}>

              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Correo electrónico"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  background: "#f9fafb",
                  color: "#111827" // texto visible
                }}
              />

            </div>

            {/* INPUT CONTRASEÑA */}

            <div style={{ marginBottom: "10px" }}>

              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Contraseña"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  background: "#f9fafb",
                  color: "#111827" // texto visible
                }}
              />

            </div>

            {/* LINK OLVIDÉ CONTRASEÑA */}

            <div
              style={{
                textAlign: "right",
                marginBottom: "22px",
                fontSize: "13px"
              }}
            >

              <Link
                to="/forgot-password"
                style={{
                  color: "#ec4899",
                  textDecoration: "none"
                }}
              >
                ¿Olvidaste tu contraseña?
              </Link>

            </div>

            {/* BOTÓN LOGIN */}

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
                cursor: "pointer",
                fontSize: "15px"
              }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

          </form>

          {/* LINK REGISTRO */}

          <p
            style={{
              marginTop: "25px",
              textAlign: "center",
              fontSize: "14px",
              color: "#6b7280"
            }}
          >

            ¿No tienes cuenta?{" "}

            <Link
              to="/register"
              style={{
                color: "#ec4899",
                textDecoration: "none",
                fontWeight: "600"
              }}
            >
              Regístrate
            </Link>

          </p>

        </div>

      </div>

    </div>

  )

}