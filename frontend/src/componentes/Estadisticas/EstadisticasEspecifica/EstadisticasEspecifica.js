import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDatabaseList } from "../../../services/conexion";
import './EstadisticasEspecificas.css'
import { SubNavBar } from "../SubNavBar/SubNavBar";
import { SubMenu } from "./SubMenu/SubMenu";
import { EstadisticasPartidos } from "./EstadisticasPartidos/EstadisticasPartidos";
import { EstadisticasDefault } from "./EstadisticasDefault/EstadisticasDefault";
import { EstadisticasGoles } from "./EstadisticasGoles/EstadisitcasGoles";
import { EstadisticasTerminator } from "./EstadisticasTerminator/EstadisticasTerminator";

export const EstadisticasEspecificas = () => {
    const {id} = useParams()

    useEffect(() => {
                document.title = id.toUpperCase();
        
                return () => {
                    document.title = "FM VITACORA";
                };
            }, [id]);
    
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
            let tablaFiltrada = estadisticas.filter(a => a[id] > 0)
            tablaFiltrada.sort((a,b) => (b[id] + b.minutos / 1000000) - (a[id] + a.minutos / 1000000))

            let tipoDeTabla = "default"

            id === "partidos" && (tipoDeTabla = "partidos")
            id === "minutos" && (tipoDeTabla = "partidos")
            id === "goles" && (tipoDeTabla = "goles")
            id === "asistencias" && (tipoDeTabla = "goles")
            id === "terminator" && (tipoDeTabla = "terminator")
    return(
        <div className="standard">
            <SubNavBar />
            <SubMenu />
                <h2>{id}</h2>
                {tipoDeTabla === "partidos" && <EstadisticasPartidos tablaFiltrada={tablaFiltrada}/>}
                {tipoDeTabla === "goles" && <EstadisticasGoles tablaFiltrada={tablaFiltrada}/>}
                {tipoDeTabla === "terminator" && <EstadisticasTerminator tablaFiltrada={tablaFiltrada}/>}
                {tipoDeTabla === "default" && <EstadisticasDefault tablaFiltrada={tablaFiltrada}/>}
        </div>
    )
}