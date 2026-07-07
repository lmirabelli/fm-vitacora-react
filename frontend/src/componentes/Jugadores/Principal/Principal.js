import { Link } from 'react-router-dom';
import {useDatabaseList} from '../../../services/conexion'
import { useEffect } from 'react';
import './Principal.css'
import { SubNavBar } from '../SubNavBar/SubNavBar';

export const PrincipalJugadores = () => {

    useEffect(() => {
            document.title = "TODOS LOS JUGADORES";
    
            return () => {
                document.title = "FM VITACORA";
            };
        }, []);

            const { data, loading, error } = useDatabaseList(
            "http://localhost:4001/jugadores"
        );
    
        if (loading) {
            return <div className='aviso'>cargando...</div>;
        }
        if (error) {
            return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
        }
        let { listaDeJugadores } = data

    return(
        <div className="standard">
            <SubNavBar />
            <div className='jugadores-listado'>
                <h3>Todos los Jugadores</h3>
                    <div className='jugador-titular'>
                        <div className='w-5'></div>
                        <div className='w-15'>Jugador</div>
                        <div className='w-10'>Nacimiento</div>
                        <div className='w-5'></div>
                        <div className='w-15'>
                            Cantera
                        </div>
                        <div className='w-25'>
                            Llegada
                        </div>
                        <div className='w-25'>
                            Salida
                        </div>
                    </div>
                {listaDeJugadores.map((j,idx) => (
                    <Link to={`/jugadores/${j.id}`} className='jugador-linea' key={idx}>
                        <div className='w-5'><img src={j.etapas[j.cantidadEtapas -1].escudoMiEquipo.escudo} alt="mi club" /></div>
                        <div className='w-15'>{j.alias === "" ? j.nombreCompleto : j.alias}</div>
                        <div className='w-10'>{j.fechaNacimiento}</div>
                        <div className='w-5'><img src={j.bandera.bandera} alt="nacionalidad" className='bandera' /></div>
                        <div className='w-15'>
                            <div className='w-90'>{j.cantera}</div>
                            <div className='w-10'><img src={j.escudoCantera.escudo} alt="mi club" /></div>
                        </div>
                        <div className='w-25'>
                            <div className='w-60'>{j.etapas[j.cantidadEtapas - 1].clubAnterior}</div>
                            <div className='w-35'>{j.etapas[j.cantidadEtapas - 1].fechaLlegada} ({j.etapas[j.cantidadEtapas - 1].edadLlegada})</div>
                            <div className='w-5'>{j.etapas[j.cantidadEtapas -1].escudoAnterior.estado !== "sinEscudo" ? <img src={j.etapas[j.cantidadEtapas - 1].escudoAnterior.escudo} alt="llegada" /> : ""}</div>
                        </div>
                        <div className='w-25'>
                            <div className='w-60'>{j.etapas[j.cantidadEtapas - 1].fechaSalida === "00.00.0000" ? "...en el club" : `${j.etapas[j.cantidadEtapas - 1].clubPosterior} (${j.etapas[j.cantidadEtapas - 1].edadSalida})`}</div>
                            <div className='w-35'>{j.etapas[j.cantidadEtapas - 1].fechaSalida === "00.00.0000" ? "" : j.etapas[j.cantidadEtapas - 1].fechaSalida}</div>
                            <div className='w-5'>{j.etapas[j.cantidadEtapas -1].escudoPosterior.estado !== "sinEscudo" ? <img src={j.etapas[j.cantidadEtapas - 1].escudoPosterior.escudo} alt="salida" /> : ""}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}