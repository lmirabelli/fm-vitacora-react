import { Link } from "react-router-dom"
import './Partidos.css'



export const ListadoPartidos = ({lista}) => {

    const asignarResultado = (gf,gc) => {

        let resultado = {background: '#000', color: '#fff'}

        if(gf > gc){
            resultado = {background: '#34a13250', color: '#34a132'}
        }else if(gf < gc){
            resultado = {background: '#a1323250', color: '#a13232'}
        }else if(gf === gc){
            resultado = {background: '#a19b3250', color: '#a19b32'}
        }

        return resultado
    }
    return(
        <div className="lista-partidos">
        {lista.map((p,idx) =>(
            <Link to={`./${p.fechaDecimal}`} key={idx} className={`w100 item-partido`} style={asignarResultado(p.golesFavor,p.golesContra)}>
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
        </div>
    )
}