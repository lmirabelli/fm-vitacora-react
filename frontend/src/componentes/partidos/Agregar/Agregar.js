import { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDatabaseList } from '../../../services/conexion';
import './Agregar.css';

export const Agregar = () => {
    const location = useLocation();
    const partidoAEditar = location.state?.partidoEditar; 

    const [dataPartido, setDataPartido] = useState({
        dia: '',
        mes: '',
        anio: '',
        temporada: '',
        miEquipo: '',
        rival: '',
        paisRival: '',
        competicion: '',
        condicion: '',
        estadio: '',
        ciudad: '',
        pais: '',
        golesFavor: '',
        golesContra: '',
        promedio: '',
        jugadores: Array(16).fill({ nombre: '', puntaje: '', id: '' }),
        penales: [],
        goles: []
    });

    const { data, loading, error } = useDatabaseList("http://localhost:4001/jugadores");
    const { data: dataPartidos, loading: loadingPartido, error: errorPartido } = useDatabaseList("http://localhost:4001/partidos/ultimoPartido");

    const ultimoPartido = dataPartidos?.ultimoPartido;
    const listaDeEstadios = dataPartidos?.listaDeEstadios;
    const listaDeJugadores = data?.listaDeJugadores || [];

    const buscarEstadio = () => {

        let estadiosFind = {estadio: "", ciudad: "", pais: ""}
        if(dataPartido.condicion === "local"){
            
            estadiosFind = listaDeEstadios.find( a => a.club === dataPartido.miEquipo)
        }else if(dataPartido.condicion === "visitante"){
            
            estadiosFind = listaDeEstadios.find( a => a.club === dataPartido.rival)
        }

        setDataPartido({
            ...dataPartido,
            estadio: estadiosFind?.estadio || "",
            ciudad: estadiosFind?.ciudad || "",
            pais: estadiosFind?.pais || ""
        })
        
    }

    useEffect(() => {
        if (partidoAEditar) {
            const p = partidoAEditar.partido;
            
            const mapearJugadores = Array(17).fill({ nombre: '', puntaje: '', id: '' });
            if (p.jugadores && Array.isArray(p.jugadores)) {
                p.jugadores.forEach((jug, index) => {
                    if (index < 17) {
                        mapearJugadores[index] = {
                            nombre: jug.nombre || jug.nombreCompleto || '',
                            id: jug.id || '',
                            puntaje: jug.puntaje || ''
                        };
                    }
                });
            }

            setDataPartido({
                dia: p.dia || '',
                mes: p.mes || '',
                anio: p.anio || '',
                temporada: p.temporada || '',
                miEquipo: p.miEquipo || '',
                rival: p.rival || '',
                paisRival: p.paisRival || '',
                competicion: p.competicion || '',
                condicion: p.condicion || '',
                estadio: p.estadio || '',
                ciudad: p.ciudad || '',
                pais: p.pais || '',
                golesFavor: '',
                golesContra: '',
                promedio: p.promedio || '',
                jugadores: mapearJugadores,
                penales: p.penales || [],
                goles: p.goles || []
            });
        } 
        else if (ultimoPartido) {
            setDataPartido(prev => ({
                ...prev,
                anio: ultimoPartido.anio || '',
                temporada: ultimoPartido.temporada || '',
                miEquipo: ultimoPartido.miEquipo || '',
                competicion: ultimoPartido.competicion || '',
                rival: ultimoPartido.rival || '',
                paisRival: ultimoPartido.paisRival || '',
                condicion: ultimoPartido.condicion || '',
                estadio: ultimoPartido.estadio || '',
                ciudad: ultimoPartido.ciudad || '',
                pais: ultimoPartido.pais || '',
                golesFavor: ultimoPartido.golesFavor || '',
                golesContra: ultimoPartido.golesContra || '',
                promedio: ultimoPartido.promedio || '',
            }));
        }
    }, [ultimoPartido, partidoAEditar]);

    const navigate = useNavigate();

    if (loading || loadingPartido) {
        return <div className='aviso'>cargando...</div>;
    }
    if (error || errorPartido) {
        return <div className='aviso'>Error al cargar los datos: {error?.message || errorPartido?.message}</div>;
    }

    const jugadoresActuales = listaDeJugadores.filter(a => a.situacion === "club");

    const handleChange = (e) => {
        const { id, value, type } = e.target;
        if (type === 'radio') {
            setDataPartido(prevState => ({
                ...prevState,
                condicion: value
            }));
        } else {
            setDataPartido(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
    };

    const handleJugadorChange = (e, index, campo) => {
        const { value } = e.target;
        setDataPartido(prev => {
            const nuevosJugadores = [...prev.jugadores];
            nuevosJugadores[index] = {
                ...nuevosJugadores[index],
                [campo]: value
            };
            return {
                ...prev,
                jugadores: nuevosJugadores
            };
        });
    };

    const encontrarPrimerCampoVacio = () => {
        for (let i = 0; i < 17; i++) {
            if (!dataPartido.jugadores[i].nombre || dataPartido.jugadores[i].nombre === '') {
                return i;
            }
        }
        return -1;
    };

    const seleccionarJugador = (jugador) => {
        const primerVacio = encontrarPrimerCampoVacio();
        
        if (primerVacio === -1) {
            alert('Todos los campos de jugadores están ocupados');
            return;
        }

        const yaAsignado = dataPartido.jugadores.some(j => j.id === jugador.id);
        if (yaAsignado) {
            alert('Este jugador ya está asignado');
            return;
        }

        setDataPartido(prev => {
            const nuevosJugadores = [...prev.jugadores];
            nuevosJugadores[primerVacio] = {
                nombre: jugador.nombreCompleto,
                id: jugador.id,
                puntaje: ''
            };
            return {
                ...prev,
                jugadores: nuevosJugadores
            };
        });
    };

    const eliminarJugador = (index) => {
        setDataPartido(prev => {
            const nuevosJugadores = [...prev.jugadores];
            nuevosJugadores[index] = { nombre: '', puntaje: '', id: '' };
            return {
                ...prev,
                jugadores: nuevosJugadores
            };
        });
    };

    const guardar = (e) => {
        e.preventDefault();
        // const URL = partidoAEditar 
        //     ? `http://localhost:4001/partidos/agregar/${partidoAEditar.partido.id}` 
        //     : 'http://localhost:4001/partidos/agregar';

        const URL = 'http://localhost:4001/partidos/agregar'
            
        const METODO =  'POST';

        fetch(URL, {
            method: METODO,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataPartido)
        })
        .then(response => response.json())
        .then(data => {
            navigate(`./goles`, {
                state: {
                    dia: dataPartido.dia,
                    mes: dataPartido.mes,
                    anio: dataPartido.anio,
                    gf: dataPartido.golesFavor,
                    rival: dataPartido.rival
                }
            });
        })
        .catch(error => console.error('Error:', error));
    };

    const jugadoresAsignados = dataPartido.jugadores.filter(j => j.nombre !== '').length;

    return (
        <div className="standard">
            <form onSubmit={guardar}>
                <div className="modulo-formulario">
                    <h4>{partidoAEditar ? 'Editar Fecha del Partido' : 'Fecha del Partido'}</h4>
                    <input 
                        type="number" 
                        className="w-10" 
                        id="dia" 
                        placeholder="00" 
                        min={1} 
                        max={31} 
                        value={dataPartido.dia} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="number" 
                        className="w-10" 
                        id="mes" 
                        placeholder="00" 
                        min={1} 
                        max={12} 
                        value={dataPartido.mes} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="number" 
                        className="w-20" 
                        id="anio" 
                        placeholder="0000" 
                        min={2000} 
                        max={9999} 
                        value={dataPartido.anio} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="number" 
                        className="w-20" 
                        id="temporada" 
                        placeholder="TEMPORADA" 
                        min={2000} 
                        max={9999} 
                        value={dataPartido.temporada} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                
                <div className="modulo-formulario">
                    <h4>Datos del Partido</h4>
                    <input 
                        type="text" 
                        className="w-80" 
                        id="miEquipo" 
                        placeholder="mi Equipo" 
                        value={dataPartido.miEquipo} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="text" 
                        className="w-40" 
                        id="rival" 
                        placeholder="rival" 
                        value={dataPartido.rival} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="text" 
                        className="w-40" 
                        id="paisRival" 
                        placeholder="pais del Rival" 
                        value={dataPartido.paisRival} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="text" 
                        className="w-80" 
                        id="competicion" 
                        placeholder="competicion" 
                        value={dataPartido.competicion} 
                        onChange={handleChange} 
                        required 
                    />
                    <h4 className="condicion-label">Condición del partido:</h4>
                    <div className="grupo-radio">
                        <label className="opciones-radio radio-local">
                            <input 
                                type="radio" 
                                name="condicion" 
                                value="local" 
                                checked={dataPartido.condicion === 'local'} 
                                onChange={handleChange} 
                                required 
                            />
                            <span>Local</span>
                        </label>
                        <label className="opciones-radio radio-visitante">
                            <input 
                                type="radio" 
                                name="condicion" 
                                value="visitante" 
                                checked={dataPartido.condicion === 'visitante'} 
                                onChange={handleChange} 
                                required 
                            />
                            <span>Visitante</span>
                        </label>
                        <label className="opciones-radio radio-neutral">
                            <input 
                                type="radio" 
                                name="condicion" 
                                value="neutral" 
                                checked={dataPartido.condicion === 'neutral'} 
                                onChange={handleChange} 
                                required 
                            />
                            <span>Neutral</span>
                        </label>
                        <button type="button" onClick={buscarEstadio}>Buscar Estadio</button>
                    </div>
                    <input 
                        type="text" 
                        className="w-30" 
                        id="estadio" 
                        placeholder="estadio" 
                        value={dataPartido.estadio} 
                        onChange={handleChange} 
                        required
                    />
                    <input 
                        type="text" 
                        className="w-30" 
                        id="ciudad" 
                        placeholder="ciudad" 
                        value={dataPartido.ciudad} 
                        onChange={handleChange} 
                        required
                    />
                    <input 
                        type="text" 
                        className="w-30" 
                        id="pais" 
                        placeholder="pais" 
                        value={dataPartido.pais} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                
                <div className="modulo-formulario">
                    <h4>Resultado</h4>
                    <input 
                        type="number" 
                        className="w-10" 
                        id="golesFavor" 
                        placeholder="00" 
                        min={0} 
                        max={99} 
                        value={dataPartido.golesFavor} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="number" 
                        className="w-10" 
                        id="golesContra" 
                        placeholder="00" 
                        min={0} 
                        max={99} 
                        value={dataPartido.golesContra} 
                        onChange={handleChange} 
                        required
                    />
                    <input 
                        type="number" 
                        className="w-10" 
                        title="Promedio del partido" 
                        id="promedio" 
                        placeholder="00" 
                        min={0} 
                        max={100} 
                        step="0.01" 
                        value={dataPartido.promedio} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                
                <div className='modulo-formulario jugadores-disponibles'>
                    <h4>Jugadores Disponibles:</h4>
                    <p style={{fontSize: '12px', color: '#666'}}>
                        {jugadoresAsignados}/16 jugadores asignados
                    </p>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                        {jugadoresActuales.map((j, idx) => {
                            const yaAsignado = dataPartido.jugadores.some(jug => jug.id === j.id);
                            
                            return (
                                <div 
                                    className='btn-jugador' 
                                    key={idx}
                                    onClick={() => !yaAsignado && seleccionarJugador(j)}
                                    style={{
                                        cursor: yaAsignado ? 'not-allowed' : 'pointer',
                                        padding: '5px 10px',
                                        backgroundColor: yaAsignado ? '#ccc' : '#4CAF50',
                                        color: yaAsignado ? '#666' : 'white',
                                        borderRadius: '4px',
                                        transition: 'all 0.3s ease',
                                        opacity: yaAsignado ? 0.6 : 1
                                    }}
                                    title={yaAsignado ? 'Ya está asignado' : 'Click para asignar'}
                                >
                                    {j.nombreCompleto}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className='modulo-formulario'>
                    <h4>Jugadores</h4>
                    {dataPartido.jugadores.map((jugador, idx) => {
                        const tieneJugador = jugador.nombre !== '';
                        
                        return (
                            <Fragment key={idx}>
                                {idx === 0 ? (<h6>TITULARES</h6>) : idx === 11 ? (<h6>SUPLENTES</h6>) : ""}
                                <div className='jugador-formulario'>
                                    <input 
                                        type='text' 
                                        className="w-60" 
                                        placeholder='jugador' 
                                        value={jugador.nombre}
                                        onChange={(e) => handleJugadorChange(e, idx, 'nombre')}
                                        style={{
                                            backgroundColor: tieneJugador ? '#e8f5e9' : 'white'
                                        }}
                                    />
                                    <input 
                                        type='text' 
                                        className="w-20" 
                                        placeholder='ID' 
                                        value={jugador.id}
                                        onChange={(e) => handleJugadorChange(e, idx, 'id')}
                                        style={{
                                            display: 'none'
                                        }}
                                    />
                                    <input 
                                        type='number' 
                                        className="w-20" 
                                        placeholder='00' 
                                        value={jugador.puntaje}
                                        onChange={(e) => handleJugadorChange(e, idx, 'puntaje')}
                                        min={0} 
                                        max={100} 
                                        step="0.01"
                                    />
                                    {tieneJugador && (
                                        <button 
                                            type="button"
                                            onClick={() => eliminarJugador(idx)}
                                            style={{
                                                marginLeft: '5px',
                                                padding: '2px 8px',
                                                backgroundColor: '#f44336',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '3px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </Fragment>
                        );
                    })}
                </div>

                <button className="btn-submit" type="submit">
                    {partidoAEditar ? 'GUARDAR CAMBIOS' : 'GUARDAR'}
                </button>
            </form>
        </div>
    );
};