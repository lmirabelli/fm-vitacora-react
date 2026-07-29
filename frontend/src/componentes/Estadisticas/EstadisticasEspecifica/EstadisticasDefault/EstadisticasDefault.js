import { Link } from "react-router-dom"

export const EstadisticasDefault = ({tablaFiltrada,tipoTabla}) => {


    return(
        <>
            <div className="titulo-tabla">
                <div className="w-5"></div>
                <div className="w-5"></div>
                <div className="w-20">Jugador</div>
                <div className="w-5">PJ</div>
                <div className="w-5">Min</div>
                <div className="w-5">G</div>
                <div className="w-5">A</div>
                <div className="w-5">TAP</div>
                <div className="w-5">PUNT</div>
                <div className="w-5">% G</div>
                <div className="w-5">PASES</div>
                <div className="w-5">% P</div>
                <div className="w-5">FC</div>
                <div className="w-5">TA</div>
                <div className="w-5">TR</div>
                <div className="w-5">MxP</div>
                <div className="w-5">MVP</div>
            </div>
            {tablaFiltrada.map((j,idx) => (
                <Link to={`/jugadores/${j.id}`} className="puesto-tabla" key={idx}>
                    <div className="w-5">{idx+1}</div>
                    <div className="w-5"><img src={j.nacionalidad} alt="bandera" className="bandera"/></div>
                    <div className="w-20">
                        {j.escudos.map((i, idx2) => (<img src={i} alt="escudo" key={idx2}/>))}
                        {j.jugador}
                        {j.etapas.map((i, idx2) => (<div className="periodo" key={idx2}>{i}</div>))}
                    </div>
                    <div className="w-5">{j.partidos}</div>
                    <div className="w-5">{j.minutos}</div>
                    <div className="w-5">{j.goles}</div>
                    <div className="w-5">{j.asistencias}</div>
                    <div className="w-5">{j.tirosPuerta}</div>
                    <div className="w-5">{isNaN(j.punteria) ? "-" : j.punteria}%</div>
                    <div className="w-5">{isNaN(j.efectividadGoles) ? "-" : j.efectividadGoles}%</div>
                    <div className="w-5">{j.pasesIntentados}</div>
                    <div className="w-5">{isNaN(j.efectividadPases) ? "-" : j.efectividadPases}%</div>
                    <div className="w-5">{j.faltasCometidas}</div>
                    <div className="w-5">{j.tarjetaAmarilla}</div>
                    <div className="w-5">{j.tarjetasRojas}</div>
                    <div className="w-5">{j.minutosxpartido}</div>
                    <div className="w-5">{j.jugadorDelPartido}</div>
                </Link>
            ))}
        </>
    )
}