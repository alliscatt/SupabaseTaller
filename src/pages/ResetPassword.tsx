// src/pages/ResetPassword.tsx

import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

export function ResetPassword() {

  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleReset = async (e: React.FormEvent) => {

    e.preventDefault()

    const { error } = await supabase.auth.updateUser({
      password
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Contraseña actualizada correctamente")
    }

  }

  return (

    <div style={{ maxWidth: "400px", margin: "100px auto" }}>

      <h2>Nueva contraseña</h2>

      <form onSubmit={handleReset}>

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Cambiar contraseña
        </button>

      </form>

      {message && <p>{message}</p>}

    </div>

  )

}