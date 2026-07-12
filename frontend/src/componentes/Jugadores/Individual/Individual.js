import { useEffect } from "react";
import { useDatabaseList } from "../../../services/conexion";
import { Link, useParams } from "react-router-dom";
import { SubNavBar } from "../SubNavBar/SubNavBar";
import './Individual.css'

export const Individual = () => {
    let id = useParams().id;

    const { data, loading, error } = useDatabaseList(
        `http://localhost:4001/jugadores/${id}`,
    );

    useEffect(() => {
        if (data?.jugador?.nombreCompleto) {
            document.title = data.jugador.nombreCompleto.toUpperCase();
        }

        return () => {
            document.title = "FM VITACORA";
        };
    }, [data]);

    if (loading) {
        document.title = "Cargando...";
        return <div className="aviso">cargando...</div>;
    }
    if (error) {
        document.title = "Error";
        return (
            <div className="aviso">
                Error al cargar los datos: {error.message}
            </div>
        );
    }

    let { jugador, partidos } = data;

    return (
        <div className="standard">
            {jugador.situacion === "club" && <SubNavBar />}
            <div className="info-jugador">
                <div className="contenedor-superior" style={{background: `${jugador.bandera.colorPrimario}a1`, color: `${jugador.bandera.colorSecundario}`}}>
                <h2>{jugador.nombreCompleto}</h2>
                {jugador.alias !== "" && <h5>{`${jugador.nombre} ${jugador.apellido}`}</h5>}
                <div className="contenedor-nacionalidad">
                    <img className="bandera" src={jugador.bandera.bandera} alt={jugador.nacionalidad} />
                    <p>{jugador.nacionalidad} - {jugador.fechaNacimiento}</p>
                </div>
                <div className="contenedor-cantera">
                    <p>Cantera: {jugador.cantera}</p>
                    <img src={jugador.escudoCantera.escudo} alt={jugador.cantera} />
                </div>
            </div>
            <div className="contenedor-etapas" style={{background: `${jugador.bandera.colorSecundario}80`}}>
                <h2 style={{color: `${jugador.bandera.colorPrimario}`}}>ETAPAS</h2>
                <div className="etapa">
                        <div className="w-5"></div>
                        <div className="w-25">Equipo</div>
                        <div className="w-5"></div>
                        <div className="w-20">LLEGADA</div>
                        <div className="w-20">SALIDA</div>
                        <div className="w-5"></div>
                        <div className="w-5">PJ</div>
                        <div className="w-5">G</div>
                        <div className="w-5">A</div>
                        <div className="w-5">MVP</div>
                    </div>
                {jugador.etapas.map((j,idx) => (
                    <div className="etapa" key={idx}>
                        <div className="w-5"><img src={j.escudoMiEquipo.escudo} alt={j.miEquipo} title={j.miEquipo} /></div>
                        <div className="w-25">{j.miEquipo}</div>
                        <div className="w-5"><img src={j.escudoAnterior.escudo} alt={j.clubAnterior} title={j.clubAnterior} /></div>
                        <div className="w-20">{j.fechaLlegada}</div>
                        <div className="w-20">{j.fechaSalida !== "00.00.0000" ? j.fechaSalida : "--"}</div>
                        <div className="w-5">{j.fechaSalida !== "00.00.0000" ? <img src={j.escudoPosterior.escudo} alt={j.clubPosterior} title={j.clubPosterior} /> : ""}</div>
                        <div className="w-5">{j.pj}</div>
                        <div className="w-5">{j.goles}</div>
                        <div className="w-5">{j.asistencias}</div>
                        <div className="w-5">{j.mvp}</div>
                    </div>
                ))}
            </div>
            <div className="contenedor-partidos">
                <h2>PARTIDOS</h2>
                <div className="partido" style={{marginBottom: "6px"}}>
                        <div className="w-5"></div>
                        <div className="w-15">fecha</div>
                        <div className="w-5"></div>
                        <div className="w-20">rival</div>
                        <div className="w-15">competicion</div>
                        <div className="w-10">resultado</div>
                        <div className="w-10">puntaje</div>
                        <div className="no-circuleado">g</div>
                        <div className="no-circuleado">a</div>
                    </div>
                {partidos.map((p, idx) => (
                    <Link to={`/partidos/${p.idPartido}`}className="partido" key={idx}>
                        <div className="w-5">{idx + 1}</div>
                        <div className="w-15">{p.fecha}</div>
                        <div className="w-5"><img src={p.escudo.escudo} alt="escudo" /></div>
                        <div className="w-20">{p.rival}</div>
                        <div className="w-15">{p.competicion}</div>
                        <div className="w-10">{p.resultado}</div>
                        <div className="w-10">{p.puntaje !== "0" ? p.puntaje : ""}</div>
                        <div className={p.goles > 0 ? "circuleado" : "no-circuleado"}>{p.goles > 0 ? p.goles : ""}</div>
                        <div className={p.asistencias > 0 ? "circuleado" : "no-circuleado"}>{p.asistencias > 0 ? p.asistencias : ""}</div>
                    </Link>
                ))}
            </div>
            </div>
        </div>
    );
};
