import './EstadisticasGenerales.css'
import { useEffect, useState } from 'react';
import { useDatabaseList } from '../../../services/conexion';
import { PartidosStats } from './PartidosStats/PartidosStats';
import { GolesStats } from './GolesStats/GolesStats';

export const EstadisticasGenerales = () => {
    useEffect(() => {
                    document.title = "ESTADISTICAS";
            
                    return () => {
                        document.title = "FM VITACORA";
                    };
        }, []);
        
            const { data, loading, error } = useDatabaseList(
            "http://localhost:4001/estadisticas"
        );
    
        const [listaFiltrada, setListaFiltrada] = useState([])
        const [titulo, setTitulo] = useState('mas partidos jugados')
        const [btnActivo, setBtnActivo] = useState('partidos')

        const acomodarPartidos = (lista) => {
            setTitulo("mas partidos jugados")
            let listaOrdenada = [...lista].sort((a,b) => (b.partidos + b.minutos / 1000000) -  (a.partidos + a.minutos / 1000000))
            setListaFiltrada(listaOrdenada)
            setBtnActivo("partidos")
        }
        const acomodarGoles = (lista) => {
            setTitulo("maximo goleador")
            let listaOrdenada = [...lista].filter(a => a.goles > 0).sort((a,b) => (b.goles + b.asistencias / 1000000) -  (a.goles + a.asistencias / 1000000))
            setListaFiltrada(listaOrdenada)
            setBtnActivo("goles")
        }
        const acomodarAsistencias = (lista) => {
            setTitulo("maximo asistidor")
            let listaOrdenada = [...lista].filter(a => a.asistencias > 0).sort((a,b) => (b.asistencias + b.goles / 1000000) -  (a.asistencias + a.goles / 1000000))
            setListaFiltrada(listaOrdenada)
            setBtnActivo("asistencias")
        }
    
        useEffect(() => {
            if(data?.tablaEstadisticas){
                setListaFiltrada(data.tablaEstadisticas)
            }
        },[data])
        
    
        if (loading) {
            return <div className='aviso'>cargando...</div>;
        }
        if (error) {
            return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
        }
        let { tablaEstadisticas } = data

    return(
        <div className="standard">
            <div className='menu-stats'>
                <button className={`btn-stats ${btnActivo === "partidos" ? "activo" : "inactivo"}`} onClick={() => acomodarPartidos(tablaEstadisticas)}>Partidos</button>
                <button className={`btn-stats ${btnActivo === "goles" ? "activo" : "inactivo"}`} onClick={() => acomodarGoles(tablaEstadisticas)}>Goleador</button>
                <button className={`btn-stats ${btnActivo === "asistencias" ? "activo" : "inactivo"}`} onClick={() => acomodarAsistencias(tablaEstadisticas)}>Asistente</button>
            </div>
            <div className='tabla-stats'>
                <h2>{titulo}</h2>
                {btnActivo === "partidos" && <PartidosStats listaFiltrada={listaFiltrada} />}
                {btnActivo === "goles" && <GolesStats listaFiltrada={listaFiltrada} />}
                {btnActivo === "asistencias" && <GolesStats listaFiltrada={listaFiltrada} />}
            </div>
            
        </div>
    )
}