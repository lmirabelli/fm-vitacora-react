import { SubNavBar } from "../SubNavBar/SubNavBar"
import { useEffect } from "react";
import { useDatabaseList } from "../../../services/conexion";
import './GolesStats.css'

export const GolesStats = ({stats}) => {

    useEffect(() => {
                        document.title = stats.toUpperCase();
                
                        return () => {
                            document.title = "FM VITACORA";
                        };
                    }, [stats]);
            
                        const { data, loading, error } = useDatabaseList(
                        "http://localhost:4001/estadisticas/goles/stats"
                    );
                
                    if (loading) {
                        return <div className='aviso'>cargando...</div>;
                    }
                    if (error) {
                        return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                    }
                    let { tablaDeGoles } = data

                    for(let j of tablaDeGoles){
                        j[stats].sort((a,b) => b.cantidad - a.cantidad)
                    }
    return(
        <div className="standard">
            <SubNavBar activar={stats}/>
            <div className="cards">
                <h2>{stats}</h2>
                {tablaDeGoles.map((j, idx) => (
                    <div className={`card ${j.status}`} key={idx}>
                        <h3><img src={j.bandera} alt="nacionalidad" />{j.goleador} ({j.goles})</h3>
                        <hr style={{opacity: "0.1"}} />
                        <div className="data">
                            {j[stats].map((i, idx2) => (
                                <div className="renglon" key={idx2}>
                                    <div className="w-15">{stats === "rivales" ? <img src={i.escudo} alt="escudo" /> : ""}</div>
                                    <div className="w-70">{i.data === "." ? "sin asistencia" : i.data}</div>
                                    <div className="w-15">{i.cantidad}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}