import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDatabaseList } from "../../../../services/conexion";
import './MaximosRivales.css'

export const MaximosRivales = () => {

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

                tabla.forEach(t => {
                    t.ptsPos = t.pg + t.pe + t.pp + (t.url / 1000000)
                });

                tabla.sort((a,b) => b.ptsPos - a.ptsPos)
                const topCinco = tabla.slice(0,5)

                const calcularPartidos = (pg,pp) => {
                    let color = '#00000032'
                    pg > pp ? color = "#00750075" : pg < pp ? color = "#75000075" : color = "#75750075"

                    return color
                }
    return(
        <div className="maximos-rivales">
            <h3>Maximos Rivales</h3>
            {topCinco.map((t,idx) => (
                <Link to={`/partidos/${t.url}`} className="rival-minicard" key={idx} style={{background: calcularPartidos(t.pg,t.pp)}}>
                    <div><img src={t.escudo} alt="escudo" />{t.equipo}</div>
                    <div>{`${t.pg}-${t.pe}-${t.pp}  ${t.gf}:${t.gc}`}</div>
                    <div>{t.ultimoPartido}</div>
                </Link>
            ))}
        </div>
    )
}