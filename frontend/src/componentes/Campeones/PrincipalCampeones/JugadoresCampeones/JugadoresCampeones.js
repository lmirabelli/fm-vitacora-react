import { Link } from "react-router-dom"

export const JugadoresCampeones = ({titulosxjugador}) => {

    <div className="campeones">
                    <h2>TITULOS</h2>
                    <div className="jugador" style={{marginBottom: "8px"}}>
                            <div className="w-10"></div>
                            <div className="w-40">jugador</div>
                            <div className="w-35">Etapa</div>
                            <div className="w-10">Titulos</div>
                        </div>
                    {titulosxjugador.map((j,idx) => (
                        <Link to={`/jugadores/${j.id}`} className="jugador" key={idx}>
                            <div className="w-10"><img src={j.bandera} alt="bandera" className="bandera" /></div>
                            <div className="w-40">{j.jugador}</div>
                            <div className="w-35">{`${j.etapa} ${j.numeroDeEtapas > 1 ? `(${j.numeroDeEtapas})` : ""}`}</div>
                            <div className="w-10">{j.titulos}</div>
                        </Link>
                    ))}
                </div>
}