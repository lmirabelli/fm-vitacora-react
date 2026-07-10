import { SubNavBar } from "../SubNavBar/SubNavBar"
import { useEffect } from "react";
import { useDatabaseList } from "../../../services/conexion";
import './golesMultiples.css'
import { Tabla } from "./Tabla/Tabla";
import { Listado } from "./Listado/Listado";

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
            {tablaGoles.length > 0 && <Tabla tablaGoles={tablaGoles} regla={regla} />}
            {listaDeGolesMultiples.length > 0 && <Listado listaDeGolesMultiples={listaDeGolesMultiples} />}
        </div>
    )
}