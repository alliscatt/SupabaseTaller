// src/components/Dashboard/StatCard.tsx
interface Props {
  titulo:    string
  valor:     number | string
  icono:     string
  color:     string
  subtitulo?: string
}

export function StatCard({ titulo, valor, icono, color, subtitulo }: Props) {
  return (
    <div style={{ background:'white', borderLeft:`5px solid ${color}`,
      borderRadius:'12px', padding:'20px', border:'1px solid #000000ff',
      boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <span style={{ fontSize:'0.85rem', color:'#000000ff', fontWeight:600 }}>
          {titulo}
        </span>
        <span style={{ fontSize:'1.5rem' }}>{icono}</span>
      </div>
      <div style={{ fontSize:'2.5rem', fontWeight:800, color, lineHeight:1,
        margin:'0.4rem 0' }}>
        {valor}
      </div>
      {subtitulo && <span style={{ fontSize:'0.8rem', color:'#000000ff' }}>
        {subtitulo}
      </span>}
    </div>
  )
}