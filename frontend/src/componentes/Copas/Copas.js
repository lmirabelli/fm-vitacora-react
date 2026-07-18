import { SubmenuFlotante } from "./SubmenuFlotante/SubmenuFlotante"
import { Fragment, useEffect } from "react";
import { useDatabaseList } from "../../services/conexion";
import { Link } from "react-router-dom";
import './Copas.css'




export const Copas = () => {

    const { data, loading, error } = useDatabaseList(`http://localhost:4001/copas`);
    useEffect(() => {
                        document.title = `Menu Copas (${data.copasSegmentadas?.length})`;
                
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
                    let { copasSegmentadas } = data

    return(
        <div className="standard">
            <SubmenuFlotante />
            <h2>COPAS</h2>
            {copasSegmentadas.map((pais,idx) => (
                <div className="contenedor-pais" key={idx}>
                    <h4>{pais.pais}</h4>
                    {pais.copas.map((copa,idxCopa) => (
                        <Fragment key={idxCopa}>
                            <div className="copa">
                            <div className="w-15">{copa.copa}</div>
                            <div className="w-85">
                                {copa.temporadas.map((t, idxTemporada) => (
                                    <Link to={`/copas/${pais.pais}/${copa.copa}/${t.temporada}`} className={`w-5 ${t.tipo}`} key={idxTemporada}>
                                        {t.temporada}
                                    </Link>
                                ))}
                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}
                </div>
            ))}
        </div>
    )
}