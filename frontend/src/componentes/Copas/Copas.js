import { SubmenuFlotante } from "./SubmenuFlotante/SubmenuFlotante"
import { useEffect } from "react";
import { useDatabaseList } from "../../services/conexion";
import { Link } from "react-router-dom";
import './Copas.css'




export const Copas = () => {

    const { data, loading, error } = useDatabaseList(`http://localhost:4001/copas`);
    useEffect(() => {
                        document.title = `Menu Copas`;
                
                        return () => {
                            document.title = "FM VITACORA";
                        };
                    }, [data]);
                
                    if (loading) {
                        return <div className='aviso'>cargando...</div>;
                    }
                    if (error) {
                        return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                    }
                    let  {copasSegmentadas}  = data
    return(
        <div className="standard">
            <SubmenuFlotante />
            {copasSegmentadas.map((i, idx) => (
                <div className="contenedor-pais" key={idx}>
                    <h4>{i.pais}</h4>
                    {i.copas.map((j,idx2) => (
                        <div className="copa" key={idx2}>
                            <div className="w-15">{j.copa}</div>
                            <div className="w-85">
                                {j.temporadas.map((k,idx3) => (
                                    <Link to={`/copas/${i.pais}/${j.copa}/${k.temporada}`} className={`w-5 ${k.tipo}`} key={idx3}>{k.temporada}</Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}