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
                <Link className="btn-estadisticas" state={"partidos"}to="./partidos">partidos</Link>
                <Link className="btn-estadisticas" state={""}to="./minutos">minutos</Link>
                <Link className="btn-estadisticas" state={""}to="./jugadorDelPartido">mvp</Link>
                <Link className="btn-estadisticas" state={""}to="./goles">Goles</Link>
                <Link className="btn-estadisticas" state={""}to="./asistencias">asistencias</Link>
                <Link className="btn-estadisticas" state={""}to="./penales">penales</Link>
                <Link className="btn-estadisticas" state={""}to="./tirosPuerta">tiros a puerta</Link>
                <Link className="btn-estadisticas" state={""}to="./pasesIntentados">pases</Link>
                <Link className="btn-estadisticas" state={""}to="./terminator">terminator</Link>
            </div>
        </div>
    )
}