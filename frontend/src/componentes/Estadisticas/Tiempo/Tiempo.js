import { SubNavBar } from "../SubNavBar/SubNavBar"
import { useEffect } from "react";
import { useDatabaseList } from "../../../services/conexion";
import './Tiempo.css'
import { Link } from "react-router-dom";


export const Tiempo = () => {

    useEffect(() => {
                        document.title = "X TRAMO DE PARTIDO";
                
                        return () => {
                            document.title = "FM VITACORA";
                        };
                    }, []);
            
                        const { data, loading, error } = useDatabaseList(
                        "http://localhost:4001/estadisticas/goles/minutos"
                    );
                
                    if (loading) {
                        return <div className='aviso'>cargando...</div>;
                    }
                    if (error) {
                        return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                    }
                    let { tabla } = data


    return(
        <>
        <SubNavBar activar={"minutos"}/>
        <div className="standard tabla-tiempo">
            <h2>Minutos</h2>
            <div className="titulo">
                <div className="w-5"></div>
                <div className="w-5"></div>
                <div className="w-25">Goleador</div>
                <div className="w-15">Etapa</div>
                <div className="w-5" style={{background:"#00538098"}}>Total</div>
                <div className="w-5" style={{background:"#00801398"}}>0-15</div>
                <div className="w-5" style={{background:"#00801398"}}>16-30</div>
                <div className="w-5" style={{background:"#00801398"}}>31-45</div>
                <div className="w-5" style={{background:"#806b0098"}}>46-60</div>
                <div className="w-5" style={{background:"#806b0098"}}>61-75</div>
                <div className="w-5" style={{background:"#806b0098"}}>76-90</div>
                <div className="w-5" style={{background:"#80000098"}}>TE1</div>
                <div className="w-5" style={{background:"#80000098"}}>TE2</div>
            </div>
            {tabla.map((j, idx) => (
                <Link to={`/jugadores/${j.id}`} className="goleador" key={idx}>
                    <div className="w-5">{idx + 1}</div>
                    <div className="w-5"><img src={j.bandera} alt="bandera" className="bandera"/></div>
                    <div className="w-25">{j.goleador}</div>
                    <div className="w-15">{j.etapa}</div>
                    <div className="w-5" style={{background:"#00538098"}}>{j.total}</div>
                    <div className="w-5" style={{background:"#00801398"}}>{j.tramo1}</div>
                    <div className="w-5" style={{background:"#00801398"}}>{j.tramo2}</div>
                    <div className="w-5" style={{background:"#00801398"}}>{j.tramo3}</div>
                    <div className="w-5" style={{background:"#806b0098"}}>{j.tramo4}</div>
                    <div className="w-5" style={{background:"#806b0098"}}>{j.tramo5}</div>
                    <div className="w-5" style={{background:"#806b0098"}}>{j.tramo6}</div>
                    <div className="w-5" style={{background:"#80000098"}}>{j.extra1}</div>
                    <div className="w-5" style={{background:"#80000098"}}>{j.extra2}</div>
                </Link>
            ))}
        </div>
        </>)
}