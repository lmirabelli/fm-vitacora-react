import { SubMenu } from "../EstadisticasEspecifica/SubMenu/SubMenu"
import { useEffect } from "react";
import { useDatabaseList } from "../../../services/conexion";
import "./EstadisticasPenales.css"
import { Link } from "react-router-dom";


export const EstadisticasPenales = () => {

    useEffect(() => {
                    document.title = "PENALES";
            
                    return () => {
                        document.title = "FM VITACORA";
                    };
                }, []);
        
                    const { data, loading, error } = useDatabaseList(
                    "http://localhost:4001/estadisticas/penales"
                );
            
                if (loading) {
                    return <div className='aviso'>cargando...</div>;
                }
                if (error) {
                    return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                }
                let { tabla, tablaArqueros, lista } = data
                console.log(data)

                const asignarColores = (final) => {
                    let colores = {background: '#303030', color: '#909090'}
                    final === "convertido" && (colores = {background: '#083003', color: "#0dc113"})
                    final !== "convertido" && (colores = {background: '#670000', color: "#ef0d0d"})

                    return colores
                }
    return(
        <div className="standard">
            <SubMenu />
            <h2>PENALES</h2>
            <div className="listado">
                {lista.map((pk, idx) => (
                    <Link to={`/partidos/${pk.fechaDecimal}`} className={`penal`} key={idx} style={asignarColores(pk.final)}>
                        <div className="w-5">{idx + 1}</div>
                        <div className="w-5"><img src={pk.escudo} alt="mi escudo" /></div>
                        <div className="w-15">{`${pk.fecha}`}</div>
                        <div className="w-20">{`${pk.pateador}`}</div>
                        <div className="w-5"><img src={pk.escudoRival} alt="mi escudo" /></div>
                        <div className="w-15">{`${pk.rival}`}</div>
                        <div className="w-20">{`${pk.arqueroRival}`}</div>
                        <div className="w-15">{`${pk.momentum}`}</div>
                    </Link>
                ))}
            </div>
            <div className="tabla-penales">
                <div className="tablilla">
                    <h3>Pateadores</h3>
                        <div className="jugador">
                            <div className="w-5"></div>
                            <div className="w-50">Pateador</div>
                            <div className="w-10">Total</div>
                            <div className="w-10">✔</div>
                            <div className="w-10">✘</div>
                            <div className="w-15">Efect.</div>
                        </div>
                    {tabla.map((j, idx) => (
                        <Link to={`/jugadores/${j.id}`} className="jugador" key={idx}>
                            <div className="w-5">{idx + 1}</div>
                            <div className="w-50">{j.pateador}</div>
                            <div className="w-10">{j.convertido + j.fallado}</div>
                            <div className="w-10">{j.convertido}</div>
                            <div className="w-10">{j.fallado}</div>
                            <div className="w-15">{(j.convertido / (j.fallado + j.convertido) * 100).toFixed(1)}%</div>
                        </Link>
                    ))}
                </div>
                <div className="tablilla">
                    <h3>Arqueros</h3>
                        <div className="jugador">
                            <div className="w-5"></div>
                            <div className="w-50">Pateador</div>
                            <div className="w-10">Total</div>
                            <div className="w-10">✔</div>
                            <div className="w-10">✘</div>
                            <div className="w-15">Efect.</div>
                        </div>
                    {tablaArqueros.map((j, idx) => (
                        <div to={`/jugadores/${j.id}`} className="jugador" key={idx}>
                            <div className="w-5">{idx + 1}</div>
                            <div className="w-50">{j.arquero}</div>
                            <div className="w-10">{j.convertido + j.fallado}</div>
                            <div className="w-10">{j.convertido}</div>
                            <div className="w-10">{j.fallado}</div>
                            <div className="w-15">{(j.convertido / (j.fallado + j.convertido) * 100).toFixed(1)}%</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}