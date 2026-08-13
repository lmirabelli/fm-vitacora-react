import { Link } from "react-router-dom"



export const TablasCompeticiones = ({tablas}) => {

    const traspasarData = (i) => {
        return {data: i.competicion, pg: i.pg, pe: i.pe, pp: i.pp, gf: i.gf, gc: i.gc, escudo: "", ultimoPartido: i.ultimoPartido}
    }

    return(
        <>
            {tablas.map((i,idx) => (
                <Link to={`/partidos/competicion/${i.competicion}`} state={traspasarData(i)} className="competicion-card" key={idx}>
                    <h4>{i.competicion}</h4>
                    <div className="linea">
                        <div className="w-15" title="pj">{i.pj}</div>
                        <div className="w-10" title="pg">{i.pg}</div>
                        <div className="w-10" title="pe">{i.pe}</div>
                        <div className="w-10" title="pp">{i.pp}</div>
                        <div className="w-15" title="gf">{i.gf}</div>
                        <div className="w-15" title="gc">{i.gc}</div>
                        <div className="w-15" title="dif">{i.dif < 0 ? i.dif : `+${i.dif}`}</div>
                    </div>
                    <div className="linea">
                        <div className="w-60">{i.efectividad}%</div>
                    </div>
                </Link>
            ))}
        </>
    )
}