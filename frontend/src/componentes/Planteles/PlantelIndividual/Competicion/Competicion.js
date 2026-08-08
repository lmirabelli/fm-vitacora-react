import './Competicion.css'
import { Podio } from './Podio/Podio'

export const Competicion = ({competicion}) => {

    return(
        <div className="tarjeta-competicion">
            <h5>{competicion.competicion}</h5>
            <div className="stats">
                <div className="dato" title='partidos jugados'>{competicion.pj}</div>
                <div className="dato" title='partidos ganados'>{competicion.pg}</div>
                <div className="dato" title='partidos empatados'>{competicion.pe}</div>
                <div className="dato" title='partidos perdidos'>{competicion.pp}</div>
                <div className="dato" title='goles favor'>{competicion.gf}</div>
                <div className="dato" title='goles en contra'>{competicion.gc}</div>
                <div className="dato" title='diferencia'>{competicion.gf - competicion.gc >= 0 ? `+${competicion.gf - competicion.gc}` : competicion.gf - competicion.gc}</div>
            </div>
            <div className="efectividad" title='porcentaje de puntos obtenidos'>{((competicion.pg * 3 + competicion.pe) / (competicion.pj * 3) * 100).toFixed(2)}%</div>
            {competicion.jugadores.length > 0 && <Podio categoria={"Partidos"} tabla={competicion.jugadores} />}
            {competicion.goles.length > 0 && <Podio categoria={"goles"} tabla={competicion.goles} />}
            {competicion.asistencias.length > 0 && <Podio categoria={"asistencias"} tabla={competicion.asistencias} />}
        </div>
    )
}