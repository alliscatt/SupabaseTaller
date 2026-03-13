import { useDashboard } from '../hooks/useDashboard'
import { StatCard } from '../components/Dashboard/StatCard'
import { TaskChart } from '../components/Dashboard/TaskChart'
import { DonutChart } from '../components/Dashboard/DonutChart'
import { ActivityFeed } from '../components/Dashboard/ActivityFeed'
import { AvatarUpload } from '../components/AvatarUpload'

import { Link, useNavigate } from 'react-router-dom'
import { RealtimeIndicator } from '../components/RealtimeIndicator'
import { useRealtimeTasks } from '../hooks/useRealtimeTasks'
import { usePresence } from '../hooks/usePresence'
import { useAuthContext } from '../context/AuthContext'

export function Dashboard() {

  const { conectado } = useRealtimeTasks()
  const { onlineUsers } = usePresence("tareas")
  const { signOut } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate("/login")
  }

  const {
    stats,
    activity,
    distribution,
    recentFeed,
    loading,
    lastUpdated,
    refresh
  } = useDashboard()

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg,#fbc2eb,#a6c1ee)",
          fontFamily: "Segoe UI, sans-serif"
        }}
      >
        ⏳ Cargando dashboard...
      </div>
    )
  }

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

          <h2 style={{ color:"#ec4899", marginBottom:"2rem" }}>
            📊 Panel
          </h2>

          <nav
            style={{
              display:"flex",
              flexDirection:"column",
              gap:"1rem",
              fontWeight:600
            }}
          >

            <Link to="/" style={{textDecoration:"none",color:"#374151"}}>
              📝 Mis tareas
            </Link>

            <Link to="/dashboard" style={{textDecoration:"none",color:"#ec4899"}}>
              Dashboard
            </Link>

          </nav>

        </div>


        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>

          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>

            <RealtimeIndicator conectado={conectado} />

            <span style={{fontSize:"0.85rem",color:"#6b7280"}}>
              {onlineUsers.length} online
            </span>

          </div>

          <button
            onClick={handleLogout}
            style={{
              border:"none",
              padding:"10px",
              borderRadius:"10px",
              background:"#ec4899",
              color:"white",
              fontWeight:600,
              cursor:"pointer"
            }}
          >
            Cerrar sesión
          </button>

        </div>

      </aside>


      {/* MAIN */}

      <main style={{padding:"2.5rem"}}>

        {/* HEADER */}

        <div
          style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            marginBottom:"40px"
          }}
        >

          <div>

            <h1
              style={{
                margin:0,
                fontSize:"32px",
                color:"#ec4899"
              }}
            >
              Dashboard
            </h1>

            {lastUpdated && (

              <p
                style={{
                  marginTop:"6px",
                  fontSize:"13px",
                  color:"#6b7280"
                }}
              >
                Actualizado {lastUpdated.toLocaleTimeString('es-CO')}
                <span style={{color:"#22c55e"}}> • realtime</span>
              </p>

            )}

          </div>


          <div style={{display:"flex",alignItems:"center",gap:"16px"}}>

            <AvatarUpload />

            <button
              onClick={refresh}
              style={{
                background:"#ec4899",
                color:"white",
                border:"none",
                padding:"10px 18px",
                borderRadius:"10px",
                cursor:"pointer",
                fontWeight:"600"
              }}
            >
              🔄 Actualizar
            </button>

          </div>

        </div>


        {/* KPI CARDS */}

        {stats && (

          <div
            style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
              gap:"20px",
              marginBottom:"40px"
            }}
          >

            <StatCard titulo="Total tareas" valor={stats.total} icono="📋" color="#ec4899" subtitulo="Registradas" />
            <StatCard titulo="Completadas" valor={stats.completadas} icono="✅" color="#22c55e" subtitulo={`${stats.porcentaje}% progreso`} />
            <StatCard titulo="Pendientes" valor={stats.pendientes} icono="⏳" color="#f59e0b" subtitulo="Por completar" />
            <StatCard titulo="Hoy" valor={stats.creadasHoy} icono="📅" color="#8b5cf6" subtitulo="Nuevas hoy" />

          </div>

        )}


        {/* PROGRESS BAR */}

        {stats && (

          <div
            style={{
              background:"#fdf2f8",
              padding:"20px",
              borderRadius:"14px",
              marginBottom:"40px"
            }}
          >

            <div
              style={{
                display:"flex",
                justifyContent:"space-between",
                marginBottom:"10px"
              }}
            >
              <span>Progreso global</span>
              <span>{stats.porcentaje}%</span>
            </div>

            <div
              style={{
                height:"12px",
                background:"#f1f5f9",
                borderRadius:"999px"
              }}
            >

              <div
                style={{
                  width:`${stats.porcentaje}%`,
                  height:"100%",
                  borderRadius:"999px",
                  background:"linear-gradient(90deg,#f472b6,#ec4899)",
                  transition:"width 0.8s"
                }}
              />

            </div>

          </div>

        )}


        {/* CHARTS */}

        <div
          style={{
            display:"grid",
            gridTemplateColumns:"2fr 1fr",
            gap:"24px",
            marginBottom:"40px"
          }}
        >

          <div style={{background:"#f9fafb",padding:"20px",borderRadius:"14px"}}>
            <TaskChart data={activity} />
          </div>

          <div style={{background:"#f9fafb",padding:"20px",borderRadius:"14px"}}>
            <DonutChart data={distribution} />
          </div>

        </div>


        {/* ACTIVITY */}

        <div style={{background:"#f9fafb",padding:"20px",borderRadius:"14px"}}>
          <ActivityFeed tareas={recentFeed} />
        </div>

      </main>

    </div>

  )
}