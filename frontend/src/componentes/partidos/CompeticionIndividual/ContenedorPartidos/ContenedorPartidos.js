import './ContenedorPartidos.css'
import { Link } from "react-router-dom"


export const ContenedorPartidos = ({partidos}) => {


    return(
        <div className="tabla-partidos">
            {partidos.map((p,idx) => (
                <Link to={`/partidos/${p.id}`} className="partido" key={idx}>
                    <div className="w-5"><img src={p.miEscudo.escudo} alt="mi escudo" /></div>
                    <div className="w-15">{p.fecha}</div>
                    <div className="w-5"><img src={p.escudoRival.escudo} alt="mi escudo" /></div>
                    <div className="w-20">{p.rival}{p.paisRival.pais !== p.miEscudo.paisDelEquipo && <img src={p.paisRival.bandera} alt="bandera" className="bandera" />}</div>
                    <div className="w-15">{p.condicion}</div>
                    <div className="w-15">{p.resultado}</div>
                    <div className="w-10">{p.promedio.toFixed(2)}</div>
                </Link>
            ))}
        </div>
    )
}