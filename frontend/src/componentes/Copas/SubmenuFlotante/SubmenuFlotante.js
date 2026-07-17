
import { useLocation, Link } from "react-router-dom"


export const SubmenuFlotante = () => {
    const location = useLocation().pathname


    return(
        <div className="botonera-flotante bf-derecha">
            {location === "/copas" && <Link to="/copas/agregar" className={`btn-flotante`} style={{background: "#67cfff", animationDelay: `${0.25 * 1}s`}} title="agregar">➕​</Link>}
            
        </div>
    )
}