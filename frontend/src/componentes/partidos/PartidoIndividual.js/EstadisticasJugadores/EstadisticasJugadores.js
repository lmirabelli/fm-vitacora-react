import { Link } from "react-router-dom"
import './EstadisticasJugadores.css'


export const EstadisticasJugadores = ({lista, rival}) => {

    
    return(
        <div className="estadisticas-jugadores">
            <h3>Estadisticas vs {rival}</h3>
                <div className="jugador-titulo">
                    <div className="w-5"></div>
                    <div className="w-5"></div>
                    <div className="w-25">Jugador</div>
                    <div className="w-25">Periodo</div>
                    <div className="w-10">PJ</div>
                    <div className="w-10">G</div>
                    <div className="w-10">A</div>
                    <div className="w-10">prom</div>
                </div>
            {lista.map((j,idx) => (
                <Link to={`/jugadores/${j.id}`} key={idx} className="jugador">
                    <div className="w-5">{idx + 1}</div>
                    <div className="w-5"><img src={j.bandera} alt="bandera" /></div>
                    <div className="w-25">{j.nombre}</div>
                    <div className="w-25">{`${j.llegada}-${j.salida === "0000" ? "Act." : j.salida} ${j.cantidadEtapas > 1 ? `(${j.cantidadEtapas})` : ""}`}</div>
                    <div className="w-10">{j.pj}</div>
                    <div className="w-10">{j.goles}</div>
                    <div className="w-10">{j.asistencias}</div>
                    <div className="w-10">{parseInt(j.promedio)}</div>
                </Link>
            ))}
        </div>
    )
}