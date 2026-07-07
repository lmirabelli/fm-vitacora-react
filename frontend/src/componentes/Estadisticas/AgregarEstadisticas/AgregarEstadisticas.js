import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AgregarEstadisticas = () => {
    const [metaData, setMetaData] = useState({
        temporada: '',
        equipo: '',
        competicion: ''
    });

    let navigate = useNavigate()

    const [jugadoresLista, setJugadoresLista] = useState([]);

    const handleMetaChange = (e) => {
        const { name, value } = e.target;
        setMetaData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const cargarFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const htmlContent = event.target.result;
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');
            
            const filas = doc.querySelectorAll('table tr');
            if (filas.length < 2) {
                alert('No se encontraron tablas válidas en el reporte HTML.');
                return;
            }

            const encabezados = Array.from(filas[0].querySelectorAll('th')).map(th => th.textContent.trim());

            const resultadoJugadores = [];
            for (let i = 1; i < filas.length; i++) {
                const celdas = filas[i].querySelectorAll('td');
                if (celdas.length === 0) continue;

                const jugadorObjeto = {};
                celdas.forEach((celda, index) => {
                    const key = encabezados[index] || `columna_${index}`;
                    jugadorObjeto[key] = celda.textContent.trim();
                });

                resultadoJugadores.push(jugadorObjeto);
            }

            setJugadoresLista(resultadoJugadores);
        };

        reader.readAsText(file);
    };

    const enviarEstadisticas = async (e) => {
        e.preventDefault();

        if (jugadoresLista.length === 0) {
            alert('Por favor, primero selecciona un reporte HTML válido con jugadores.');
            return;
        }

        const payload = {
            temporada: parseInt(metaData.temporada, 10),
            equipo: metaData.equipo,
            competicion: metaData.competicion,
            jugadores: jugadoresLista
        };

        try {
            const response = await fetch('http://localhost:4001/estadisticas/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('¡Estadísticas de la plantilla guardadas con éxito!');
                navigate(`/planteles/${metaData.temporada}/${metaData.equipo}`)
            } else {
                const errorData = await response.json().catch(() => ({}));
                alert(`Error al guardar: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Error de red al enviar estadísticas:', error);
            alert('Error de conexión con el servidor.');
        }
    };

    return (
        <div className="standard">
            <h2>AGREGAR ESTADÍSTICAS</h2>

            <form onSubmit={enviarEstadisticas} className="fm-form">
                <div className="datos-equipo">
                    <input 
                        type="number" 
                        name="temporada" 
                        placeholder="0000" 
                        value={metaData.temporada}
                        onChange={handleMetaChange}
                        required 
                    />
                    <input 
                        type="text" 
                        name="equipo" 
                        placeholder="equipo (xxx)" 
                        value={metaData.equipo}
                        onChange={handleMetaChange}
                        required 
                    />
                    <input 
                        type="text" 
                        name="competicion" 
                        placeholder="competicion" 
                        value={metaData.competicion}
                        onChange={handleMetaChange}
                        required 
                    />
                </div>

                <div style={{ marginBottom: '30px', padding: '15px', background: '#f5f5f5', borderRadius: '6px' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                        Seleccionar reporte HTML del FM:
                    </label>
                    <input 
                        type="file" 
                        accept=".html" 
                        onChange={cargarFile} 
                        style={{ fontSize: '14px' }}
                    />
                    {jugadoresLista.length > 0 && (
                        <p style={{ margin: '8px 0 0 0', color: 'green', fontSize: '13px', fontWeight: '500' }}>
                            ✓ Reporte procesado correctamente. Se detectaron {jugadoresLista.length} jugadores.
                        </p>
                    )}
                </div>

                <button type="submit" className="submit-btn">
                    Guardar Estadísticas
                </button>
            </form>
        </div>
    );
};