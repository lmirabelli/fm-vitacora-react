import { Link } from "react-router-dom"

export const PartidosStats = ({listaFiltrada}) => {


    return(
        <>
                <div className={`jugador-stats`}>
                    <div className='w-5'></div>
                    <div className='w-5'></div>
                    <div className='w-15'>jugador</div>
                    <div className='w-5'>posicion</div>
                    <div className='w-10'>equipos</div>
                    <div className='w-5'>temp</div>
                    <div className='w-5'>PJ</div>
                    <div className='w-5'>Min</div>
                    <div className='w-5'>Min/PJ</div>
                    <div className='w-5'>G</div>
                    <div className='w-5'>A</div>
                    <div className='w-5'>MVP</div>
                    <div className='w-5'>TA</div>
                    <div className='w-5'>TR</div>
                    <div className='w-5'>PG</div>
                    <div className='w-5'>PE</div>
                    <div className='w-5'>PP</div>
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
                    <div className='w-5'>{j.asistencias}</div>
                    <div className='w-5'>{j.jugadorDelPartido}</div>
                    <div className='w-5'>{j.tarjetasAmarilla}</div>
                    <div className='w-5'>{j.tarjetasRojas}</div>
                    <div className='w-5'>{j.partidosGanados}</div>
                    <div className='w-5'>{j.partidosEmpatados}</div>
                    <div className='w-5'>{j.partidosPerdidos}</div>
                </Link>
            ))}
        </>
    )
}