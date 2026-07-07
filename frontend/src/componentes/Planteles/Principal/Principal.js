import { SubNavBar } from "../SubNavBar/SubNavBar"
import { useEffect } from "react";
import { useDatabaseList } from "../../../services/conexion";
import { Link } from "react-router-dom";
import './Principal.css'




export const PrincipalPlantel = () => {

    useEffect(() => {
            document.title = "PLANTELES";
    
            return () => {
                document.title = "FM BITACORA";
            };
        }, []);
    
        const { data, loading, error } = useDatabaseList(
            "http://localhost:4001/planteles",
        );
    
        if (loading) {
            return <div className="aviso">cargando...</div>;
        }
        if (error) {
            return (
                <div className="aviso">
                    Error al cargar los datos: {error.message}
                </div>
            );
        }
        let { planteles } = data;

    return(
        <div className="standard">
            <SubNavBar />
            <div className="planteles-contenedor">
                {planteles.map((p, idx) => (
                <Link to={`/planteles/${p.temporada}/${p.equipo}`} className="plantel" key={idx} style={{background: `${p.escudo.colorPrimario}95`, color: `${p.escudo.colorSecundario}`, '--url-escudo': `url(${p.escudo.escudo})`}}>
                    <h2>{p.equipo.slice(0,-6)}</h2>
                    <h5>{p.competicion}</h5>
                    <h3>{p.temporada}</h3>
                </Link>
            ))}
            </div>
        </div>
    )
}