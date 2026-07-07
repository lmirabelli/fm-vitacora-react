import { useEffect, useState} from "react";
import { useDatabaseList } from "../../../services/conexion";
import "./Rendimientos.css"
import { SubNavBar } from "../SubNavBar/SubNavBar";

export const Rendimientos = () => {

    let [cantidadDePartidos, setCantidadDePartidos] = useState(5)
    useEffect(() => {
                            document.title = `${cantidadDePartidos} partidos`;
                    
                            return () => {
                                document.title = "FM VITACORA";
                            };
                        }, [cantidadDePartidos]);
                
                            const { data, loading, error } = useDatabaseList(
                            `http://localhost:4001/partidos/rendimientos/${cantidadDePartidos}`
                        );
                    
                        if (loading) {
                            return <div className='aviso'>cargando...</div>;
                        }
                        if (error) {
                            return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                        }
                        let { tablaRivales, listaJugadoresPuntuados } = data

                        let minimoDePartidos = 0

                        switch(true){
                            case cantidadDePartidos > 19:
                                minimoDePartidos = 5
                                break
                            case cantidadDePartidos > 11:
                                minimoDePartidos = 4
                                break
                            case cantidadDePartidos > 9:
                                minimoDePartidos = 2
                                break
                            default:
                                minimoDePartidos = 1
                        }

                        listaJugadoresPuntuados.forEach(j => {
                            
                            if(j.partidosPuntuados >= minimoDePartidos){
                                let total = 0
                                for(let pts of j.ultimosPartidos){
                                    if(!isNaN(pts)){
                                        total += pts
                                    }
                                    j.promedio = (total / j.partidosPuntuados).toFixed(1)
                                }
                            }else{
                                j.promedio = 0
                            }
                        });

                        listaJugadoresPuntuados.sort((a,b) => b.promedio - a.promedio)

                        const puntuar = (pje) => {
                            let clase
                            
                            switch(true){

                                case pje === 100:
                                    clase = "perfecto"
                                    break
                                case parseInt(pje) > 89:
                                    clase = "casi-perfecto"
                                    break
                                case parseInt(pje) > 69:
                                    clase = "aprobado"
                                    break
                                case parseInt(pje) > 65:
                                    clase = "promedio"
                                    break
                                case parseInt(pje) > 59:
                                    clase = "malo"
                                    break
                                case parseInt(pje) > 0:
                                    clase = "muy-malo"
                                    break
                                case parseInt(pje) === 0:
                                    clase = "sin-puntuar"
                                    break
                                default:
                                    clase = "neutro"
                                    break
                            }
                            

                            return clase
                        }


    return(
        <div className="standard">
            <SubNavBar />
            <div className="botonera">
                <div className={`btn-redondo ${cantidadDePartidos === 5 ? "activo" : "inactivo"}`} onClick={() => setCantidadDePartidos(5)}>5</div>
                <div className={`btn-redondo ${cantidadDePartidos === 10 ? "activo" : "inactivo"}`} onClick={() => setCantidadDePartidos(10)}>10</div>
                <div className={`btn-redondo ${cantidadDePartidos === 12 ? "activo" : "inactivo"}`} onClick={() => setCantidadDePartidos(12)}>12</div>
                <div className={`btn-redondo ${cantidadDePartidos === 15 ? "activo" : "inactivo"}`} onClick={() => setCantidadDePartidos(15)}>15</div>
                <div className={`btn-redondo ${cantidadDePartidos === 20 ? "activo" : "inactivo"}`} onClick={() => setCantidadDePartidos(20)}>20</div>
                <div className={`btn-redondo ${cantidadDePartidos === 25 ? "activo" : "inactivo"}`} onClick={() => setCantidadDePartidos(25)}>25</div>
            </div>
            <div className="tabla-rendimientos">
                <div className="individual">
                    <div className="w-10 neutro"></div>
                    <div className="w-3 neutro"></div>
                    {tablaRivales.map((p,idx) => (
                        <div className={`w-3 ${p.gf > p.gc ? "victoria" : p.gf < p.gc ? "derrota" : "empate"}`} key={idx}>
                            <img src={p.escudo} alt="escudo"/>
                        </div>
                    ))}
                </div>
                {listaJugadoresPuntuados.map((j,idx) => (
                    <div className="individual" key={idx}>
                        <div className="w-10 neutro">{j.nombreCompleto}</div>
                        <div className={`w-3 ${puntuar(j.promedio)}`}>{j.promedio === 0 ? "" : j.promedio}</div>
                    {j.ultimosPartidos.map((up,idx2) => (
                        <div className={`w-3 ${puntuar(up)}`} key={idx2}>{(up === 0 || up === "nj") ? "" : up}</div>
                    ))}
                    </div>
                ))}
            </div>
        </div>
    )
}