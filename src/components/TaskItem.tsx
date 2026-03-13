import { useState } from "react"
import type { Tarea } from "../types/database"

interface Props {
  tarea: Tarea
  onActualizar: (id: string, completada: boolean) => Promise<any>
  onEditar: (id: string, titulo: string, descripcion: string) => Promise<any>
  onEliminar: (id: string) => Promise<any>
}

export function TaskItem({ tarea, onActualizar, onEditar, onEliminar }: Props) {

  const [eliminando, setEliminando] = useState(false)
  const [editando, setEditando] = useState(false)

  const [titulo, setTitulo] = useState(tarea.titulo ?? "")
  const [descripcion, setDescripcion] = useState(tarea.descripcion ?? "")

  const handleEliminar = async () => {

    if (!confirm("¿Eliminar esta tarea?")) return

    setEliminando(true)

    await onEliminar(tarea.id)

  }

  const handleGuardar = async () => {

    await onEditar(tarea.id, titulo, descripcion)

    setEditando(false)

  }

  const cancelarEdicion = () => {

    setTitulo(tarea.titulo ?? "")
    setDescripcion(tarea.descripcion ?? "")
    setEditando(false)

  }

  return (

    <div
      style={{
        display: "flex",
        gap: "14px",
        alignItems: "center",
        padding: "16px",
        background: "white",
        borderRadius: "14px",
        marginBottom: "12px",
        border: "1px solid #f1f5f9",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        opacity: eliminando ? 0.5 : 1,
        transition: "all 0.2s"
      }}
    >

      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={() => onActualizar(tarea.id, !tarea.completada)}
        style={{
          width: "20px",
          height: "20px",
          cursor: "pointer"
        }}
      />

      <div style={{ flex: 1 }}>

        {editando ? (

          <>

            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              style={{
                width: "100%",
                marginBottom: "6px",
                padding: "8px",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                background: "#f9fafb",
                fontSize: "14px",
                outline: "none"
              }}
            />

            <input
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                background: "#f9fafb",
                fontSize: "14px",
                outline: "none"
              }}
            />

          </>

        ) : (

          <>

            <strong
              style={{
                display: "block",
                fontSize: "15px",
                textDecoration: tarea.completada ? "line-through" : "none",
                color: tarea.completada ? "#9ca3af" : "#374151"
              }}
            >
              {tarea.titulo}
            </strong>

            {tarea.descripcion && (

              <p
                style={{
                  margin: "4px 0 0 0",
                  color: "#6b7280",
                  fontSize: "13px"
                }}
              >
                {tarea.descripcion}
              </p>

            )}

          </>

        )}

      </div>

      {editando ? (

        <>

          <button
            onClick={handleGuardar}
            style={{
              border: "none",
              background: "#22c55e",
              color: "white",
              padding: "6px 10px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            💾
          </button>

          <button
            onClick={cancelarEdicion}
            style={{
              border: "none",
              background: "#f472b6",
              color: "white",
              padding: "6px 10px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            ✖
          </button>

        </>

      ) : (

        <button
          onClick={() => setEditando(true)}
          style={{
            border: "none",
            background: "#f472b6",
            color: "white",
            padding: "6px 10px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          ✏
        </button>

      )}

      <button
        onClick={handleEliminar}
        disabled={eliminando}
        style={{
          border: "none",
          background: "#ef4444",
          color: "white",
          padding: "6px 10px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        🗑
      </button>

    </div>

  )

}