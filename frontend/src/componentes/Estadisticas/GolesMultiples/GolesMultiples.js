import { SubNavBar } from "../SubNavBar/SubNavBar"
import { useEffect } from "react";
import { useDatabaseList } from "../../../services/conexion";
import './golesMultiples.css'

export const GolesMultiples = () => {

    useEffect(() => {
                    document.title = "GOLES MULTIPLES";
            
                    return () => {
                        document.title = "FM VITACORA";
                    };
                }, []);
        
                    const { data, loading, error } = useDatabaseList(
                    "http://localhost:4001/estadisticas/goles/multiples"
                );
            
                if (loading) {
                    return <div className='aviso'>cargando...</div>;
                }
                if (error) {
                    return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                }
                let { tablaGoles, listaDeGolesMultiples, masGoles } = data

                let regla = []

                for( let i=2; i <= masGoles; i++){
                    regla.push(i)
                }

    return(
        <div className="standard">
            <SubNavBar activar={"multiples"}/>
            <div className="tabla-multiples">
                <h2>Tabla</h2>
                <div className="titulo">
                    <div className="w-5"></div>
                    <div className="w-5"></div>
                    <div className="w-20"></div>
                    {regla.map((n, idx) => (
                    <div className="w-5" key={idx}>{n}</div>
                    ))}
                </div>
                {tablaGoles.map((g,idx) => (
                    <div className="puesto" key={idx}>
                        <div className="w-5">{idx + 1}</div>
                        <div className="w-5"><img src={g.nacionalidad} alt="bandera" className="bandera" /></div>
                        <div className="w-20">{g.goleador}</div>
                        {g.cantidadGoles.map((n, idx2) => (
                            <div className="w-5" key={idx2}>{n.veces}</div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="tabla-multiples">
                <div className="titulo">
                    <div className="w-5"></div>
                    <div className="w-10">fecha</div>
                    <div className="w-5"></div>
                    <div className="w-15">competicion</div>
                    <div className="w-20">goleador</div>
                    <div className="w-15">rival</div>
                    <div className="w-10">resultado</div>
                </div>
                {listaDeGolesMultiples.map((g,idx) => (
                    <div className="puesto" key={idx}>
                        <div className="w-5">{idx+1}</div>
                        <div className="w-10">{g.fecha}</div>
                        <div className="w-5">{g.goles}</div>
                        <div className="w-15">{g.competicion}</div>
                        <div className="w-20">{g.goleador}</div>
                        <div className="w-15">{g.rival}</div>
                        <div className="w-10">{g.resultado}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}