import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDatabaseList } from "../../../services/conexion";
import './EstadisticasEspecificas.css'
import { SubNavBar } from "../SubNavBar/SubNavBar";
import { SubMenu } from "./SubMenu/SubMenu";

export const EstadisticasEspecificas = () => {
    const {id} = useParams()

    useEffect(() => {
                document.title = id.toUpperCase();
        
                return () => {
                    document.title = "FM VITACORA";
                };
            }, [id]);
    
                const { data, loading, error } = useDatabaseList(
                "http://localhost:4001/estadisticas"
            );
        
            if (loading) {
                return <div className='aviso'>cargando...</div>;
            }
            if (error) {
                return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
            }
            let { estadisticas } = data
            let tablaFiltrada = estadisticas.filter(a => a[id] > 0)
            tablaFiltrada.sort((a,b) => (b[id] + b.minutos / 1000000) - (a[id] + a.minutos / 1000000))
    return(
        <div className="standard">
            <SubNavBar />
            <SubMenu />
            <div className="titulo-tabla">
                <h2>{id}</h2>
                <div className="w-5"></div>
                <div className="w-5"></div>
                <div className="w-20">Jugador</div>
                <div className="w-5">PJ</div>
                <div className="w-5">Min</div>
                <div className="w-5">G</div>
                <div className="w-5">A</div>
                <div className="w-5">TAP</div>
                <div className="w-5">PUNT</div>
                <div className="w-5">% G</div>
                <div className="w-5">PASES</div>
                <div className="w-5">% P</div>
                <div className="w-5">FC</div>
                <div className="w-5">TA</div>
                <div className="w-5">TR</div>
                <div className="w-5">MxP</div>
                <div className="w-5">MVP</div>
            </div>
            {tablaFiltrada.map((j,idx) => (
                <Link to={`/jugadores/${j.id}`} className="puesto-tabla" key={idx}>
                    <div className="w-5">{idx+1}</div>
                    <div className="w-5"><img src={j.nacionalidad} alt="bandera" className="bandera"/></div>
                    <div className="w-20">
                        {j.escudos.map((i, idx2) => (
                            <img src={i} alt="escudo" key={idx2}/>
                        ))}
                        {j.jugador}
                        {j.etapas.map((i, idx2) => (
                            <div className="periodo" key={idx2}>{i}</div>
                        ))}
                    </div>
                    <div className="w-5">{j.partidos}</div>
                    <div className="w-5">{j.minutos}</div>
                    <div className="w-5">{j.goles}</div>
                    <div className="w-5">{j.asistencias}</div>
                    <div className="w-5">{j.tirosPuerta}</div>
                    <div className="w-5">{isNaN(j.punteria) ? "-" : j.punteria}%</div>
                    <div className="w-5">{isNaN(j.efectividadGoles) ? "-" : j.efectividadGoles}%</div>
                    <div className="w-5">{j.pasesIntentados}</div>
                    <div className="w-5">{isNaN(j.efectividadPases) ? "-" : j.efectividadPases}%</div>
                    <div className="w-5">{j.faltasCometidas}</div>
                    <div className="w-5">{j.tarjetaAmarilla}</div>
                    <div className="w-5">{j.tarjetasRojas}</div>
                    <div className="w-5">{j.minutosxpartido}</div>
                    <div className="w-5">{j.jugadorDelPartido}</div>
                </Link>
            ))}
        </div>
    )
}