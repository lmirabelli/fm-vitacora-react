import './Principal.css'
import { SubNavBar } from "../SubNavBar/SubNavBar"
import {useDatabaseList} from '../../../services/conexion'
import { useEffect } from "react";
import { ListadoPartidos } from "./ListadoPartidos";
import { Records } from "./Records/Records";
import { MaximosRivales } from "./MaximosRivales/MaximosRivales";
import { RepeticionResultados } from "./RepeticionResultados/RepeticionResultados";


export const Principal = () => {

    useEffect(() => {
                document.title = "TODOS LOS PARTIDOS";
        
                return () => {
                    document.title = "FM VITACORA";
                };
            }, []);
    
                const { data, loading, error } = useDatabaseList(
                "http://localhost:4001/partidos"
            );
        
            if (loading) {
                return <div className='aviso'>cargando...</div>;
            }
            if (error) {
                return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
            }
            let { listaDePartidos, records, resultadosRepetidos } = data

    return(
        <div className="standard">
            <SubNavBar />
            <div className="cabecera-datos-partidos">
                {listaDePartidos.length > 0 && <Records records={records} />}
                {listaDePartidos.length > 0 && <RepeticionResultados resultados={resultadosRepetidos} />}
            </div>
            {listaDePartidos.length > 4 && <MaximosRivales />}
            <ListadoPartidos lista={listaDePartidos} />
        </div>
    )
}