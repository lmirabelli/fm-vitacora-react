import { useParams, Link } from "react-router-dom"
import { useDatabaseList } from "../../../services/conexion";
import './PlantelIndividual.css'
import { Graficos } from "./Graficos/Graficos";
import { Competicion } from "./Competicion/Competicion";


export const PlantelIndividual = () => {

    let {temporada,equipo} = useParams()

    document.title = `${temporada} - ${equipo}`;
    
        const { data, loading, error } = useDatabaseList(
            `http://localhost:4001/planteles/${temporada}/${equipo}`,
        );
    
        if (loading) {
            return <div className="aviso">cargando...</div>;
        }
        if (error) {
            return (
                <div className="aviso">
                    Error al cargar los datos: {error.message}
                </div>
            );
        }
        let { plantel, competiciones } = data;

        let info = { minutos: 0, partidos: 0, goles: 0, asistencias: 0, minutosS22: 0, partidosS22: 0, golesS22: 0, asistenciasS22: 0 , minutosS19: 0, partidosS19: 0, golesS19: 0, asistenciasS19: 0 }

        plantel.jugadores.sort((a,b) => b.minutos - a.minutos)
        let numeroJugador = 0

        plantel.jugadores.forEach( j => {
            if(numeroJugador === 16){
                info.minutosT16 = info.minutos
                info.golesT16 = info.goles
                info.asistenciasT16 = info.asistencias
                info.partidosT16 = info.partidos
            }else if(numeroJugador === 22){
                info.minutosT22 = info.minutos
                info.golesT22 = info.goles
                info.asistenciasT22 = info.asistencias
                info.partidosT22 = info.partidos
            }

            if(j.edad < 22){
                info.minutosS22 += j.minutos
                info.partidosS22 += j.pj
                info.golesS22 += j.goles
                info.asistenciasS22 += j.asistencias
            }else if(j.edad < 19){
                info.minutosS19 += j.minutos
                info.partidosS19 += j.pj
                info.golesS19 += j.goles
                info.asistenciasS19 += j.asistencias
            }
            j.posicionMinutos = numeroJugador + 1
            j.rol = numeroJugador < 16 ? "t16" : numeroJugador < 22 ? "t22" : ""
            info.minutos += j.minutos
            info.partidos += j.pj
            info.goles += j.goles
            info.asistencias += j.asistencias

            numeroJugador++
        })

        const plantelDorsales = [...plantel.jugadores].sort((a,b) => a.dorsal - b.dorsal)
        competiciones.sort((a,b) => b.pj - a.pj)
    return(
        <div className="standard">
            <Graficos info={info} titulo={"Top 16 - Top 22"} dataA={"T22"} dataB={"T16"}/>
            <Graficos info={info} titulo={"Edades"} dataA={"S19"} dataB={"S22"}/>
            <div className="container-tablas">
                <div className="plantel" style={{background: `${plantel.escudo.colorPrimario}22`}}>
                    <div className="titulo" style={{color: `${plantel.escudo.colorSecundario}`}}>
                        <div className="w-3 tcenter"></div>
                        <div className="w-20">Jugador</div>
                        <div className="w-10 tcenter">POS</div>
                        <div className="w-5 tcenter">PJ</div>
                        <div className="w-5 tcenter">MIN</div>
                        <div className="w-5 tcenter">MIN/PJ</div>
                        <div className="w-5 tcenter">G</div>
                        <div className="w-5 tcenter">MIN/G</div>
                        <div className="w-5 tcenter">A</div>
                        <div className="w-5 tcenter">XG</div>
                        <div className="w-5 tcenter">XA</div>
                        <div className="w-5 tcenter">XGE</div>
                    </div>
                    {plantelDorsales.map((j,idx) => (
                        <Link to={`/jugadores/${j.id}`} className="jugador" key={idx} style={{color: `${plantel.escudo.colorSecundario}`}}>
                            <div className="w-3 tcenter">{j.dorsal}</div>
                            <div className="w-20">
                                <div className={`${j.rol}`}>{j.rol}</div>
                                {j.jugador}<img src={j.bandera} alt="nacionalidad" className="bandera" />
                                <div className={`pos-minutos pm${j.posicionMinutos}`} style={j.posicionMinutos < 4 ? {display: "block"} : {display: "none"}}>{j.posicionMinutos}</div>
                            </div>
                            <div className="w-10 tcenter">{j.posicion}</div>
                            <div className="w-5 tcenter">{j.pj > 0 ? j.pj : "-"}</div>
                            <div className="w-5 tcenter">{j.minutos > 0 ? j.minutos : "-"}</div>
                            <div className="w-5 tcenter">{j.pj > 0 ? (j.minutos / j.pj).toFixed(0) : "-"}</div>
                            <div className="w-5 tcenter">{j.goles > 0 ? j.goles : "-"}</div>
                            <div className="w-5 tcenter">{j.goles > 0 ? (j.minutos / j.goles).toFixed(0) : "-"}</div>
                            <div className="w-5 tcenter">{j.asistencias > 0 ? j.asistencias : "-"}</div>
                            <div className="w-5 tcenter">{j.xg > 0 ? j.xg : "-"}</div>
                            <div className="w-5 tcenter">{j.xa > 0 ? j.xa : "-"}</div>
                            <div className="w-5 tcenter">{j.xge !== 0 ? j.xge : "-"}</div>
                        </Link>
                    ))}
            </div>
            <div className="tablas-top5">
                <div className="temporada">
                    <div className="escudo">
                        <img src={plantel.escudo.escudo} alt="escudo" />
                    </div>
                    <div className="data">
                        <h4>{plantel.equipo.slice(0,-6)}</h4>
                        <hr style={{opacity: 0.15}}/>
                        <h4>{plantel.temporada}</h4>
                    </div>
                </div>
                {competiciones.map((i,idx) => (
                    <Competicion competicion={i} key={idx} />
                ))}
            </div>
            </div>
        </div>
    )
}