import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDatabaseList } from "../../../services/conexion";
import { SubNavBar } from "../SubNavBar/SubNavBar";
import './Rivales.css'

export const Rivales = () => {

    useEffect(() => {
                    document.title = "RIVALES";
            
                    return () => {
                        document.title = "FM VITACORA";
                    };
                }, []);
        
                    const { data, loading, error } = useDatabaseList(
                    "http://localhost:4001/partidos/rivales"
                );
            
                if (loading) {
                    return <div className='aviso'>cargando...</div>;
                }
                if (error) {
                    return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                }
                let { tabla } = data
    return(
        <div className="standard">
            <SubNavBar />
            <div className="tabla-rivales">
                <h2>Rivales</h2>
                <div className="rival-titulo">
                        <div className="w-5"></div>
                        <div className="w-25">Rival</div>
                        <div className="w-5"></div>
                        <div className="w-5">PJ</div>
                        <div className="w-5">PG</div>
                        <div className="w-5">PE</div>
                        <div className="w-5">PP</div>
                        <div className="w-5">GF</div>
                        <div className="w-5">GC</div>
                        <div className="w-5">DIF</div>
                        <div className="w-25">Ultimo Partido</div>
                    </div>
                {tabla.map((rival,idx) => (
                    <Link to={`/partidos/${rival.url}`} className="rival" key={idx}>
                        <div className="w-5"><img src={rival.bandera} alt="bandera" className="bandera"/></div>
                        <div className="w-25">{rival.equipo}</div>
                        <div className="w-5"><img src={rival.escudo} alt="escudo" className="escudo" style={{animationDelay: `${0.12 * idx}s`}}/></div>
                        <div className="w-5">{rival.pg + rival.pe + rival.pp}</div>
                        <div className="w-5">{rival.pg}</div>
                        <div className="w-5">{rival.pe}</div>
                        <div className="w-5">{rival.pp}</div>
                        <div className="w-5">{rival.gf}</div>
                        <div className="w-5">{rival.gc}</div>
                        <div className="w-5">{rival.gf - rival.gc >= 0 ? `+${rival.gf - rival.gc}` : rival.gf - rival.gc}</div>
                        <div className="w-25">{rival.ultimoPartido}</div>
                    </Link>
                ))}
            </div>
        </div>
    )
}