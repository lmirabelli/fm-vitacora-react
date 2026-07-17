import { Link, useLocation } from "react-router-dom"
import './BotonesFlotantes.css'


export const BotonesFlotantes = () => {

    const location = useLocation().pathname

    const noIndex = (location) => {
        if(location !== "/"){
            return(
            <div className="botonera-flotante bf-izquierda" key={location}>
                <Link to="/" className={`btn-flotante ${location === "/" ? "activo" : "desactivo"}`} style={{animationDelay: '0.1s'}}>🏠</Link>
                <Link to="/jugadores" className={`btn-flotante ${location === "/jugadores" ? "activo" : "desactivo"}`} style={{animationDelay: '0.2s'}}>👤</Link>
                <Link to="/partidos" className={`btn-flotante ${location === "/partidos" ? "activo" : "desactivo"}`} style={{animationDelay: '0.3s'}}>⚽</Link>
                <Link to="/planteles" className={`btn-flotante ${location === "/planteles" ? "activo" : "desactivo"}`} style={{animationDelay: '0.4s'}}>📑</Link>
                <Link to="/estadisticas/partidos" className={`btn-flotante ${location === "/estadisticas" ? "activo" : "desactivo"}`} style={{animationDelay: '0.5s'}}>🔢</Link>
                <Link to="/campeones" className={`btn-flotante ${location === "/campeones" ? "activo" : "desactivo"}`} style={{animationDelay: '0.6s'}}>🥇</Link>
        </div>
            )
        }
    }

    return(
        <>
            {noIndex(location)}
        </>
    )
}