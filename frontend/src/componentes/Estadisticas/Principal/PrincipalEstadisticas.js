import { SubNavBar } from "../SubNavBar/SubNavBar"
import { useEffect } from "react";
import {useDatabaseList} from '../../../services/conexion'
import { EstadisticasGeneral } from "../General/EstadisticasGeneral";
import './PrincipalEstadisticas.css'


export const PrincipalEstadisticas = () => {

    useEffect(() => {
            document.title = "ESTADISTICAS";
    
            return () => {
                document.title = "FM VITACORA";
            };
        }, []);

            const { data, loading, error } = useDatabaseList(
            "http://localhost:4001/estadisticas"
        );
    
        if (loading) {
            return <div className='aviso'>cargando...</div>;
        }
        if (error) {
            return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
        }
        let { estadisticas } = data

    return(
        <div className="standard">
            <SubNavBar />
            <div className="tablas">
                <h2>Estadisticas</h2>
                <EstadisticasGeneral stats={estadisticas} titulo="goles" />
                <EstadisticasGeneral stats={estadisticas} titulo="partidos" />
                <EstadisticasGeneral stats={estadisticas} titulo="asistencias" />
                <EstadisticasGeneral stats={estadisticas} titulo="minutos" />
            </div>
        </div>
    )
}