import { Link } from 'react-router-dom'
import './TodosLosPartidos.css'


export const TodosLosPartidos = ({partidos,rival,pactual}) => {

    return(
        <div className="todos-partidos">
            <h2>Todos los partidos contra {rival} <img src={partidos[0].escudo.escudo} alt="escudo" /></h2>
            {partidos.map((p,idx) => (
                <Link to={`/partidos/${p.fechaDecimal}`} key={idx} className={`partido ${pactual === p.fechaDecimal ? "activo" : "inactivo"}`}>
                    <div className="w-5">{idx + 1}</div>
                    <div className="w-20">{p.fecha}</div>
                    <div className="w-5"><img src={p.miEscudo.escudo} alt="escudo" /></div>
                    <div className="w-20">{p.miEquipo}</div>
                    <div className="w-20">{p.competicion}</div>
                    <div className="w-20">{p.estadio}, {p.ciudad}</div>
                    <div className="w-5">{p.golesFavor}</div>
                    <div className="w-5">{p.golesContra}</div>
                </Link>
            ))}
        </div>
    )
}