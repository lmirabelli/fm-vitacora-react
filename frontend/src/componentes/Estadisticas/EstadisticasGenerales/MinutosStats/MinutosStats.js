import { Link } from "react-router-dom"

export const MinutosStats = ({listaFiltrada}) => {


    return(
        <>
                <div className={`jugador-stats`}>
                    <div className='w-5'></div>
                    <div className='w-5'></div>
                    <div className='w-15'>jugador</div>
                    <div className='w-5'>posicion</div>
                    <div className='w-10'>equipos</div>
                    <div className='w-5' title="temporadas en el club">temp</div>
                    <div className='w-5' title="minutos jugados">Min</div>
                    <div className='w-5' title="partidos jugados">PJ</div>
                    <div className='w-5' title="promedio de minutos por partido">Min/PJ</div>
                    <div className='w-5' title="goles">G</div>
                    <div className='w-5' title="promedio de minutos por gol">Min/Gol</div>
                    <div className='w-5' title="asistencias">A</div>
                    <div className='w-5' title="mejor jugador del partido">MVP</div>
                    <div className='w-5' title="distancia recorrida">Dist.</div>
                    <div className='w-5' title="promedio de distancia x 90 minutos">Dist/90</div>
                    <div className='w-5' title="porcentaje de partidos de titular">%Tit</div>
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
                    <div className='w-5'>{isNaN(parseInt(j.minutos / j.partidos)) ? "-" : parseInt(j.minutos / j.partidos)}</div>
                    <div className='w-5'>{j.goles}</div>
                    <div className='w-5'>{isNaN(parseInt(j.minutos / j.goles)) ? "-" : parseInt(j.minutos / j.goles)}</div>
                    <div className='w-5'>{j.asistencias}</div>
                    <div className='w-5'>{j.jugadorDelPartido}</div>
                    <div className='w-5'>{j.distancia.toFixed(0)}</div>
                    <div className='w-5'>{isNaN(parseInt(j.distancia / j.minutos)) ? "-" : parseFloat(j.distancia / j.minutos * 90).toFixed(1)} Km.</div>
                    <div className='w-5'>{isNaN(parseInt(j.titular / j.partidos)) ? "-" : (parseFloat(j.titular / j.partidos * 100)).toFixed(1)}%</div>
                </Link>
            ))}
        </>)
}