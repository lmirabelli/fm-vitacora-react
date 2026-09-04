import { Link } from "react-router-dom"

export const ArquerosStats = ({listaFiltrada}) => {


    return(
        <>
                <div className={`jugador-stats`}>
                    <div className='w-5'></div>
                    <div className='w-5'></div>
                    <div className='w-15'>jugador</div>
                    <div className='w-5'>posicion</div>
                    <div className='w-10'>equipos</div>
                    <div className='w-5' title="temporadas en el club">temp</div>
                    <div className='w-5' title="partidos jugados">PJ</div>
                    <div className='w-5' title="minutos jugados">Min</div>
                    <div className='w-5' title="Balones Atajados">BAt</div>
                    <div className='w-5' title="Balones Desviados">BDs</div>
                    <div className='w-5' title="Balones Rechazados">BRe</div>
                    <div className='w-5' title="Goles Encajados">Enc</div>
                    <div className='w-5' title="Efectividad de Arquero">%</div>
                    <div className='w-5' title="Jugador del Partido">MVP</div>
                    <div className='w-5' title="Vallas Invictas">VI</div>
                    <div className='w-5' title="Pases Completados">Pases</div>
                    <div className='w-5' title="Efectividad en Pases">%</div>
                </div>
                {listaFiltrada.map((j,idx) => (
                <Link to={`/jugadores/${j.id}`} key={idx} className={`jugador-stats ${j.situacionClub === "club" ? "club" : j.situacionClub === "fuera" ? "fuera" : "desconocido"}`}>
                    <div className='w-5'>{idx + 1}</div>
                    <div className='w-5'><img src={j.nacionalidad} alt="bandera" className='bandera'/></div>
                    <div className='w-15'>{j.jugador}</div>
                    <div className='w-5'>{j.posicion}</div>
                    <div className='w-10'>{
                        j.equipos.map((e,idx2) => (
                            <img src={e} alt="escudo" key={idx2}/>
                        ))}
                    </div>
                    <div className='w-5'>{j.temporadas}</div>
                    <div className='w-5'>{j.partidos}</div>
                    <div className='w-5'>{j.minutos}</div>
                    <div className='w-5'>{j.balonesAtajados}</div>
                    <div className='w-5'>{j.balonesDesviados}</div>
                    <div className='w-5'>{j.balonesRechazados}</div>
                    <div className='w-5'>{j.golesEncajados}</div>
                    <div className='w-5'>{((1 - (j.golesEncajados / (j.golesEncajados + j.balonesAtajados + j.balonesDesviados + j.balonesRechazados))) * 100).toFixed(1)}%</div>
                    <div className='w-5'>{j.jugadorDelPartido}</div>
                    <div className='w-5'>{j.vallaInvicta}</div>
                    <div className='w-5'>{j.pasesCompletados}</div>
                    <div className='w-5'>{isNaN(parseInt(j.pasesCompletados / j.pasesIntentados)) ? "-" : (parseFloat(j.pasesCompletados / j.pasesIntentados * 100)).toFixed(1)}%</div>
                </Link>
            ))}
        </>)
}