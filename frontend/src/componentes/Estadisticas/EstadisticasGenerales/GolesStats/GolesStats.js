import { Link } from "react-router-dom"

export const GolesStats = ({listaFiltrada}) => {


    console.log(listaFiltrada)
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
                    <div className='w-5'>G</div>
                    <div className='w-5'>A</div>
                    <div className='w-5'>Min/Gol</div>
                    <div className='w-5'>Disp</div>
                    <div className='w-5'>TaP</div>
                    <div className='w-5'>Punt</div>
                    <div className='w-5'>%Gol</div>
                    <div className='w-5'>XG</div>
                    <div className='w-5'>XA</div>
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
                    <div className='w-5'>{j.goles}</div>
                    <div className='w-5'>{j.asistencias}</div>
                    <div className='w-5'>{isNaN(parseInt(j.minutos / j.goles)) ? "-" : parseInt(j.minutos / j.goles)}</div>
                    <div className='w-5'>{j.disparos}</div>
                    <div className='w-5'>{j.tirosPuerta}</div>
                    <div className='w-5'>{isNaN(parseFloat(j.tirosPuerta / j.disparos * 100).toFixed(1)) ? "-" : parseFloat(j.tirosPuerta / j.disparos * 100).toFixed(1)}%</div>
                    <div className='w-5'>{isNaN(parseFloat(j.goles / j.disparos * 100).toFixed(1)) ? "-" : parseFloat(j.goles / j.disparos * 100).toFixed(1)}%</div>
                    <div className='w-5'>{j.xg.toFixed(2)}</div>
                    <div className='w-5'>{j.xa.toFixed(2)}</div>
                </Link>
            ))}
        </>
    )
}