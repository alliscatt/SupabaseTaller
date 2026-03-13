import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

export function Register() {

  const navigate = useNavigate()
  const { signUp } = useAuthContext()

  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    setError("")

    const cleanEmail = email.trim().toLowerCase()

    if (nombre.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres")
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener mínimo 6 caracteres")
      return
    }

    setLoading(true)

    try {

      await signUp(cleanEmail, password, nombre.trim())

      alert("Cuenta creada correctamente. Revisa tu correo para confirmarla.")

      navigate("/login")

    } catch (err: any) {

      setError(err.message || "Error al registrar")

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
            fontSize: "42px",
            marginBottom: "20px",
            fontWeight: 700
          }}
        >
          Crea tu espacio
        </h1>

        <p
          style={{
            maxWidth: "420px",
            fontSize: "18px",
            lineHeight: "1.6",
            opacity: 0.9
          }}
        >
          Organiza tus tareas, visualiza tu progreso
          y mantén tu productividad bajo control.
        </p>

        <div
          style={{
            marginTop: "40px",
            fontSize: "60px",
            opacity: 0.8
          }}
        >
          🌸📝📊
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
            Crear cuenta
          </h2>

          <p
            style={{
              marginBottom: "25px",
              color: "#6b7280",
              fontSize: "14px"
            }}
          >
            Regístrate para comenzar
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

            <div style={{ marginBottom: "16px" }}>

              <input
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                required
                disabled={loading}
                placeholder="Nombre"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  background: "#f9fafb"
                }}
              />

            </div>

            <div style={{ marginBottom: "16px" }}>

              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder="Correo electrónico"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  background: "#f9fafb"
                }}
              />

            </div>

            <div style={{ marginBottom: "20px" }}>

              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={loading}
                placeholder="Contraseña"
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
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>

          </form>

          <p
            style={{
              marginTop: "25px",
              textAlign: "center",
              fontSize: "14px",
              color: "#6b7280"
            }}
          >

            ¿Ya tienes cuenta?{" "}

            <Link
              to="/login"
              style={{
                color: "#ec4899",
                textDecoration: "none",
                fontWeight: "600"
              }}
            >
              Inicia sesión
            </Link>

          </p>

        </div>

      </div>

    </div>

  )

}