import { Link } from 'react-router-dom';
import {useDatabaseList} from '../../../services/conexion'
import { useEffect } from 'react';
import './Principal.css'
import { SubNavBar } from '../SubNavBar/SubNavBar';
import { useState } from 'react';

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

        const [listaFiltrada, setListaFiltrada] = useState([])
        
        useEffect(() => {
        if (data?.listaDeJugadores) {
            setListaFiltrada(data.listaDeJugadores);
        }
    }, [data]);
        
        if (loading) {
            return <div className='aviso'>cargando...</div>;
        }
        if (error) {
            return <div className='aviso'>Error al cargar los datos: {error.message}</div>;
        }

        let { listaDeJugadores } = data
        const estadoJugador = (fecha) => {

            let estado = "desconocido"
            estado = fecha === "00.00.0000" ? "dentro" : "fuera"

            return estado
        }

        let nacionalidades = []
        let fechasDeNacimiento = []

        listaDeJugadores.forEach(j => {
            
            !nacionalidades.find(a => a.pais === j.nacionalidad) && nacionalidades.push({pais: j.nacionalidad, bandera: j.bandera.bandera})
            !fechasDeNacimiento.find(a => a === parseInt(j.fechaNacimiento.slice(-4))) && fechasDeNacimiento.push(parseInt(j.fechaNacimiento.slice(-4)))

        });
        nacionalidades.sort((a,b) => a.pais < b.pais ? -1 : a.pais > b.pais ? 1 : 0)
        fechasDeNacimiento.sort((a,b) => a - b)

    return(
        <div className="standard">
            <SubNavBar />
            <div className='jugadores-listado'>
                <Link to="/analisisContrato" className='btn-menu-container'>Contratos</Link>
                <div className='container-filtros'>
                    <h4>Filtros Generales</h4>
                    <button className='btn-filtro' onClick={() => setListaFiltrada(listaDeJugadores)}>Todos</button>
                    <button className='btn-filtro' onClick={() => setListaFiltrada(listaDeJugadores.filter(a => a.situacion === "club"))}> En el club</button>
                    <button className='btn-filtro' onClick={() => setListaFiltrada(listaDeJugadores.filter(a => a.situacion === "fuera"))}> Fuera del Club</button>
                    <button className='btn-filtro' onClick={() => setListaFiltrada(listaDeJugadores.filter(a => a.etapas[a.cantidadEtapas - 1].clubPosterior === "...libre"))}> Liberados</button>
                    <button className='btn-filtro' onClick={() => setListaFiltrada(listaDeJugadores.filter(a => a.etapas[a.cantidadEtapas - 1].clubPosterior === "...retiro"))}> Retirados</button>
                </div>
                <div className='container-filtros'>
                    <h4>nacionalidad</h4>
                    {nacionalidades.map((btn, idx) => (
                        <button className='img-filtro-bandera' key={idx} onClick={() => setListaFiltrada(listaDeJugadores.filter(a => a.nacionalidad === btn.pais))}><img src={btn.bandera} alt='bandera' /></button>
                    ))}
                </div>
                <div className='container-filtros'>
                    <h4>Año de Nacimiento</h4>
                    {fechasDeNacimiento.map((btn, idx) => (
                        <button className='btn-filtro' key={idx} onClick={() => setListaFiltrada(listaDeJugadores.filter(a => parseInt(a.fechaNacimiento.slice(-4)) === btn))}>{btn}</button>
                    ))}
                </div>
                <h3>Lista de Jugadores ({listaFiltrada.length})</h3>
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
                {listaFiltrada.map((j,idx) => (
                    <Link to={`/jugadores/${j.id}`} className={`jugador-linea ${estadoJugador(j.etapas[j.cantidadEtapas -1].fechaSalida)}`} key={idx}>
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