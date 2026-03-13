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

        <h1 style={{ marginBottom: "10px" }}>
          Crear cuenta
        </h1>

        <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
          Regístrate para usar tu panel de tareas
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

          {/* NOMBRE */}
          <div style={{ marginBottom: "15px" }}>

            <label>Nombre</label>

            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
              disabled={loading}
              placeholder="Tu nombre"
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

          {/* EMAIL */}
          <div style={{ marginBottom: "15px" }}>

            <label>Correo electrónico</label>

            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="correo@email.com"
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
          <div style={{ marginBottom: "20px" }}>

            <label>Contraseña</label>

            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
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

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "#475569" : "#22c55e",
              border: "none",
              padding: "12px",
              borderRadius: "8px",
              fontWeight: "600",
              color: "white",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>

        </form>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "14px",
            color: "#94a3b8"
          }}
        >

          ¿Ya tienes cuenta?{" "}

          <Link
            to="/login"
            style={{
              color: "#3b82f6",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            Inicia sesión
          </Link>

        </p>

      </div>

    </div>

  )

}