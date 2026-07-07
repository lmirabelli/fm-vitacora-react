import { SubNavBar } from "../SubNavBar/SubNavBar"
import { useEffect } from "react";
import { useDatabaseList } from "../../../services/conexion";
import './GolesImportancia.css'



export const GolesImportancia = () => {

    useEffect(() => {
                    document.title = "IMPORTANCIA DE GOLES";
            
                    return () => {
                        document.title = "FM VITACORA";
                    };
                }, []);
        
                    const { data, loading, error } = useDatabaseList(
                    "http://localhost:4001/estadisticas/goles/importancia"
                );
            
                if (loading) {
                    return <div className='aviso'>cargando...</div>;
                }
                if (error) {
                    return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                }
                let { tablaGoles } = data

    return(
        <div className="standard">
            <SubNavBar activar={"importancia"}/>
            <div className="tabla-importancia">
                <h2>Importancia de los goles</h2>
                <div className="titulo">
                    <div className="w-5"></div>
                    <div className="w-5"></div>
                    <div className="w-15">Goleador</div>
                    <div className="w-5">Total</div>
                    <div className="w-5">1-0</div>
                    <div className="w-5">V</div>
                    <div className="w-5">E</div>
                    <div className="w-5">Desc.</div>
                    <div className="w-5">Rell.</div>
                    <div className="w-10">{"< 10mins"}</div>
                    <div className="w-10">{"> 80mins"}</div>
                </div>
                {tablaGoles.map((g,idx) => (
                    <div className="puesto" key={idx}>
                        <div className="w-5">{idx + 1}</div>
                        <div className="w-5"><img src={g.bandera} alt="nacionalidad" className="bandera"/></div>
                        <div className="w-15">{g.goleador}</div>
                        <div className="w-5">{g.importancia.total}</div>
                        <div className="w-5">{g.importancia.unoxcero}</div>
                        <div className="w-5">{g.importancia.victoria}</div>
                        <div className="w-5">{g.importancia.empate}</div>
                        <div className="w-5">{g.importancia.descuento}</div>
                        <div className="w-5">{g.importancia.relleno}</div>
                        <div className="w-10">{g.importancia.madrugador}</div>
                        <div className="w-10">{g.importancia.agonico}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}