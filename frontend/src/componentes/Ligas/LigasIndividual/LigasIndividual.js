import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useDatabaseList } from "../../../services/conexion";
import './LigasIndividual.css'
import { TablaHistorica } from "./TablaHistorica/TablaHistorica";


export const LigasIndividual = () => {

    let {pais} = useParams()
    useEffect(() => {
                        document.title = "MENU DE LIGAS";
                
                        return () => {
                            document.title = "FM VITACORA";
                        };
                    }, []);
            
                        const { data, loading, error } = useDatabaseList(
                        `http://localhost:4001/ligas/${pais}`);
                
                    if (loading) {
                        return <div className='aviso'>cargando...</div>;
                    }
                    if (error) {
                        return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                    }
                    let { tablaCompleta, ligasFiltradas } = data
    
                    console.log(data)

                    let temporadas = []
                    ligasFiltradas.forEach(l => {
                        !temporadas.find(a => a === l.temporada) && temporadas.push(l.temporada)
                    });

                    console.log(temporadas)
    return(
        <div className="standard">
            <div className="info-temporadas">
                {temporadas.map((t,idx) => (
                    <div className="temporada" key={idx}>{t}</div>
                ))}
            </div>
            <TablaHistorica tablaCompleta={tablaCompleta} pais={pais} />
        </div>
    )
}