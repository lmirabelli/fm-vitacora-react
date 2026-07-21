import { useState } from "react"


export const CargaJugadores = ({setActivo}) => {

    let [jugadoresLista, setJugadoresLista] = useState([])
    const cargarJugadores = (e) => {
        e.preventDefault()

        console.log("Datos cargados:", jugadoresLista)
    }
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
    return(
        <div className="carga-jugadores">
            <h2>CARGA DE JUGADORES</h2>
            <form onSubmit={cargarJugadores} className="fm-form">

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
    )
}