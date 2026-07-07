import { useLocation, Link } from "react-router-dom"


export const Submenu = () => {

    const location = useLocation().pathname

    return(
        <div className="botonera-flotante bf-derecha">
            {location === "/campeones" && 
                <Link to="/campeones/agregar" className="btn-flotante desactivo" title="agregar">➕​</Link>
            }
        </div>
    )
}