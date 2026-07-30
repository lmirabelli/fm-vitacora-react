import { Submenu } from "../SubMenu/Submenu"
import './PrincipalCampeones.css'
import { useEffect } from "react";
import { useDatabaseList } from "../../../services/conexion";
import { Link } from "react-router-dom";
import { JugadoresCampeones } from "./JugadoresCampeones/JugadoresCampeones";


export const PrincipalCampeones = () => {

    useEffect(() => {
                document.title = "CAMPEONES";
        
                return () => {
                    document.title = "FM VITACORA";
                };
            }, []);
    
                const { data, loading, error } = useDatabaseList(
                "http://localhost:4001/campeones"
            );
        
            if (loading) {
                return <div className='aviso'>cargando...</div>;
            }
            if (error) {
                return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
            }
            let { listaDeCampeones, titulosxjugador } = data
            titulosxjugador.sort((a,b) => b.titulos - a.titulos)
            
    return(
        <div className="standard">
            <Submenu />
            <div className="tablero">
                <div className="temporadas">
                    {listaDeCampeones.map((c, idx) => (
                        <Link to={`/campeones/${c.competicion}-${c.temporada}`} className="btn-campeonato" key={idx} state={c} style={{background: `${c.escudo.colorPrimario}25`, color: `${c.escudo.colorSecundario}`}}>
                            <h4>{c.competicion}</h4>
                            <h4>{c.temporada}</h4>
                            <h6>{c.equipo}<img src={c.escudo.escudo} alt="escudo" /></h6>
                        </Link>
                    ))}
                </div>
                <JugadoresCampeones titulosxjugador={titulosxjugador} />
            </div>
        </div>
    )
}