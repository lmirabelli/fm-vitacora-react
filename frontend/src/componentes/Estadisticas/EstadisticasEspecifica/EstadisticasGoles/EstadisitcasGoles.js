import { Link } from "react-router-dom"

export const EstadisticasGoles = ({tablaFiltrada}) => {


    return(
        <>
            <div className="titulo-tabla">
                <div className="w-5" title="Posicion"></div>
                <div className="w-5" title="Nacionalidad"></div>
                <div className="w-20">Jugador</div>
                <div className="w-5" title="Posicion en cancha">POS</div>
                <div className="w-5" title="PartidosJugados">PJ</div>
                <div className="w-5" title="Minutos">Min</div>
                <div className="w-5" title="Goles">G</div>
                <div className="w-5" title="Asistencias">A</div>
                <div className="w-5" title="Influencias">I</div>
                <div className="w-5" title="Tiros a puerta">TAP</div>
                <div className="w-5" title="Disparos">DISP</div>
                <div className="w-5" title="Punteria">Punt</div>
                <div className="w-5" title="Efectividad de gol">%G</div>
                <div className="w-5" title="Minutos x gol">M/G</div>
                <div className="w-5" title="Goles esperados">XG</div>
                <div className="w-5" title="Asistencias esperadas">XA</div>
                <div className="w-5" title="Influencias esperadas">XI</div>
            </div>
            {tablaFiltrada.map((j,idx) => (
                <Link to={`/jugadores/${j.id}`} className="puesto-tabla" key={idx}>
                    <div className="w-5">{idx+1}</div>
                    <div className="w-5"><img src={j.nacionalidad} alt="bandera" className="bandera"/></div>
                    <div className="w-20" title={j.temporadas.map((t) => (t))}>
                        {j.escudos.map((i, idx2) => (<img src={i} alt="escudo" key={idx2}/>))}{j.jugador}
                        {j.etapas.map((i, idx2) => (<div className="periodo" key={idx2}>{i}</div>))}
                    </div>
                    <div className="w-5">{j.posicion}</div>
                    <div className="w-5">{j.partidos}</div>
                    <div className="w-5">{j.minutos}</div>
                    <div className="w-5">{j.goles}</div>
                    <div className="w-5">{j.asistencias}</div>
                    <div className="w-5">{j.goles + j.asistencias}</div>
                    <div className="w-5">{j.tirosPuerta}</div>
                    <div className="w-5">{j.disparos}</div>
                    <div className="w-5">{(j.tirosPuerta / j.disparos * 100).toFixed(1)}%</div>
                    <div className="w-5">{(j.goles / j.disparos * 100).toFixed(1)}%</div>
                    <div className="w-5">{j.minutosxgol}</div>
                    <div className="w-5">{j.xg.toFixed(2)}</div>
                    <div className="w-5">{j.xa.toFixed(2)}</div>
                    <div className="w-5">{(j.xg + j.xa).toFixed(2)}</div>
                </Link>
            ))}
        </>
    )
}