import './competicionIndividual.css'
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDatabaseList } from "../../../services/conexion";
import { ContenedorSuperior } from "./ContenedorSuperior/ContenedorSuperior";
import { ContenedorGoles } from "./ContenedorGoles/ContenedorGoles";
import { ContenedorPartidos } from './ContenedorPartidos/ContenedorPartidos';



export const CompeticionIndividual = () => {

    const { state } = useLocation()
    useEffect(() => {
                            document.title = state.data.toUpperCase();
                    
                            return () => {
                                document.title = "FM VITACORA";
                            };
                        }, [state]);
                
                            const { data, loading, error } = useDatabaseList(
                            `http://localhost:4001/partidos/competicion/${state.data}`
                        );
                    
                        if (loading) {
                            return <div className='aviso'>cargando...</div>;
                        }
                        if (error) {
                            return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                        }
                        let { competicion } = data
    return(
        <div className="standard">
            <div className="botonera-flotante bf-derecha">
                <Link to="/partidos/competicion" className="btn-flotante" style={{background: '#fff'}}>🔙</Link>
            </div>
            <ContenedorSuperior state={state} misEquipos={competicion.misEquipos} />
            <div className="tablas-competicion">
                <ContenedorGoles data={competicion.goleadores} titulo={"goleadores"}/>
                <ContenedorGoles data={competicion.asistidores} titulo={"asistidores"}/>
                <ContenedorGoles data={competicion.jugadores} titulo={"jugadores"}/>
            </div>
            <ContenedorPartidos partidos={competicion.partidos}/>
        </div>
    )
}