import { Link } from 'react-router-dom'
import './OtrosPartidos.css'
export const OtrosPartidos = ({partido}) => {

    const resultado = (gf,gc) => {
        return parseInt(gf) > parseInt(gc) ? "victoria" : parseInt(gf) < parseInt(gc) ? "derrota" : "empate"

    }
    return(
        <Link to={`/partidos/${partido.fechaDecimal}`} className={`otro-partido ${resultado(partido.golesFavor,partido.golesContra)}`}>
            <div className='escudo'>
                <img src={partido.escudo.escudo} alt={partido.rival} />
            </div>
            <h4 className='fecha'>{partido.fecha}</h4>
            <h4 className='resultado'>{partido.golesFavor}-{partido.golesContra}</h4>
            <h6 className='competicion'>{partido.competicion}</h6>
        </Link>
    )
}