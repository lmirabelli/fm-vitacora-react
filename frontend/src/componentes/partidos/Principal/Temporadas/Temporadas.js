import { Link } from "react-router-dom"
import './Temporadas.css'


export const Temporadas = ({temporadas}) => {


    return(
        <div className="container-temporadas">
            {temporadas.map((t,idx) => (
                <Link to={`/planteles/${t.temporada}/${t.equipo}`} key={idx} style={{background: `${t.escudo.colorPrimario}70`, color: t.escudo.colorSecundario}} className="temporada">
                    <div className="container-escudo">
                        <img src={t.escudo.escudo} alt="escudo" />
                    </div>
                    <div className="container-data">
                        <div className="w-100">{t.temporada}</div>
                        <div className="w-100">{t.equipo.slice(0,-6)}</div>
                        <div className="w-100">{t.competicion}</div>
                    </div>
                </Link>
            ))}
        </div>
    )
}