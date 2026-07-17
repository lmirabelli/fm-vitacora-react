import { Link, useLocation } from "react-router-dom"


export const SubNavBar = ({activar}) => {
    const location = useLocation().pathname


    return(
        <div className="botonera-flotante bf-derecha">
            {location !== "/estadisticas" && <Link to="/estadisticas/agregar" className={`btn-flotante ${activar === "agregar" ? "activo" : "desactivo"}`} style={{animationDelay: `${0.25 * 1}s`}} title="agregar">➕​</Link>}
            {location.includes("/goles") && <Link to="/estadisticas/goles/importancia" className={`btn-flotante ${activar === "importancia" ? "activo" : "desactivo"}`} style={{animationDelay: `${0.25 * 2}s`}} title="importancia">⬆️​</Link>}
            {location.includes("/goles") && <Link to="/estadisticas/goles/multiples" className={`btn-flotante ${activar === "multiples" ? "activo" : "desactivo"}`} style={{animationDelay: `${0.25 * 3}s`}} title="multiples">*️⃣​</Link>}
            {location.includes("/goles") && <Link to="/estadisticas/goles/asistentes" className={`btn-flotante ${activar === "asistentes" ? "activo" : "desactivo"}`} style={{animationDelay: `${0.25 * 4}s`}} title="asistentes">🫂​</Link>}
            {location.includes("/goles") && <Link to="/estadisticas/goles/rivales" className={`btn-flotante ${activar === "rivales" ? "activo" : "desactivo"}`} style={{animationDelay: `${0.25 * 5}s`}} title="rivales">🤼​</Link>}
            {location.includes("/goles") && <Link to="/estadisticas/goles/minutos" className={`btn-flotante ${activar === "minutos" ? "activo" : "desactivo"}`} style={{animationDelay: `${0.25 * 6}s`}} title="minutos">⏱️​</Link>}
            {location.includes("/goles") && <Link to="/estadisticas/goles/block100" className={`btn-flotante ${activar === "block100" ? "activo" : "desactivo"}`} style={{animationDelay: `${0.25 * 7}s`}} title="block100">💯​</Link>}
            {location.includes("/goles") && <Link to="/estadisticas/goles/veteranos" className={`btn-flotante ${activar === "veteranos" ? "activo" : "desactivo"}`} style={{animationDelay: `${0.25 * 8}s`}} title="veteranos">👴🏻​</Link>}
        </div>
    )
} 