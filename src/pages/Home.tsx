// src/pages/Home.tsx

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

import { useTasks } from "../hooks/useTasks"
import { useRealtimeTasks } from "../hooks/useRealtimeTasks"
import { usePresence } from "../hooks/usePresence"

import { useAuthContext } from "../context/AuthContext"

import { TaskForm } from "../components/TaskForm"
import { TaskItem } from "../components/TaskItem"
import { RealtimeIndicator } from "../components/RealtimeIndicator"

export function Home() {

  const { tareas, loading, error, crearTarea, actualizarTarea, eliminarTarea } = useTasks()

  const { conectado } = useRealtimeTasks()

  const { onlineUsers } = usePresence("tareas")

  const { signOut } = useAuthContext()

  const navigate = useNavigate()

  // 🔎 estado de búsqueda
  const [search, setSearch] = useState("")

  // 🔎 tareas filtradas
  const tareasFiltradas = tareas.filter((t) =>
    (t.titulo ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (t.descripcion ?? "").toLowerCase().includes(search.toLowerCase())
  )

  const handleLogout = async () => {
    try {
      await signOut()
      navigate("/login")
    } catch (err) {
      console.error("Error cerrando sesión:", err)
    }
  }

  if (loading) return <div>Cargando tareas...</div>
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          padding: "0.75rem 1rem",
          background: "#f8fafc",
          borderRadius: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/">📝 Mis tareas</Link>
          <Link to="/dashboard">📊 Dashboard</Link>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <RealtimeIndicator conectado={conectado} />

          <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
            👥 {onlineUsers.length} en línea
          </span>

          <button onClick={handleLogout}>Salir</button>
        </div>
      </nav>

      <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
        <h1>Mis Tareas</h1>

        <TaskForm
          onCrear={(titulo, descripcion) =>
            crearTarea({ titulo, descripcion })
          }
          search={search}
          setSearch={setSearch}
        />

        {tareasFiltradas.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>
            No se encontraron tareas
          </p>
        ) : (
          tareasFiltradas.map((t) => (
            <TaskItem
              key={t.id}
              tarea={t}
              onActualizar={(id, completada) =>
                actualizarTarea(id, { completada })
              }
              onEditar={(id, titulo, descripcion) =>
                actualizarTarea(id, { titulo, descripcion })
              }
              onEliminar={eliminarTarea}
            />
          ))
        )}

        <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
          {tareas.filter((t) => t.completada).length} / {tareas.length} completadas
        </p>
      </div>
    </>
  )
}