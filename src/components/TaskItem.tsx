// src/components/TaskItem.tsx

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
        padding: "14px",
        background: "#1e293b",
        borderRadius: "10px",
        marginBottom: "10px",
        border: "1px solid #334155",
        opacity: eliminando ? 0.5 : 1,
        transition: "all 0.2s"
      }}
    >

      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={() => onActualizar(tarea.id, !tarea.completada)}
        style={{
          width: "18px",
          height: "18px",
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
                padding: "6px",
                borderRadius: "6px",
                border: "1px solid #334155",
                background: "#0f172a",
                color: "white"
              }}
            />

            <input
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              style={{
                width: "100%",
                padding: "6px",
                borderRadius: "6px",
                border: "1px solid #334155",
                background: "#0f172a",
                color: "white"
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
                color: tarea.completada ? "#64748b" : "white"
              }}
            >
              {tarea.titulo}
            </strong>

            {tarea.descripcion && (

              <p
                style={{
                  margin: "4px 0 0 0",
                  color: "#94a3b8",
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
          <button onClick={handleGuardar}>💾</button>
          <button onClick={cancelarEdicion}>❌</button>
        </>

      ) : (

        <button
          onClick={() => setEditando(true)}
          style={{
            background: "transparent",
            border: "none",
            color: "#38bdf8",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          ✏
        </button>

      )}

      <button
        onClick={handleEliminar}
        disabled={eliminando}
        style={{
          background: "transparent",
          border: "none",
          color: "#ef4444",
          fontWeight: "600",
          cursor: "pointer",
          fontSize: "14px"
        }}
      >
        🗑
      </button>

    </div>

  )

}