import { useParams, Link } from "react-router-dom"
import { useDatabaseList } from "../../../services/conexion";
import './PlantelIndividual.css'


export const PlantelIndividual = () => {

    let {temporada,equipo} = useParams()

    document.title = `${temporada} - ${equipo}`;
    
        const { data, loading, error } = useDatabaseList(
            `http://localhost:4001/planteles/${temporada}/${equipo}`,
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
        let { plantel } = data;
        console.log(plantel)

    return(
        <div className="standard plantel" style={{background: `${plantel.escudo.colorPrimario}80`}}>
            <h2 style={{color: `${plantel.escudo.colorSecundario}`,textShadow: `0 0 4px ${plantel.escudo.colorPrimario}`}}><img src={plantel.escudo.escudo} alt="escudo" />{plantel.equipo.slice(0,-6)} - {plantel.temporada}</h2>
            <div className="titulo" style={{color: `${plantel.escudo.colorSecundario}`}}>
                    <div className="w-3 tcenter"></div>
                    <div className="w-20">Jugador</div>
                    <div className="w-10 tcenter">POS</div>
                    <div className="w-5 tcenter">PJ</div>
                    <div className="w-5 tcenter">MIN</div>
                    <div className="w-5 tcenter">MIN/PJ</div>
                    <div className="w-5 tcenter">G</div>
                    <div className="w-5 tcenter">MIN/G</div>
                    <div className="w-5 tcenter">A</div>
                    <div className="w-5 tcenter">XG</div>
                    <div className="w-5 tcenter">XA</div>
                    <div className="w-5 tcenter">XGE</div>
                </div>
            {plantel.jugadores.map((j,idx) => (
                <Link to={`/jugadores/${j.id}`} className="jugador" key={idx} style={{color: `${plantel.escudo.colorSecundario}`}}>
                    <div className="w-3 tcenter">{j.dorsal}</div>
                    <div className="w-20">{j.jugador}<img src={j.bandera} alt="nacionalidad" className="bandera" /></div>
                    <div className="w-10 tcenter">{j.posicion}</div>
                    <div className="w-5 tcenter">{j.pj > 0 ? j.pj : "-"}</div>
                    <div className="w-5 tcenter">{j.minutos > 0 ? j.minutos : "-"}</div>
                    <div className="w-5 tcenter">{j.pj > 0 ? (j.minutos / j.pj).toFixed(0) : "-"}</div>
                    <div className="w-5 tcenter">{j.goles > 0 ? j.goles : "-"}</div>
                    <div className="w-5 tcenter">{j.goles > 0 ? (j.minutos / j.goles).toFixed(0) : "-"}</div>
                    <div className="w-5 tcenter">{j.asistencias > 0 ? j.asistencias : "-"}</div>
                    <div className="w-5 tcenter">{j.xg > 0 ? j.xg : "-"}</div>
                    <div className="w-5 tcenter">{j.xa > 0 ? j.xa : "-"}</div>
                    <div className="w-5 tcenter">{j.xge < 0 ? j.xge : "-"}</div>
                </Link>
            ))}
        </div>
    )
}