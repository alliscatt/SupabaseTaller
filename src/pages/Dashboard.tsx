// src/pages/Dashboard.tsx
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
    try {
      await signOut()
      navigate("/login")
    } catch (err) {
      console.error("Error cerrando sesión:", err)
    }
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
      <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100vh',
        color:'white'
      }}>
        ⏳ Cargando dashboard...
      </div>
    )
  }

  return (

    <>
    < nav
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
      </nav><div style={{
          padding: '40px',
          maxWidth: '1400px',
          margin: '0 auto',
          color: 'white'
      }}>

              {/* HEADER */}
              <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '40px'
              }}>

                  <div>
                      <h1 style={{
                          margin: 0,
                          fontSize: '32px',
                          fontWeight: '700'
                      }}>
                          📊 Dashboard
                      </h1>

                      {lastUpdated && (
                          <p style={{
                              marginTop: '6px',
                              fontSize: '13px',
                              color: '#94a3b8'
                          }}>
                              Actualizado {lastUpdated.toLocaleTimeString('es-CO')}
                              <span style={{ color: '#22c55e' }}> • realtime activo</span>
                          </p>
                      )}
                  </div>

                  <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px'
                  }}>
                      <AvatarUpload />

                      <button
                          onClick={refresh}
                          style={{
                              background: '#2563eb',
                              color: 'white',
                              border: 'none',
                              padding: '10px 18px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontWeight: '600'
                          }}
                      >
                          🔄 Actualizar
                      </button>
                  </div>

              </div>

              {/* KPIs */}
              {stats && (
                  <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
                      gap: '20px',
                      marginBottom: '40px'
                  }}>

                      <StatCard
                          titulo='Total tareas'
                          valor={stats.total}
                          icono='📋'
                          color='#3b82f6'
                          subtitulo='Registradas' />

                      <StatCard
                          titulo='Completadas'
                          valor={stats.completadas}
                          icono='✅'
                          color='#22c55e'
                          subtitulo={`${stats.porcentaje}% progreso`} />

                      <StatCard
                          titulo='Pendientes'
                          valor={stats.pendientes}
                          icono='⏳'
                          color='#f59e0b'
                          subtitulo='Por completar' />

                      <StatCard
                          titulo='Hoy'
                          valor={stats.creadasHoy}
                          icono='📅'
                          color='#8b5cf6'
                          subtitulo='Nuevas hoy' />

                  </div>
              )}

              {/* PROGRESO */}
              {stats && (
                  <div style={{
                      background: '#1e293b',
                      padding: '20px',
                      borderRadius: '12px',
                      marginBottom: '40px'
                  }}>

                      <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '10px'
                      }}>
                          <span>Progreso global</span>
                          <span>{stats.porcentaje}%</span>
                      </div>

                      <div style={{
                          height: '12px',
                          background: '#334155',
                          borderRadius: '999px'
                      }}>
                          <div style={{
                              width: `${stats.porcentaje}%`,
                              height: '100%',
                              borderRadius: '999px',
                              background: 'linear-gradient(90deg,#22c55e,#16a34a)',
                              transition: 'width 0.8s'
                          }} />
                      </div>

                  </div>
              )}

              {/* GRÁFICAS */}
              <div style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr',
                  gap: '24px',
                  marginBottom: '40px'
              }}>

                  <div style={{
                      background: '#1e293b',
                      padding: '20px',
                      borderRadius: '12px'
                  }}>
                      <TaskChart data={activity} />
                  </div>

                  <div style={{
                      background: '#1e293b',
                      padding: '20px',
                      borderRadius: '12px'
                  }}>
                      <DonutChart data={distribution} />
                  </div>

              </div>

              {/* ACTIVIDAD */}
              <div style={{
                  background: '#1e293b',
                  padding: '20px',
                  borderRadius: '12px'
              }}>
                  <ActivityFeed tareas={recentFeed} />
              </div>

          </div></>

  )
}