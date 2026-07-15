import './PrincipalEstadisticas.css'
import { SubNavBar } from "../SubNavBar/SubNavBar"
import { useEffect } from "react";
import { Link } from 'react-router-dom'


export const PrincipalEstadisticas = () => {

    useEffect(() => {
            document.title = "ESTADISTICAS";
    
            return () => {
                document.title = "FM VITACORA";
            };
        }, []);

    return(
        <div className="standard">
            <SubNavBar />
            <div className="tablas">
                <h2>Estadisticas</h2>
                <Link className="btn-estadisticas" to="./partidos">partidos</Link>
                <Link className="btn-estadisticas" to="./minutos">minutos</Link>
                <Link className="btn-estadisticas" to="./jugadorDelPartido">mvp</Link>
                <Link className="btn-estadisticas" to="./goles">Goles</Link>
                <Link className="btn-estadisticas" to="./asistencias">asistencias</Link>
                <Link className="btn-estadisticas" to="./penales">penales</Link>
                <Link className="btn-estadisticas" to="./tirosPuerta">tiros a puerta</Link>
                <Link className="btn-estadisticas" to="./pasesIntentados">pases</Link>
                <Link className="btn-estadisticas" to="./terminator">terminator</Link>
            </div>
        </div>
    )
}