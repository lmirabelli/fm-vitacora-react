import { SubNavBar } from "../SubNavBar/SubNavBar"
import { useEffect, useState } from "react";
import { useDatabaseList } from "../../../services/conexion";
import './Block100.css'




export const Block100 = () => {

    let [bloque, setBloque] = useState(25)

    const { data, loading, error } = useDatabaseList(`http://localhost:4001/estadisticas/goles/block/${bloque}`);
    useEffect(() => {
                        document.title = `BLOCK 100`;
                
                        return () => {
                            document.title = "FM VITACORA";
                        };
                    }, []);
                
                    if (loading) {
                        return <div className='aviso'>cargando...</div>;
                    }
                    if (error) {
                        return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                    }
                    let { bloques } = data


    return(
        <div className="standard">
            <SubNavBar />
            <div className="menu-block">
                <button onClick={() => setBloque(10)} className={`btn-block ${bloque === 10 ? "inactivo" : "activo"}`}>10</button>
                <button onClick={() => setBloque(25)} className={`btn-block ${bloque === 25 ? "inactivo" : "activo"}`}>25</button>
                <button onClick={() => setBloque(50)} className={`btn-block ${bloque === 50 ? "inactivo" : "activo"}`}>50</button>
                <button onClick={() => setBloque(75)} className={`btn-block ${bloque === 75 ? "inactivo" : "activo"}`}>75</button>
                <button onClick={() => setBloque(100)} className={`btn-block ${bloque === 100 ? "inactivo" : "activo"}`}>100</button>
                <button onClick={() => setBloque(200)} className={`btn-block ${bloque === 200 ? "inactivo" : "activo"}`}>200</button>
                <button onClick={() => setBloque(250)} className={`btn-block ${bloque === 250 ? "inactivo" : "activo"}`}>250</button>
            </div>
            <div className="info">
                <h3>BLOQUE: {bloque} Goles</h3>
                {bloques.map((bqs,idx) => (
                    <div className="bloque" key={idx} style={{width: `${(100 / bloques.length) - 12}%`}}>
                        <h5>{bqs[bqs.length - 1].fecha} - {bqs[0].fecha}</h5>
                        {bqs.map((bk,idx2) => (
                            <div className="jugador" key={idx2}>
                                <div className="w-10">{idx2+1}</div>
                                <div className="w-70">{bk.goleador}</div>
                                <div className="w-20">{bk.goles}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}