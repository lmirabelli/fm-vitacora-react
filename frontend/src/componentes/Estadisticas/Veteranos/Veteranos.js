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

    return(
        <div className="standard">
            <SubNavBar activar={"veteranos"}/>
            <div className="container-veterano">
                <h2>Veteranos</h2>
                <div className="titulo">
                    <div className="w-5"></div>
                    <div className="w-10">fecha</div>
                    <div className="w-15">Resultado Parcial</div>
                    <div className="w-15">goleador</div>
                    <div className="w-20">edad</div>
                    <div className="w-15">competicion</div>
                    <div className="w-15">asistente</div>
                </div>
                {lista.map((j,idx) => (
                    <div className="goleador" key={idx}>
                        <div className="w-5">{idx+1}</div>
                        <div className="w-10">{j.fechaDelPartido}</div>
                        <div className="w-15">
                            <img src={j.miEscudo} alt="mi escudo" />
                            {j.resultadoParcial}
                            <img src={j.rivalEscudo} alt="escudo rival" /></div>
                        <div className="w-15">{j.goleador}</div>
                        <div className="w-20">{`${j.edadAnios} años y ${j.edadDias} dias`}</div>
                        <div className="w-15">{j.competicion}</div>
                        <div className="w-15">{j.asistente}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}