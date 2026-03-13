interface Props {
  titulo: string
  valor: number | string
  icono: string
  color: string
  subtitulo?: string
}

export function StatCard({ titulo, valor, icono, color, subtitulo }: Props) {

  return (

    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "22px",
        border: "1px solid #f1f5f9",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        transition: "transform 0.15s ease"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >

        <span
          style={{
            fontSize: "13px",
            color: "#6b7280",
            fontWeight: 600
          }}
        >
          {titulo}
        </span>

        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: `${color}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px"
          }}
        >
          {icono}
        </div>

      </div>

      <div
        style={{
          fontSize: "34px",
          fontWeight: 800,
          color,
          lineHeight: 1
        }}
      >
        {valor}
      </div>

      {subtitulo && (

        <span
          style={{
            fontSize: "12px",
            color: "#9ca3af"
          }}
        >
          {subtitulo}
        </span>

      )}

    </div>

  )

}