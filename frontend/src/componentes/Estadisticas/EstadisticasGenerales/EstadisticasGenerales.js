import './EstadisticasGenerales.css'
import { useEffect, useState } from 'react';
import { useDatabaseList } from '../../../services/conexion';
import { PartidosStats } from './PartidosStats/PartidosStats';
import { GolesStats } from './GolesStats/GolesStats';
import { SubNavBar } from '../SubNavBar/SubNavBar';
import { MinutosStats } from './MinutosStats/MinutosStats';
import { ArquerosStats } from './ArquerosStats/ArquerosStats';
import { DistribucionStats } from './DistribucionStats/DistribucionStats';

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
        const [btnFiltro, setBtnFiltro] = useState('todos')

        const filtrarLista = (lista,stat,filtro) => {

            setBtnFiltro(filtro)
            setBtnActivo(stat)
            let listaFiltradaFn = []
            if(filtro === "todos"){
                listaFiltradaFn = [...lista]
            }else if(filtro === "club"){
                listaFiltradaFn = [...lista].filter(a => a.situacionClub === "club")
            }else if(filtro === "fuera"){
                listaFiltradaFn = [...lista].filter(a => a.situacionClub === "fuera")
            }

            stat === "partidos" && acomodarPartidos(listaFiltradaFn)
            stat === "goles" && acomodarGoles(listaFiltradaFn)
            stat === "asistencias" && acomodarAsistencias(listaFiltradaFn)
            stat === "minutos" && acomodarMinutos(listaFiltradaFn)
            stat === "arqueros" && acomodarArqueros(listaFiltradaFn)
            stat === "distribucion" && acomodarDistribucion(listaFiltradaFn)
        }

        const acomodarPartidos = (lista) => {
            setTitulo("mas partidos jugados")
            let listaOrdenada = [...lista].sort((a,b) => (b.partidos + b.minutos / 1000000) -  (a.partidos + a.minutos / 1000000))
            setListaFiltrada(listaOrdenada)
        }
        const acomodarGoles = (lista) => {
            setTitulo("maximo goleador")
            let listaOrdenada = [...lista].filter(a => a.goles > 0).sort((a,b) => (b.goles + b.asistencias / 1000000) -  (a.goles + a.asistencias / 1000000))
            setListaFiltrada(listaOrdenada)
        }
        const acomodarAsistencias = (lista) => {
            setTitulo("maximo asistidor")
            let listaOrdenada = [...lista].filter(a => a.asistencias > 0).sort((a,b) => (b.asistencias + b.goles / 1000000) -  (a.asistencias + a.goles / 1000000))
            setListaFiltrada(listaOrdenada)
        }
        const acomodarMinutos = (lista) => {
            setTitulo("mas Minutos en cancha")
            let listaOrdenada = [...lista].sort((a,b) => (b.minutos + b.partidos / 1000000) -  (a.minutos + a.partidos / 1000000))
            setListaFiltrada(listaOrdenada)
        }
        const acomodarArqueros = (lista) => {
            setTitulo("Estadisticas de Arquero")
            const listaGK = [...lista].filter(a => a.posicion === "POR")
            let listaOrdenada = [...listaGK].sort((a,b) => (b.partidos + b.minutos / 1000000) -  (a.partidos + a.minutos / 1000000))
            setListaFiltrada(listaOrdenada)
        }
        const acomodarDistribucion = (lista) => {
            setTitulo("Distribucion del Balon")
            let listaOrdenada = [...lista].sort((a,b) => (b.pasesCompletados + b.minutos / 1000000) -  (a.pasesCompletados + a.minutos / 1000000))
            setListaFiltrada(listaOrdenada)
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

        console.log(data)
        let { tablaEstadisticas, cantidadPartidos } = data

    return(
        <div className="standard">
            <SubNavBar />
            <div className='menu-stats'>
                <button className={`btn-stats ${btnActivo === "partidos" ? "activo" : "inactivo"}`} onClick={() => filtrarLista(tablaEstadisticas,"partidos",btnFiltro)}>Partidos</button>
                <button className={`btn-stats ${btnActivo === "minutos" ? "activo" : "inactivo"}`} onClick={() => filtrarLista(tablaEstadisticas,"minutos",btnFiltro)}>Minutos</button>
                <button className={`btn-stats ${btnActivo === "goles" ? "activo" : "inactivo"}`} onClick={() => filtrarLista(tablaEstadisticas,"goles",btnFiltro)}>Goleador</button>
                <button className={`btn-stats ${btnActivo === "asistencias" ? "activo" : "inactivo"}`} onClick={() => filtrarLista(tablaEstadisticas,"asistencias",btnFiltro)}>Asistente</button>
                <button className={`btn-stats ${btnActivo === "distribucion" ? "activo" : "inactivo"}`} onClick={() => filtrarLista(tablaEstadisticas,"distribucion",btnFiltro)}>Distribucion</button>
                <button className={`btn-stats ${btnActivo === "arqueros" ? "activo" : "inactivo"}`} onClick={() => filtrarLista(tablaEstadisticas,"arqueros",btnFiltro)}>Arqueros</button>
            </div>
            <div className='menu-stats'>
                <button className={`btn-stats ${btnFiltro === "todos" ? "activo" : "inactivo"}`} onClick={() => filtrarLista(tablaEstadisticas,btnActivo,"todos")}>Todos</button>
                <button className={`btn-stats ${btnFiltro === "club" ? "activo" : "inactivo"}`} onClick={() => filtrarLista(tablaEstadisticas,btnActivo,"club")}>En el Club</button>
                <button className={`btn-stats ${btnFiltro === "fuera" ? "activo" : "inactivo"}`} onClick={() => filtrarLista(tablaEstadisticas,btnActivo,"fuera")}>Fuera del club</button>
            </div>
            <div className='tabla-stats'>
                <h2>{titulo}</h2>
                {btnActivo === "partidos" && <PartidosStats listaFiltrada={listaFiltrada} />}
                {btnActivo === "minutos" && <MinutosStats listaFiltrada={listaFiltrada} />}
                {btnActivo === "goles" && <GolesStats listaFiltrada={listaFiltrada} />}
                {btnActivo === "asistencias" && <GolesStats listaFiltrada={listaFiltrada} />}
                {btnActivo === "distribucion" && <DistribucionStats listaFiltrada={listaFiltrada} />}
                {btnActivo === "arqueros" && <ArquerosStats listaFiltrada={listaFiltrada} />}
            </div>
            
        </div>
    )
}