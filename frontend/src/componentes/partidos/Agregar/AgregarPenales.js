import { useState } from "react";

export const AgregarPenales = ({ data }) => {

    const [dataPenal, setDataPenal] = useState([]);
    const [mostrarPenales, setMostrarPenales] = useState(true);
    
    const [penalActual, setPenalActual] = useState({
        pateador: '',
        arqueroRival: '',
        momentum: 'partido',
        final: 'convertido'
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        
        if (type === 'radio') {
            setPenalActual(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setPenalActual(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const agregarPenal = () => {
        if (!penalActual.pateador.trim()) {
            alert('Por favor, ingresa el nombre del pateador');
            return;
        }


        let nuevoPenal = {
            id: Date.now(),
            pateador: penalActual.pateador,
            arqueroRival: penalActual.arqueroRival || 'Desconocido',
            momentum: penalActual.momentum,
            final: penalActual.final,
            rival: data.rival,
            dia: data.dia,
            mes: data.mes,
            anio: data.anio,
            miEquipo: data.miEquipo 
        };

        setDataPenal(prev => [...prev, nuevoPenal]);

        setPenalActual(prev => ({
            ...prev,
            pateador: '' 

        }));
    };

    const enviarPenales = (e) => {
        e.preventDefault();
        
        if (dataPenal.length === 0) {
            alert('No hay penales para guardar');
            return;
        }


        const datosEnviar = {
            partido: {
                dia: data.dia,
                mes: data.mes,
                anio: data.anio,
                miEquipo: data.miEquipo,
                rival: data.rival,
                golesFavor: data.golesFavor,
                golesContra: data.golesContra
            },
            penales: dataPenal
        };
        

        fetch('http://localhost:4001/partidos/agregar/penales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosEnviar)
        })
        .then(response => response.json())
        .then(data => {
            setDataPenal([]);
        setMostrarPenales(false);
        })
        .catch(error => console.error('❌ Error:', error));


    };

    const eliminarPenal = (id) => {
        setDataPenal(prev => prev.filter(penal => penal.id !== id));
    };

    return (
        <div className="standard">

            <form onSubmit={enviarPenales} style={{ display: mostrarPenales ? 'block' : 'none' }}>
                <div className="modulo-formulario">
                    <div className="penales">
                <h4>Penales agregados ({dataPenal.length})</h4>
                {dataPenal.length === 0 ? (
                    <p className="sin-penales">No hay penales agregados aún</p>
                ) : (
                    <div className="lista-penales">
                        {dataPenal.map((penal, index) => (
                            <div key={penal.id} className="penal-item">
                                <span className="penal-numero">{index + 1}</span>
                                <span className={`penal-final ${penal.final}`}>
                                    {penal.final === "convertido" ? `✅` : `❌`}
                                </span>
                                <span className="penal-pateador">{penal.pateador}</span>
                                <span className="penal-rival">vs {penal.rival}</span>
                                <button 
                                    type="button" 
                                    className="btn-eliminar"
                                    onClick={() => eliminarPenal(penal.id)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
                    <h4>Agregar penal</h4>
                    
                    <div className="jugador-formulario">
                        <label>Pateador:</label>
                        <input
                            type="text"
                            name="pateador"
                            placeholder="Nombre del pateador"
                            className="w-20"
                            value={penalActual.pateador}
                            onChange={handleChange}
                        />
                        <label>Arquero rival:</label>
                        <input
                            type="text"
                            name="arqueroRival"
                            placeholder="Nombre del arquero"
                            className="w-20"
                            value={penalActual.arqueroRival}
                            onChange={handleChange}
                        />
                    </div>
                        <div className="grupo-radio">
                            <label className="opciones-radio radio-local">
                                <input  
                                    type="radio" 
                                    name="momentum" 
                                    value="partido" 
                                    checked={penalActual.momentum === 'partido'} 
                                    onChange={handleChange} 
                                />
                                <span>Durante el partido</span>
                            </label>
                            <label className="opciones-radio radio-visitante">
                                <input  
                                    type="radio" 
                                    name="momentum" 
                                    value="tanda" 
                                    checked={penalActual.momentum === 'tanda'} 
                                    onChange={handleChange} 
                                />
                                <span>Tanda de penales</span>
                            </label>
                        </div>
                        <div className="grupo-radio">
                            <label className="opciones-radio radio-local">
                                <input  
                                    type="radio" 
                                    name="final" 
                                    value="convertido" 
                                    checked={penalActual.final === 'convertido'} 
                                    onChange={handleChange} 
                                />
                                <span>✅ Convertido</span>
                            </label>
                            <label className="opciones-radio radio-visitante">
                                <input  
                                    type="radio" 
                                    name="final" 
                                    value="fallado" 
                                    checked={penalActual.final === 'fallado'} 
                                    onChange={handleChange} 
                                />
                                <span>❌ Fallado</span>
                            </label>
                    </div>
                    <button 
                        type="button" 
                        onClick={agregarPenal} 
                        className="btn-click"
                    >
                        ➕ Agregar Penal
                    </button>
                    <button className="btn-submit" type="submit">
                    💾 GUARDAR TODOS LOS PENALES
                    </button>
                </div>
            </form>
        </div>
    );
};