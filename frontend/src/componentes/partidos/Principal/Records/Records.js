import { Link } from "react-router-dom"
import './Records.css'



export const Records = ({records}) => {


    const {mejorResultado, peorResultado} = records
    return (
        <div className="records">
            <Link to={`/partidos/${mejorResultado.id}`} className="record">
                <p className="data-titulo">Mejor Resultado: </p>
                <p className="dato">{mejorResultado.fecha}<img src={mejorResultado.escudoRival.escudo} alt="escudo" />{`${mejorResultado.rival} ${mejorResultado.golesFavor}-${mejorResultado.golesContra} (${mejorResultado.competicion})`}</p>
            </Link>
            <Link to={`/partidos/${peorResultado.id}`} className="record">
                <p className="data-titulo">Peor Resultado: </p>
                <p className="dato">{peorResultado.fecha}<img src={peorResultado.escudoRival.escudo} alt="escudo" />{`${peorResultado.rival} ${peorResultado.golesFavor}-${peorResultado.golesContra} (${peorResultado.competicion})`}</p>
            </Link>
        </div>
    )
}