import './Resultados.css'
import { Link, useLocation } from 'react-router-dom'

export const Resultados = () => {
    const location = useLocation()
    const resultados = location.state?.resultados || []

    return(
        <div className="standard">
            <div className='tarjetas-resultados'>
                <h2>Resultados</h2>
            {resultados.map((r, idx) => (
                <div className='card' key={idx}>
                    <h2 className='titulo-resultado'>{`${r.gf} - ${r.gc} (${r.repeticiones})`}</h2>
                    <hr />
                    {r.partidos.map((p,idx2) => (
                        <Link to={`/partidos/${p.fechaDecimal}`} key={idx2} className='w-100'>
                            {`${p.fecha} - ${p.rival}`}<img src={p.escudoRival.escudo} alt="escudo" />
                        </Link>
                    ))}
                </div>
            ))}
            </div>
        </div>
    )
}