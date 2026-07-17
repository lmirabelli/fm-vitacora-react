import { Link } from 'react-router-dom'
import './OtrosPartidos.css'
export const OtrosPartidos = ({partido}) => {

    const colorear = (gf,gc) => {
        let fondo = "#dcdc0960"
        parseInt(gf) < parseInt(gc) && (fondo = "#a7170760"); 
        parseInt(gf) > parseInt(gc) && (fondo = "#21961460"); 

        return fondo
    }
    return(
        <Link to={`/partidos/${partido.fechaDecimal}`} className={`otro-partido`} style={{background: colorear(partido.golesFavor,partido.golesContra)}}>
            <div className='escudo'>
                <img src={partido.escudo.escudo} alt={partido.rival} />
            </div>
            <h4 className='fecha'>{partido.fecha}</h4>
            <h4 className='resultado'>{partido.golesFavor}-{partido.golesContra}</h4>
            <h6 className='competicion'>{partido.competicion}</h6>
        </Link>
    )
}