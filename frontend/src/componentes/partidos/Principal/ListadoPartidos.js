import { Link } from "react-router-dom"
import './Partidos.css'



export const ListadoPartidos = ({lista}) => {

    const asignarResultado = (gf,gc) => {

        let resultado = "desconocido"

        if(gf > gc){
            resultado = "victoria"
        }else if(gf < gc){
            resultado = "derrota"
        }else if(gf === gc){
            resultado = "empate"
        }

        return resultado
    }
    return(
        <>
        {lista.map((p,idx) =>(
            <Link to={`./${p.fechaDecimal}`} key={idx} className={`w100 item-partido ${asignarResultado(p.golesFavor,p.golesContra)}`}>
                <div className="w-5">{idx + 1}</div>
                <div className="w-10">{p.fecha}</div>
                <div className="w-5"><img className="escudo" src={p.escudoMiEquipo.escudo} alt={p.miEquipo} /></div>
                <div className="w-15">{p.rival}{p.escudoMiEquipo.paisDelEquipo !== p.paisRival && <img className="bandera" src={p.banderaRival.bandera} alt={p.paisRival} />}</div>
                <div className="w-5"><img className="escudo" src={p.escudoRival.escudo} alt={p.rival} /></div>
                <div className="w-30">{p.estadio}, {p.ciudad}</div>
                <div className="w-20">{p.competicion}</div>
                <div className="w-5">{p.golesFavor}</div>
                <div className="w-5">{p.golesContra}</div>
            </Link>
        ) )}
        </>
    )
}