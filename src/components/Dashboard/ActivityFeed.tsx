// src/components/Dashboard/ActivityFeed.tsx

import type { Tarea } from "../../types/database"

export function ActivityFeed({ tareas }: { tareas: Tarea[] }) {

  const fmt = (d: string) =>
    new Date(d).toLocaleString("es-CO", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    })

  return (

    <div
      style={{
        background: "#fff0f6",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
        border: "1px solid #fbcfe8"
      }}
    >

      <h3
        style={{
          margin: "0 0 18px",
          fontSize: "16px",
          fontWeight: 700,
          color: "#be185d"
        }}
      >
        🕘 Actividad reciente
      </h3>

      {tareas.length === 0 ? (

        <p
          style={{
            color: "#9d174d",
            fontSize: "14px"
          }}
        >
          No hay actividad todavía
        </p>

      ) : (

        tareas.map((t) => (

          <div
            key={t.id}
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              padding: "10px 12px",
              marginBottom: "10px",
              borderRadius: "12px",
              background: "#ffffff",
              border: `2px solid ${
                t.completada ? "#86efac" : "#f9a8d4"
              }`,
              transition: "all 0.2s"
            }}
          >

            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                background: t.completada ? "#dcfce7" : "#ffe4e6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px"
              }}
            >
              {t.completada ? "✔" : "⏳"}
            </div>

            <div style={{ flex: 1, overflow: "hidden" }}>

              <p
                style={{
                  margin: 0,
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#1f2937",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {t.titulo}
              </p>

              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#6b7280"
                }}
              >
                {fmt(t.created_at as unknown as string)}
              </p>

            </div>

          </div>

        ))

      )}

    </div>

  )

}