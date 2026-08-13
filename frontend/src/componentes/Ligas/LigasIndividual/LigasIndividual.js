import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useDatabaseList } from "../../../services/conexion";
import './LigasIndividual.css'


export const LigasIndividual = () => {

    let {pais} = useParams()
    useEffect(() => {
                        document.title = "MENU DE LIGAS";
                
                        return () => {
                            document.title = "FM VITACORA";
                        };
                    }, []);
            
                        const { data, loading, error } = useDatabaseList(
                        `http://localhost:4001/ligas/${pais}`);
                
                    if (loading) {
                        return <div className='aviso'>cargando...</div>;
                    }
                    if (error) {
                        return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                    }
                    let { tablaCompleta } = data
    
                    console.log(data)

    return(
        <div className="standard">
            <div className="tabla-historica">
                <h2>Tabla Historica General - {pais}</h2>
                {tablaCompleta.map((p,idx) => (
                    <div className="posicion" style={{"--color-p": p.escudo.colorPrimario, "--color-s": p.escudo.colorSecundario}}key={idx}>
                        <div className="w-5">{idx + 1}</div>
                        <div className="w-5"><img src={p.escudo.escudo} alt="escudo" /></div>
                        <div className="w-20">{p.equipoNombreReal}</div>
                        <div className="w-5">{p.pg + p.pe + p.pp}</div>
                        <div className="w-5">{p.pg}</div>
                        <div className="w-5">{p.pe}</div>
                        <div className="w-5">{p.pp}</div>
                        <div className="w-5">{p.gf}</div>
                        <div className="w-5">{p.gc}</div>
                        <div className="w-5">{p.dif < 0 ? p.dif : `+${p.dif}`}</div>
                        <div className="w-8">{(p.ptsTotal).toFixed(1)}</div>
                        <div className="w-15">
                            {p.divisiones.map((d,idx2) => (
                                <div className="division" styles={{width: `${100 / p.divisiones.length - 0.5}%`}} key={idx2}>{d}</div>
                            ))}
                        </div>
                        <div className="w-10">{p.ultimaVez}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}