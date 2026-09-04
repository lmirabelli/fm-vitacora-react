import { Link } from "react-router-dom"

export const DistribucionStats = ({listaFiltrada}) => {


    let pasesCompletados = 0
    let pasesIntentados = 0
    let centrosCompletados = 0
    let centrosIntentados = 0
    let minutos = 0

    listaFiltrada.forEach(j => {
        pasesCompletados += j.pasesCompletados
        pasesIntentados += j.pasesIntentados
        minutos += j.minutos
        centrosCompletados += j.centrosCompletados
        centrosIntentados += j.centrosIntentados
    });

    return(
        <>
                <span className="promedio-stats">Efectividad en pases: {(pasesCompletados / pasesIntentados * 100).toFixed(2)}%</span>
                <span className="promedio-stats">Pases en 90 Minutos: {parseInt(pasesCompletados / minutos * 90)} x jugador</span>
                <span className="promedio-stats">Efectividad en centros: {(centrosCompletados / centrosIntentados * 100).toFixed(2)}%</span>
                
                <div className={`jugador-stats`}>
                    <div className='w-5'></div>
                    <div className='w-5'></div>
                    <div className='w-15'>jugador</div>
                    <div className='w-5'>posicion</div>
                    <div className='w-10'>equipos</div>
                    <div className='w-5' title="temporadas en el club">temp</div>
                    <div className='w-5' title="partidos jugados">PJ</div>
                    <div className='w-5' title="minutos jugados">Min</div>
                    <div className='w-5' title="Pases Completados">PComp</div>
                    <div className='w-5' title="Pases Intentados">PInt</div>
                    <div className='w-5' title="Efectividad en Pases">%</div>
                    <div className='w-5' title="Pases en 90 Minutos">PC/90</div>
                    <div className='w-5' title="Pases Claves">PClv</div>
                    <div className='w-5' title="Pases Progresivos">PPrg</div>
                    <div className='w-5' title="Asistencias">A</div>
                    <div className='w-5' title="Centros Completados">CComp</div>
                    <div className='w-5' title="Efectividad en Centros">%</div>
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
                    <div className='w-5'>{j.pasesCompletados}</div>
                    <div className='w-5'>{j.pasesIntentados}</div>
                    <div className='w-5'>{j.pasesCompletados === 0 ? "-" : (j.pasesCompletados / j.pasesIntentados * 100).toFixed(1)}%</div>
                    <div className='w-5'>{j.pasesCompletados === 0 ? "-" : parseInt(j.pasesCompletados / j.minutos * 90)}</div>
                    <div className='w-5'>{j.pasesClaves}</div>
                    <div className='w-5'>{j.pasesProgresivos}</div>
                    <div className='w-5'>{j.asistencias}</div>
                    <div className='w-5'>{j.centrosCompletados}</div>
                    <div className='w-5'>{isNaN(parseInt(j.centrosCompletados / j.centrosIntentados)) ? "-" : (parseFloat(j.centrosCompletados / j.centrosIntentados * 100)).toFixed(1)}%</div>
                </Link>
            ))}
        </>)
}