import { Submenu } from "../SubMenu/Submenu"
import './PrincipalCampeones.css'
import { useEffect } from "react";
import { useDatabaseList } from "../../../services/conexion";
import { Link } from "react-router-dom";
import { JugadoresCampeones } from "./JugadoresCampeones/JugadoresCampeones";


export const PrincipalCampeones = () => {

    useEffect(() => {
                document.title = "CAMPEONES";
        
                return () => {
                    document.title = "FM VITACORA";
                };
            }, []);
    
                const { data, loading, error } = useDatabaseList(
                "http://localhost:4001/campeones"
            );
        
            if (loading) {
                return <div className='aviso'>cargando...</div>;
            }
            if (error) {
                return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
            }
            let { listaDeCampeones, titulosxjugador } = data
            titulosxjugador.sort((a,b) => b.titulos - a.titulos)

    return(
        <div className="standard">
            <Submenu />
            <div className="tablero">
                <div className="temporadas">
                    {listaDeCampeones.map((c, idx) => (
                        <div className="info-campeon" key={idx} style={{background: `${c.escudo.colorPrimario}60`, "--escudo": `url(${c.escudo.escudo})`, "--color-fuente": `${c.escudo.colorSecundario}`}}>
                            <h4 style={{color: `${c.escudo.colorSecundario}`}}>{c.equipo}</h4>
                            <h6 style={{color: `${c.escudo.colorSecundario}`}}>{c.temporada} - {c.competicion}</h6>
                            <hr style={{opacity: 0.2}} />
                            <div className="jugadores">
                                <h6>Jugadores</h6>
                                <Link className="jugador" style={{marginBottom: "8px"}}>
                                    <div className="w-5"></div>
                                    <div className="w-10"></div>
                                    <div className="w-40">jugador</div>
                                    <div className="w-15">edad</div>
                                    <div className="w-10">pJ</div>
                                    <div className="w-10">g</div>
                                    <div className="w-10">a</div>
                                </Link>
                                {c.jugadores.map((j, idx2) => (
                                    <Link to={`/jugadores/${j.id}`} className="jugador" key={idx2}>
                                        <div className="w-5">{j.dorsal}</div>
                                        <div className="w-10"><img src={j.bandera} alt="nacionalidad" className="bandera"/></div>
                                        <div className="w-40">{j.jugador}</div>
                                        <div className="w-15">{parseInt(j.edad)}</div>
                                        <div className="w-10">{j.partidos}</div>
                                        <div className="w-10">{j.goles}</div>
                                        <div className="w-10">{j.asistencias}</div>
                                    </Link>
                                ))}
                                <hr style={{opacity: 0.2}} />
                            </div>
                            <div className="partidos">
                                <h6>Partidos</h6>
                                <div className="partido" style={{marginBottom: "8px"}}>
                                    <div className="w-20">fecha</div>
                                    <div className="w-35">rival</div>
                                    <div className="w-20">condicion</div>
                                    <div className="w-10">result.</div>
                                    <div className="w-15">pje.</div>
                                </div>
                                {c.partidos.map((p, idx2) => (
                                    <Link to={`/partidos/${p.id}`} className="partido" key={idx2}>
                                        <div className="w-20">{p.fecha}</div>
                                        <div className="w-35">{p.rival}</div>
                                        <div className="w-20">{p.condicion}</div>
                                        <div className="w-10">{p.resultado}</div>
                                        <div className="w-15">{p.promedio}</div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {titulosxjugador.length > 0 && <JugadoresCampeones titulosxjugador={titulosxjugador} />}
            </div>
        </div>
    )
}