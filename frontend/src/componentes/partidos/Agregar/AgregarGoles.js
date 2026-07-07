import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AgregarPenales } from './AgregarPenales';
import './Agregar.css'

export const AgregarGoles = () => {
    const location = useLocation();
    const data = location.state || {};
    const navigate = useNavigate()

    const [dataGoles, setDataGoles] = useState({
        goles: [] 
    });

    useEffect(() => {
        if (data.gf && data.gf > 0) {

            const golesArray = Array(Number(data.gf)).fill({
                min: '',
                goleador: '',
                asistente: '',
                gfParcial: '',
                gcParcial: ''
            });
            
            setDataGoles({
                goles: golesArray
            });
        }
    }, [data.gf]);

    const handleChange = (e) => {
        const { id, value } = e.target;

        const [campo, index] = id.split('-');
        const idx = parseInt(index);
        
        setDataGoles(prevState => {
            const nuevosGoles = [...prevState.goles];
            nuevosGoles[idx] = {
                ...nuevosGoles[idx],
                [campo]: value
            };
            return {
                ...prevState,
                goles: nuevosGoles
            };
        });
    };

    const agregarGoles = (e) => {
        e.preventDefault();
        

        const golesFormateados = dataGoles.goles.map((gol, index) => ({
            id: index + 1,
            minuto: gol.min || '0',
            goleador: gol.goleador || '',
            asistente: gol.asistente || '',
            gfParcial: gol.gfParcial || '0',
            gcParcial: gol.gcParcial || '0'
        }));
        
        const datosEnviar = {
            ...data,
            golesDetalle: golesFormateados
        };
        
        
        fetch('http://localhost:4001/partidos/agregar/goles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosEnviar)
        })
        .then(response => response.json())
        .then(data => {
            navigate("/partidos")
        })
        .catch(error => console.error('Error:', error));
    };

    return(
        <div className="standard">
            <AgregarPenales 
                data={{
                    dia: data.dia,
                    mes: data.mes,
                    anio: data.anio,
                    gf: data.golesFavor,
                    rival: data.rival
                }}
            />
            <form onSubmit={agregarGoles}>
                <div className='modulo-formulario'>
                    <h2>Goles vs {data.rival}</h2>
                    <p>{data.dia}.{data.mes}.{data.anio}</p>
                    {dataGoles.goles.length > 0 ? (
                        dataGoles.goles.map((gol, idx) => (
                            <div key={idx} className='gol-formulario'>
                                    <input 
                                        type='number' 
                                        placeholder='Min' 
                                        id={`min-${idx}`}
                                        min={1} 
                                        max={121}
                                        step="0.01"
                                        value={gol.min || ''} 
                                        onChange={handleChange}
                                        className='w-10'
                                    />
                                    <input 
                                        type='text' 
                                        placeholder='Goleador' 
                                        id={`goleador-${idx}`}
                                        value={gol.goleador || ''} 
                                        onChange={handleChange}
                                        className='w-30'
                                    />
                                    <input 
                                        type='text' 
                                        placeholder='Asistente' 
                                        id={`asistente-${idx}`}
                                        value={gol.asistente || ''} 
                                        onChange={handleChange}
                                        className='w-30'
                                    />
                                    <input 
                                        type='number' 
                                        placeholder='GF' 
                                        id={`gfParcial-${idx}`}
                                        min={0} 
                                        max={99} 
                                        value={gol.gfParcial || ''} 
                                        onChange={handleChange}
                                        className='w-10'
                                    />
                                    <input 
                                        type='number' 
                                        placeholder='GC' 
                                        id={`gcParcial-${idx}`}
                                        min={0} 
                                        max={99} 
                                        value={gol.gcParcial || ''} 
                                        onChange={handleChange}
                                        className='w-10'
                                    />
                            </div>
                        ))
                    ) : (
                        <p>No hay goles para registrar</p>
                    )}
                </div>
                
                {dataGoles.goles.length > 0 && (
                    <button className="btn-submit" type="submit">GUARDAR GOLES</button>
                )}
            </form>
        </div>
    );
};