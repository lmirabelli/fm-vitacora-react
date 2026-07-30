import { Link, useLocation } from "react-router-dom"
import './CampeonIndividual.css'


export const CampeonIdividual = () => {

    console.log(useLocation().state)

    const datos = useLocation().state
    const backColor = `${datos.escudo.colorPrimario}50`
    const backColor2 = `${datos.escudo.colorSecundario}30`
    const fntColor = datos.escudo.colorSecundario
    const fntColor2 = datos.escudo.colorPrimario

    return(
        <div className="standard">
            <div className="contenedor-info" style={{background: backColor, color: fntColor}}>
                <h2>{datos.competicion}</h2>
                <h6>{datos.temporada} - {datos.equipo} <img src={datos.escudo.escudo} alt="escudo" /></h6>
            </div>
            <div className="contenedor-info">
                <div className="lista-jugadores-campeones">
                        <div className="linea" style={{background: backColor2, color: fntColor2}}>
                            <div className="w-10" title="Dorsal"></div>
                            <div className="w-10" title="Nacionalidad"></div>
                            <div className="w-40" title="Jugador">jugador</div>
                            <div className="w-10" title="Edad">edad</div>
                            <div className="w-10" title="Partidos Jugados">PJ</div>
                            <div className="w-10" title="Goles">G</div>
                            <div className="w-10" title="Asistencias">A</div>
                        </div>
                    {datos.jugadores.map((j, idx) => (
                        <Link to={`/jugadores/${j.id}`} className="linea" key={idx} style={{background: backColor, color: fntColor}}>
                            <div className="w-10">{j.dorsal}</div>
                            <div className="w-10">{<img src={j.bandera} alt="bandera" className="bandera" />}</div>
                            <div className="w-40">{j.jugador}</div>
                            <div className="w-10">{parseInt(j.edad)}</div>
                            <div className="w-10">{parseInt(j.partidos)}</div>
                            <div className="w-10">{parseInt(j.goles)}</div>
                            <div className="w-10">{parseInt(j.asistencias)}</div>
                        </Link>
                    ))}
                </div>
                <div className="lista-partidos-campeones">
                    <div className="linea" style={{background: '#0593e450', color: '#092133'}}>
                        <div className="w-10" title="Numero de Partido"></div>
                        <div className="w-25" title="fecha">Fecha</div>
                        <div className="w-40" title="Rival">Rival</div>
                        <div className="w-25" title="Resultado">Result.</div>
                    </div>
                    {datos.partidos.map((p,idx) => (
                        <Link to={`/partidos/${p.id}`} key={idx} className="linea" style={{background: '#ffffff50', color: '#054582'}}>
                            <div className="w-10" >{idx+1}</div>
                            <div className="w-25" >{p.fecha}</div>
                            <div className="w-40" >{p.rival}</div>
                            <div className="w-25" >{p.resultado}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}