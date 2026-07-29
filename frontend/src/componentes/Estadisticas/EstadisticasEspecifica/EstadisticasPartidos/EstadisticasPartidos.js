import { Link } from "react-router-dom"

export const EstadisticasPartidos = ({tablaFiltrada}) => {


    return(
        <>
            <div className="titulo-tabla">
                <div className="w-5" title="Posicion"></div>
                <div className="w-5" title="Nacionalidad"></div>
                <div className="w-20">Jugador</div>
                <div className="w-5" title="PartidosJugados">PJ</div>
                <div className="w-5" title="Minutos">Min</div>
                <div className="w-5" title="Goles">G</div>
                <div className="w-5" title="Asistencias">A</div>
                <div className="w-5" title="Disparos">DISP</div>
                <div className="w-5" title="Pases Completados">PASES</div>
                <div className="w-5" title="Faltas Recibidas">FR</div>
                <div className="w-5" title="Faltas Cometidas">FC</div>
                <div className="w-5" title="Tarjetas Amarillas">TA</div>
                <div className="w-5" title="Tarjetas Rojas">TR</div>
                <div className="w-5" title="Partidos Ganados">PG</div>
                <div className="w-5" title="Partidos Empatados">PE</div>
                <div className="w-5" title="Partidos Perdidos">PP</div>
                <div className="w-5" title="Distancia Recorrida">DIST</div>
            </div>
            {tablaFiltrada.map((j,idx) => (
                <Link to={`/jugadores/${j.id}`} className="puesto-tabla" key={idx}>
                    <div className="w-5">{idx+1}</div>
                    <div className="w-5"><img src={j.nacionalidad} alt="bandera" className="bandera"/></div>
                    <div className="w-20" title={j.temporadas.map((t) => (t))}>
                        {j.escudos.map((i, idx2) => (<img src={i} alt="escudo" key={idx2}/>))}{j.jugador}
                        {j.etapas.map((i, idx2) => (<div className="periodo" key={idx2}>{i}</div>))}
                    </div>
                    <div className="w-5">{j.partidos}</div>
                    <div className="w-5">{j.minutos}</div>
                    <div className="w-5">{j.goles}</div>
                    <div className="w-5">{j.asistencias}</div>
                    <div className="w-5">{j.disparos}</div>
                    <div className="w-5">{j.pasesCompletados}</div>
                    <div className="w-5">{j.faltasRecibidas}</div>
                    <div className="w-5">{j.faltasCometidas}</div>
                    <div className="w-5">{j.tarjetaAmarilla}</div>
                    <div className="w-5">{j.tarjetasRojas}</div>
                    <div className="w-5">{j.pg}</div>
                    <div className="w-5">{j.pe}</div>
                    <div className="w-5">{j.pp}</div>
                    <div className="w-5">{j.distancia.toFixed(1)} km.</div>
                </Link>
            ))}
        </>
    )
}