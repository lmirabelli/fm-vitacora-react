import { Link } from "react-router-dom"
import './Records.css'



export const Records = ({records}) => {

    const {mejorResultado, peorResultado, invicto, comienzoVictoria, comienzoDerrota} = records

    const cacularEfectividad = (dato) =>{
        let ptsTotal = dato.veces * 3
        let pts = dato.pg * 3 + dato.pe

        let efectividad = (pts / ptsTotal * 100).toFixed(1)

        return efectividad
    }
    return (
        <div className="records">
            <h3>Records</h3>
            <Link to={`/partidos/${mejorResultado.id}`} className="record">
                <p className="data-titulo">Mejor Resultado: </p>
                <p className="dato">{mejorResultado.fecha}<img src={mejorResultado.escudoRival.escudo} alt="escudo" />{`${mejorResultado.rival} ${mejorResultado.golesFavor}-${mejorResultado.golesContra} (${mejorResultado.competicion})`}</p>
            </Link>
            <Link to={`/partidos/${peorResultado.id}`} className="record">
                <p className="data-titulo">Peor Resultado: </p>
                <p className="dato">{peorResultado.fecha}<img src={peorResultado.escudoRival.escudo} alt="escudo" />{`${peorResultado.rival} ${peorResultado.golesFavor}-${peorResultado.golesContra} (${peorResultado.competicion})`}</p>
            </Link>
            <span className="record">
                <p className="data-titulo">Mayor Invicto: </p>
                <p className="dato">{`(${invicto.partidos}) -${invicto.victorias}v.${invicto.empates}e  ${invicto.gf}:${invicto.gc}-  desde ${invicto.fechaInicio} hasta ${invicto.fechaFinal}`}</p>
            </span>
            <span className="record">
                <p className="data-titulo">Comienzo 1-0: </p>
                <p className="dato">{`(${comienzoVictoria.veces}) ${comienzoVictoria.pg}-${comienzoVictoria.pe}-${comienzoVictoria.pp}  ${comienzoVictoria.gf}:${comienzoVictoria.gc}  efect: ${cacularEfectividad(comienzoVictoria)}%`}</p>
            </span>
            <span className="record">
                <p className="data-titulo">Comienzo 0-1: </p>
                <p className="dato">{`(${comienzoDerrota.veces}) ${comienzoDerrota.pg}-${comienzoDerrota.pe}-${comienzoDerrota.pp}  ${comienzoDerrota.gf}:${comienzoDerrota.gc}  efect: ${cacularEfectividad(comienzoDerrota)}%`}</p>
            </span>
        </div>
    )
}