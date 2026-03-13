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

  const [search, setSearch] = useState("")

  const tareasFiltradas = tareas.filter((t) =>
    (t.titulo ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (t.descripcion ?? "").toLowerCase().includes(search.toLowerCase())
  )

  const handleLogout = async () => {
    await signOut()
    navigate("/login")
  }

  if (loading) return <div style={{padding:"2rem"}}>Cargando tareas...</div>
  if (error) return <div style={{padding:"2rem",color:"red"}}>{error}</div>

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        background: "linear-gradient(135deg,#fbc2eb,#a6c1ee)",
        fontFamily: "Segoe UI, sans-serif"
      }}
    >

      {/* SIDEBAR */}

      <aside
        style={{
          background: "white",
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "4px 0 20px rgba(0,0,0,0.08)"
        }}
      >

        <div>

          <h2
            style={{
              marginBottom: "2rem",
              color: "#ec4899"
            }}
          >
            📝 Tareas
          </h2>

          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              fontWeight: 600
            }}
          >

            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#ec4899"
              }}
            >
              Mis tareas
            </Link>

            <Link
              to="/dashboard"
              style={{
                textDecoration: "none",
                color: "#6366f1"
              }}
            >
              Dashboard
            </Link>

          </nav>

        </div>


        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}
        >

          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>

            <RealtimeIndicator conectado={conectado} />

            <span style={{fontSize:"0.85rem",color:"#6b7280"}}>
              {onlineUsers.length} usuarios online
            </span>

          </div>

          <button
            onClick={handleLogout}
            style={{
              border: "none",
              padding: "10px",
              borderRadius: "10px",
              background: "#ec4899",
              color: "white",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Cerrar sesión
          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main
        style={{
          padding: "2.5rem"
        }}
      >

        {/* HEADER */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem"
          }}
        >

          <h1
            style={{
              margin: 0,
              color: "#374151"
            }}
          >
            Tus tareas
          </h1>

          <div
            style={{
              background: "white",
              padding: "10px 16px",
              borderRadius: "12px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
              fontSize: "14px",
              color: "#6b7280"
            }}
          >
            {tareas.filter((t) => t.completada).length} / {tareas.length} completadas
          </div>

        </div>

        {/* PANEL PRINCIPAL */}

        <div
          style={{
            maxWidth: "750px",
            background: "white",
            padding: "2rem",
            borderRadius: "18px",
            boxShadow: "0 10px 35px rgba(0,0,0,0.12)"
          }}
        >

          <TaskForm
            onCrear={(titulo, descripcion) =>
              crearTarea({ titulo, descripcion })
            }
            search={search}
            setSearch={setSearch}
          />

          <div style={{marginTop:"1.5rem"}}>

            {tareasFiltradas.length === 0 ? (

              <p style={{color:"#9ca3af"}}>
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

          </div>

        </div>

      </main>

    </div>

  )
}