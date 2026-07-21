import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useDatabaseList } from "../../../services/conexion"
import { SubNavBar } from "../SubNavBar/SubNavBar"


export const EstadisticasPartidos = ({dato}) => {

    useEffect(() => {
                        document.title = dato.toUpperCase();
                
                        return () => {
                            document.title = "FM VITACORA";
                        };
                    }, [dato]);
            
                        const { data, loading, error } = useDatabaseList(
                        `http://localhost:4001/partidos/stats/${dato}`
                    );
                
                    if (loading) {
                        return <div className='aviso'>cargando...</div>;
                    }
                    if (error) {
                        return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                    }
                    let { tabla } = data
                    console.log(dato)
    return(
        <div className="standard">
            <SubNavBar />
            <div className="tabla-rivales">
            <h2>{dato === "anio" ? "año calendario" : dato === "miEquipo" ? "mis equipos" : dato}</h2>
                <div className="rival-titulo">
                        <div className="w-5"></div>
                        <div className="w-25">{dato === "anio" ? "año calendario" : dato === "miEquipo" ? "mis equipos" : dato}</div>
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
                {tabla.map((d,idx) => (
                    <Link to={dato === "competicion" ? `./${d.data}` : ""} state={d} className="rival" key={idx}>
                        <div className="w-5"></div>
                        <div className="w-25">{d.data}</div>
                        <div className="w-5">{dato === "miEquipo" && <img src={d.escudo.escudo} alt="escudo" className="escudo" style={{animationDelay: `${0.12 * idx}s`}}/>}</div>
                        <div className="w-5">{d.pg + d.pe + d.pp}</div>
                        <div className="w-5">{d.pg}</div>
                        <div className="w-5">{d.pe}</div>
                        <div className="w-5">{d.pp}</div>
                        <div className="w-5">{d.gf}</div>
                        <div className="w-5">{d.gc}</div>
                        <div className="w-5">{d.gf - d.gc >= 0 ? `+${d.gf - d.gc}` : d.gf - d.gc}</div>
                        <div className="w-25">{d.ultimoPartido}</div>
                    </Link>
                ))}
            </div>
        </div>
    )
}