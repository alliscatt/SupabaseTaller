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

    <div style={{ marginBottom: "2rem" }}>

      {/* BARRA SUPERIOR */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
          gap: "12px"
        }}
      >

        <h2
          style={{
            margin: 0,
            fontSize: "20px",
            color: "#ec4899"
          }}
        >
          ✏️ Crear tarea
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >

          {/* BUSCADOR */}

          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              background: "white",
              fontSize: "13px",
              outline: "none",
              width: "180px",
              color: "#111827"
            }}
          />

          {search && (

            <button
              onClick={() => setSearch("")}
              style={{
                border: "none",
                background: "#f472b6",
                color: "white",
                borderRadius: "8px",
                padding: "6px 10px",
                cursor: "pointer"
              }}
            >
              ✖
            </button>

          )}

        </div>

      </div>


      {/* FORMULARIO */}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr auto",
          gap: "12px",
          background: "white",
          padding: "18px",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)"
        }}
      >

        {/* INPUT TITULO */}

        <input
          type="text"
          placeholder="Título de la tarea *"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          style={{
            padding: "10px 12px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            background: "white",
            fontSize: "13px",
            outline: "none",
            color: "#111827"
          }}
        />

        {/* INPUT DESCRIPCIÓN */}

        <input
          type="text"
          placeholder="Descripción (opcional)"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            background: "#f9fafb",
            fontSize: "14px",
            outline: "none",
            color: "#111827"
          }}
        />

        {/* BOTÓN AGREGAR */}

        <button
          type="submit"
          disabled={submitting || !titulo.trim()}
          style={{
            background: "linear-gradient(135deg,#f472b6,#ec4899)",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "10px",
            cursor: submitting ? "not-allowed" : "pointer",
            fontWeight: "600",
            fontSize: "14px",
            boxShadow: "0 5px 12px rgba(236,72,153,0.35)"
          }}
        >
          {submitting ? "..." : "Agregar"}
        </button>

      </form>

    </div>

  )

}