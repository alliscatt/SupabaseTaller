// src/components/TaskForm.tsx

import { useState } from "react"

interface Props {
  onCrear: (titulo: string, descripcion: string) => Promise<any>
  search: string
  setSearch: (value: string) => void
}

export function TaskForm({ onCrear, search, setSearch }: Props) {

  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    if (!titulo.trim()) return

    setSubmitting(true)

    try {

      await onCrear(titulo.trim(), descripcion.trim())

      setTitulo("")
      setDescripcion("")

    } catch (err) {

      console.error(err)

    } finally {

      setSubmitting(false)

    }

  }

  return (

    <>

      {/* BARRA BUSCADORA */}

      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          gap: "8px"
        }}
      >

        <input
          type="text"
          placeholder="🔎 Buscar tareas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #334155",
            background: "#0f172a",
            color: "white"
          }}
        />

        {search && (

          <button
            onClick={() => setSearch("")}
            style={{
              background: "#334155",
              border: "none",
              borderRadius: "8px",
              padding: "10px 14px",
              color: "white",
              cursor: "pointer"
            }}
          >
            ❌
          </button>

        )}

      </div>


      <form
        onSubmit={handleSubmit}
        style={{
          background: "#1e293b",
          padding: "24px",
          borderRadius: "12px",
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.25)"
        }}
      >

        <h2 style={{
          margin: 0,
          fontSize: "20px",
          fontWeight: "600"
        }}>
          Nueva tarea
        </h2>

        <input
          type="text"
          placeholder="Título *"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #334155",
            background: "#0f172a",
            color: "white",
            fontSize: "14px"
          }}
        />

        <textarea
          placeholder="Descripción (opcional)"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows={3}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #334155",
            background: "#0f172a",
            color: "white",
            fontSize: "14px",
            resize: "vertical"
          }}
        />

        <button
          type="submit"
          disabled={submitting || !titulo.trim()}
          style={{
            marginTop: "6px",
            background: submitting ? "#475569" : "#2563eb",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: submitting ? "not-allowed" : "pointer",
            fontWeight: "600",
            fontSize: "14px",
            transition: "all 0.2s"
          }}
        >

          {submitting ? "Guardando..." : "+ Agregar tarea"}

        </button>

      </form>

    </>

  )

}