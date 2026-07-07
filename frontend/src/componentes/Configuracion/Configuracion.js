import { AgregarBandera } from "./AgregarBandera/AgregarBandera"
import { AgregarEscudo } from "./AgregarEscudo/AgregarEscudo"
import { useDatabaseList } from "../../services/conexion"
import './configuracion.css'
import { useEffect } from "react"
import { MuestraEscudos } from "./MuestraEscudos/MuestraEscudos"
import { MuestraBanderas } from "./MuestraBanderas/MuestrasBanderas"
import { Opciones } from "./Opciones/Opciones"


export const Configuracion = () => {

    useEffect(() => {
                    document.title = "CONFIGURACION";
            
                    return () => {
                        document.title = "FM VITACORA";
                    };
                }, []);
        
                    const { data, loading, error } = useDatabaseList(
                    "http://localhost:4001/imagenes"
                );
            
                if (loading) {
                    return <div className='aviso'>cargando...</div>;
                }
                if (error) {
                    return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                }
                let { escudosEstructurados, listaDeBanderas } = data

    return(
        <div className="standard">
            <h1>⚙️ CONFIGURACION ⚙️</h1>
            <Opciones />
            <div className="container-imagenes">
                <AgregarEscudo />
                <AgregarBandera />
            </div>
            <MuestraBanderas data={listaDeBanderas} />
            <MuestraEscudos data={escudosEstructurados} />
        </div>
    )
}