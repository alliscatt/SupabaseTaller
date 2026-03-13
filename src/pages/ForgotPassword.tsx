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

    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,#0f172a,#1e293b)"
    }}>

      <div style={{
        width: "380px",
        background: "#1e293b",
        padding: "35px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        color: "white"
      }}>

        <h1>Recuperar contraseña</h1>

        <p style={{color:"#94a3b8", marginBottom:"20px"}}>
          Ingresa tu correo y te enviaremos un enlace para cambiar tu contraseña
        </p>

        {error && (
          <div style={{
            background:"#7f1d1d",
            padding:"10px",
            borderRadius:"6px",
            marginBottom:"15px"
          }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{
            background:"#14532d",
            padding:"10px",
            borderRadius:"6px",
            marginBottom:"15px"
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="correo@email.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            style={{
              width:"100%",
              padding:"10px",
              borderRadius:"8px",
              border:"1px solid #334155",
              background:"#0f172a",
              color:"white",
              marginBottom:"15px"
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width:"100%",
              padding:"12px",
              border:"none",
              borderRadius:"8px",
              background:"#3b82f6",
              color:"white",
              fontWeight:"600"
            }}
          >
            {loading ? "Enviando..." : "Enviar correo"}
          </button>

        </form>

        <p style={{marginTop:"20px", textAlign:"center"}}>

          <Link to="/login" style={{color:"#3b82f6"}}>
            Volver al login
          </Link>

        </p>

      </div>

    </div>
  )
}