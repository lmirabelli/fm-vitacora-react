import { SubmenuFlotante } from "./SubmenuFlotante/SubmenuFlotante"
import { Fragment, useEffect } from "react";
import { useDatabaseList } from "../../services/conexion";
import { Link } from "react-router-dom";
import './Copas.css'




export const Copas = () => {

    const { data, loading, error } = useDatabaseList(`http://localhost:4001/copas`);
    useEffect(() => {
                        document.title = `Menu Copas (${data.copas?.length})`;
                
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
                    console.log(data)


    return(
        <div className="standard">
            <SubmenuFlotante />
            <h2>COPAS</h2>
            {copasSegmentadas.map((pais,idx) => (
                <div className="contenedor-pais" key={idx}>
                    <h4>{pais.pais}</h4>
                    {pais.copas.map((copa,idxCopa) => (
                        <Fragment>
                            <div className="copa" key={idxCopa}>
                            <div className="w-15">{copa.copa}</div>
                            <div className="w-85">
                                {copa.temporadas.map((t, idxTemporada) => (
                                    <Link to={`/copas/${copa.copa}/${t.temporada}`} className={`w-5 ${t.tipo}`} key={idxTemporada}>
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