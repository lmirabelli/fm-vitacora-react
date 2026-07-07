import './EstadisticasGeneral.css'
import { Link } from 'react-router-dom'


export const EstadisticasGeneral = ({stats,titulo}) => {

    stats.sort((a,b) =>( b[titulo] + b.minutos / 1000000) - (a[titulo] + a.minutos / 1000000 ))
    stats = stats.filter(a => a[titulo] > 0)
    
    if(stats.length > 10){
        stats = stats.slice(0,10)
    }

    return(
        <Link to={`/estadisticas/${titulo}`} className="estadistica-general">
            <h2>{titulo}</h2>
            <div className="titulo">
                    <div className="w-5"></div>
                    <div className="w-5"></div>
                    <div className="w-30">jugador</div>
                    <div className="w-10"></div>
                    <div className="w-10">PJ</div>
                    <div className="w-10">Min</div>
                    <div className="w-10">G</div>
                    <div className="w-10">A</div>
                    <div className="w-10">MVP</div>
                </div>
            {stats.map((j,idx) => (
                <div className="posicion-tabla" key={idx}>
                    <div className="w-5">{idx + 1}</div>
                    <div className="w-5"><img src={j.nacionalidad} alt="nacionalidad" className="bandera" style={{animationDelay: `${0.5 + (idx * 0.12)}s`}}/></div>
                    <div className="w-30">{j.jugador}</div>
                    <div className="w-10">
                        {j.escudos.map((eq, idx2) => (
                            <img src={eq} alt="escudo" key={{idx2}} style={{animationDelay: `${1 + (idx * 0.3) + (idx2 * 0.12)}s`}}/>
                        ))}
                    </div>
                    <div className="w-10">{j.partidos}</div>
                    <div className="w-10">{j.minutos}</div>
                    <div className="w-10">{j.goles}</div>
                    <div className="w-10">{j.asistencias}</div>
                    <div className="w-10">{j.jugadorDelPartido}</div>
                </div>
            ))}
        </Link>
    )
}