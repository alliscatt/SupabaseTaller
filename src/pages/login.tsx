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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#0f172a,#1e293b)"
      }}
    >

      <div
        style={{
          width: "380px",
          background: "#1e293b",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          color: "white"
        }}
      >

        {/* HEADER */}

        <div style={{ textAlign: "center", marginBottom: "25px" }}>

          <p style={{ color: "#94a3b8", marginBottom: "5px" }}>
            Panel personal
          </p>

          <h1 style={{ margin: 0 }}>
            Mis Tareas
          </h1>

        </div>

        <p style={{
          marginBottom: "15px",
          fontWeight: "600"
        }}>
          Iniciar sesión
        </p>

        {error && (

          <div
            style={{
              background: "#7f1d1d",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "15px",
              fontSize: "14px"
            }}
          >
            {error}
          </div>

        )}

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}

          <div style={{ marginBottom: "15px" }}>

            <label style={{
              fontSize: "13px",
              color: "#cbd5f5"
            }}>
              Correo electrónico
            </label>

            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                borderRadius: "8px",
                border: "1px solid #334155",
                background: "#0f172a",
                color: "white"
              }}
            />

          </div>

          {/* PASSWORD */}

          <div style={{ marginBottom: "10px" }}>

            <label style={{
              fontSize: "13px",
              color: "#cbd5f5"
            }}>
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                borderRadius: "8px",
                border: "1px solid #334155",
                background: "#0f172a",
                color: "white"
              }}
            />

          </div>

          {/* RECUPERAR CONTRASEÑA */}

          <div style={{
            textAlign: "right",
            marginBottom: "20px",
            fontSize: "13px"
          }}>

            <Link
              to="/forgot-password"
              style={{
                color: "#3b82f6",
                textDecoration: "none"
              }}
            >
              ¿Olvidaste tu contraseña?
            </Link>

          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "#2563eb",
              border: "none",
              padding: "12px",
              borderRadius: "8px",
              fontWeight: "600",
              color: "white",
              cursor: "pointer"
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

        </form>

        <p style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "14px",
          color: "#94a3b8"
        }}>

          ¿No tienes cuenta?{" "}

          <Link
            to="/register"
            style={{
              color: "#3b82f6",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            Regístrate aquí
          </Link>

        </p>

      </div>

    </div>

  )

}