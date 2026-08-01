import { Link } from "react-router-dom"

export const EstadisticasTerminator = ({tablaFiltrada}) => {


    console.log(tablaFiltrada)
    return(
        <>
            <div className="titulo-tabla">
                <div className="w-5" title="Posicion"></div>
                <div className="w-5" title="Nacionalidad"></div>
                <div className="w-20">Jugador</div>
                <div className="w-5" title="Posicion en cancha">POS</div>
                <div className="w-5" title="PartidosJugados">PJ</div>
                <div className="w-5" title="Minutos">Min</div>
                <div className="w-5" title="Faltas Cometidas">FC</div>
                <div className="w-5" title="Tarjetas Amarillas">TA</div>
                <div className="w-5" title="Tarjetas Rojas">TR</div>
                <div className="w-5" title="Minutos x Faltas Cometidas">Min/FC</div>
                <div className="w-5" title="Minutos x tarjeta amarilla">Min/TA</div>
                <div className="w-5" title="Minutos x tarjeta Roja">Min/TR</div>
                <div className="w-5" title="Faltas Cometidas x Tarjeta Amarilla">FC/TA</div>
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
                    <div className="w-5">{j.faltasCometidas}</div>
                    <div className="w-5">{j.tarjetaAmarilla}</div>
                    <div className="w-5">{j.tarjetasRojas}</div>
                    <div className="w-5">{isNaN(parseInt(j.minutos / j.faltasCometidas)) ? "-" : parseInt(j.minutos / j.faltasCometidas)}</div>
                    <div className="w-5">{isNaN(parseInt(j.minutos / j.tarjetaAmarilla)) ? "-" : parseInt(j.minutos / j.tarjetaAmarilla)}</div>
                    <div className="w-5">{isNaN(parseInt(j.minutos / j.tarjetasRojas)) ? "-" : parseInt(j.minutos / j.tarjetasRojas)}</div>
                    <div className="w-5">{isNaN(parseInt(j.faltasCometidas / j.tarjetaAmarilla)) ? "-" : parseInt(j.faltasCometidas / j.tarjetaAmarilla)}</div>
                </Link>
            ))}
        </>
    )
}