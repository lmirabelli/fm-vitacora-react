import { SubNavBar } from "../SubNavBar/SubNavBar"
import { useEffect } from "react";
import { useDatabaseList } from "../../../services/conexion";
import './Veteranos.css'


export const Veteranos = () => {

    useEffect(() => {
                        document.title = "VETERANOS";
                
                        return () => {
                            document.title = "FM VITACORA";
                        };
                    }, []);
            
                        const { data, loading, error } = useDatabaseList(
                        "http://localhost:4001/estadisticas/goles/veteranos"
                    );
                
                    if (loading) {
                        return <div className='aviso'>cargando...</div>;
                    }
                    if (error) {
                        return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
                    }
                    let { lista } = data
                    console.log(data)

    return(
        <div className="standard">
            <SubNavBar activar={"veteranos"}/>
            <div className="container-veterano">
                <h2>Veteranos</h2>
                <div className="titulo">
                    <div className="w-5"></div>
                    <div className="w-10">fecha</div>
                    <div className="w-7">Resultado Parcial</div>
                    <div className="w-15">goleador</div>
                    <div className="w-15">edad</div>
                    <div className="w-15">competicion</div>
                    <div className="w-15">asistente</div>
                    <div className="w-15">cuanto</div>
                </div>
                {lista.map((j,idx) => (
                    <div className="goleador" key={idx}>
                        <div className="w-5">{idx+1}</div>
                        <div className="w-10">{j.fechaGol}</div>
                        <div className="w-7">
                            <img src={j.miEquipo.escudo} alt="mi escudo" />
                            {j.resultadoParcial}
                            <img src={j.rival.escudo} alt="escudo rival" /></div>
                        <div className="w-15">{j.jugador}</div>
                        <div className="w-15">{j.edadGol}</div>
                        <div className="w-15">{j.competencia}</div>
                        <div className="w-15">{j.asistidor}</div>
                        <div className="w-15">{j.tiempoDelGol}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}