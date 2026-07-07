import { useState } from "react"
import './CargaMasiva.css'

export const CargaMasiva = () => {
    const [archivoCargado, setArchivoCargado] = useState(false)
    const [nombreArchivo, setNombreArchivo] = useState("")
    const [jugadores, setJugadores] = useState([])
    const [mensaje, setMensaje] = useState("")
    const [cargando, setCargando] = useState(false)
    
    const [valoresGlobales, setValoresGlobales] = useState({
        diaLlegada: "",
        mesLlegada: "",
        anioLlegada: "",
        clubAnterior: "",
        miEquipo: "",
        precioCompra: 0
    })

    const extraerJugadoresDelHTML = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const tablas = doc.querySelectorAll('table');
        const jugadores = [];
        
        tablas.forEach((tabla, index) => {
            const trs = tabla.querySelectorAll('tr');
            trs.forEach((tr, trIndex) => {
                const celdas = tr.querySelectorAll('td');
                const datosFila = [];
                celdas.forEach(td => {
                    datosFila.push(td.textContent.trim());
                });
                
                if(datosFila.length > 0 && datosFila[2] && datosFila[3] && datosFila[4]){
                    let separadorNombre = datosFila[2].search(" ")
                    let separadorDia = datosFila[3].indexOf("/")
                    let separadorMes = datosFila[3].lastIndexOf("/")
                    let separadorAnio = datosFila[3].search(" ")

                    const nombre = datosFila[2].slice(0, separadorNombre) || ""
                    const apellido = datosFila[2].slice(separadorNombre + 1) || ""
                    const dia = datosFila[3].slice(0, separadorDia) || ""
                    const mes = datosFila[3].slice(separadorDia + 1, separadorMes) || ""
                    const anio = datosFila[3].slice(separadorAnio - 4, separadorAnio) || ""
                    const nacionalidad = datosFila[4]

                    jugadores.push({
                        id: datosFila[5] || "",
                        nombre: nombre.toLowerCase().trim(),
                        apellido: apellido.toLowerCase().trim(),
                        diaNacimiento: dia.trim(),
                        mesNacimiento: mes.trim(),
                        anioNacimiento: anio.trim(),
                        alias: "",
                        nacionalidad: nacionalidad.toLowerCase().trim(),
                        cantera: "",
                        diaLlegada: valoresGlobales.diaLlegada,
                        mesLlegada: valoresGlobales.mesLlegada,
                        anioLlegada: valoresGlobales.anioLlegada,
                        clubAnterior: valoresGlobales.clubAnterior,
                        miEquipo: valoresGlobales.miEquipo,
                        precioCompra: valoresGlobales.precioCompra,
                        diaSalida: "",
                        mesSalida: "",
                        anioSalida: "",
                        clubPosterior: ""
                    });
                }
            });
        });
        
        console.log(jugadores)
        return jugadores;
    }

    const handleGlobalChange = (field, value) => {
        setValoresGlobales(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNombreArchivo(file.name);
            
            if (!valoresGlobales.diaLlegada || !valoresGlobales.mesLlegada || 
                !valoresGlobales.anioLlegada || !valoresGlobales.clubAnterior || !valoresGlobales.miEquipo) {
                setMensaje("⚠️ Por favor complete todos los campos globales antes de cargar el archivo");
                return;
            }
            
            setArchivoCargado(true);
            
            const reader = new FileReader();
            
            reader.onload = (event) => {
                const contenido = event.target.result;
                const trsEncontrados = extraerJugadoresDelHTML(contenido);
                setJugadores(trsEncontrados);
                setMensaje(`✅ Archivo cargado: ${trsEncontrados.length} jugadores encontrados`);
            };
            
            reader.onerror = (error) => {
                console.error("❌ Error al leer el archivo:", error);
                setMensaje("❌ Error al leer el archivo");
            };
            
            reader.readAsText(file);
        }
    };

    const handleReset = () => {
        setArchivoCargado(false);
        setNombreArchivo("");
        setJugadores([]);
        setMensaje("");
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.value = "";
    };

    const handleInputChange = (index, field, value) => {
        const nuevosJugadores = [...jugadores];
        nuevosJugadores[index] = {
            ...nuevosJugadores[index],
            [field]: value
        };
        setJugadores(nuevosJugadores);
    };

    const enviarJugador = async (index) => {
        const jugador = jugadores[index];
        setCargando(true);
        setMensaje("");

        try {
            const response = await fetch('http://localhost:4001/jugadores/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jugador)
            });

            if (!response.ok) throw new Error('Error al guardar');

            setMensaje(`✅ Jugador ${jugador.nombre} ${jugador.apellido} guardado exitosamente`);
            
            const nuevosJugadores = jugadores.filter((_, i) => i !== index);
            setJugadores(nuevosJugadores);
            
        } catch (error) {
            console.error('Error:', error);
            setMensaje(`❌ Error al guardar el jugador ${jugador.nombre} ${jugador.apellido}`);
        } finally {
            setCargando(false);
        }
    };

    const enviarTodosLosJugadores = async () => {
        setCargando(true);
        setMensaje("");
        let exitosos = 0;
        let fallidos = 0;

        for (const jugador of jugadores) {
            try {
                const response = await fetch('http://localhost:4001/jugadores/agregar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(jugador)
                });

                if (response.ok) {
                    exitosos++;
                } else {
                    fallidos++;
                }
            } catch (error) {
                fallidos++;
                console.error('Error:', error);
            }
        }

        setMensaje(`✅ ${exitosos} jugadores guardados exitosamente. ${fallidos > 0 ? `❌ ${fallidos} fallaron.` : ''}`);
        
        if (fallidos === 0) {
            setJugadores([]);
        }
        
        setCargando(false);
    };

    jugadores.sort((a,b) => {
        if(a.apellido < b.apellido){
            return -1
        }
        if(a.apellido > b.apellido){
            return 1
        }
        if(a.nombre < b.nombre){
            return -1
        }
        if(a.nombre > b.nombre){
            return 1
        }
        if(a.id < b.id){
            return -1
        }
        if(a.id > b.id){
            return 1
        }
        return 0
    })
    return(
        <div className="standard">
            
            {!archivoCargado ? (
                <div className="upload-area">
                    <h2>CARGA MASIVA</h2>
                    <h4>Datos de Llegada (se aplicarán a todos los jugadores)</h4>
                    <div className="inputs-group">
                        <input 
                            type="number" 
                            placeholder="Día (00)" 
                            value={valoresGlobales.diaLlegada}
                            onChange={(e) => handleGlobalChange('diaLlegada', e.target.value)}
                            required
                        />
                        <input 
                            type="number" 
                            placeholder="Mes (00)" 
                            value={valoresGlobales.mesLlegada}
                            onChange={(e) => handleGlobalChange('mesLlegada', e.target.value)}
                            required
                        />
                        <input 
                            type="number" 
                            placeholder="Año (0000)" 
                            value={valoresGlobales.anioLlegada}
                            onChange={(e) => handleGlobalChange('anioLlegada', e.target.value)}
                            required
                        />
                    </div>
                    <div className="inputs-group">
                        <input 
                            type="text" 
                            placeholder="Mi Equipo" 
                            value={valoresGlobales.miEquipo}
                            onChange={(e) => handleGlobalChange('miEquipo', e.target.value)}
                            required
                            style={{ width: '100%' }}
                        />
                        <input 
                            type="text" 
                            placeholder="Club Anterior" 
                            value={valoresGlobales.clubAnterior}
                            onChange={(e) => handleGlobalChange('clubAnterior', e.target.value)}
                            required
                            style={{ width: '100%' }}
                        />
                    </div>
                    
                    <hr style={{ margin: '20px 0' }} />
                    
                    <h4>Seleccionar Archivo</h4>
                    <input 
                        type="file" 
                        id="fileInput"
                        accept=".html,.htm"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="fileInput" className="file-label">
                        📁 Seleccionar archivo HTML
                    </label>
                    <p className="file-hint">Solo archivos .html o .htm</p>
                    
                    {mensaje && (
                        <div className="mensaje" style={{
                            padding: '10px',
                            margin: '10px 0',
                            borderRadius: '5px',
                            backgroundColor: mensaje.includes('⚠️') ? '#fff3cd' : '#d4edda',
                            color: mensaje.includes('⚠️') ? '#856404' : '#155724',
                            border: `1px solid ${mensaje.includes('⚠️') ? '#ffeeba' : '#c3e6cb'}`
                        }}>
                            {mensaje}
                        </div>
                    )}
                </div>
            ) : (
                <div className="carga-jugadores-container">
                    <h3>📋 Carga de Jugadores</h3>
                    <p className="file-info">Archivo: {nombreArchivo}</p>
                    <p className="file-info">Total de jugadores encontrados: {jugadores.length}</p>
                    
                    {mensaje && (
                        <div className="mensaje" style={{
                            padding: '10px',
                            margin: '10px 0',
                            borderRadius: '5px',
                            backgroundColor: mensaje.includes('✅') ? '#d4edda' : '#f8d7da',
                            color: mensaje.includes('✅') ? '#155724' : '#721c24',
                            border: `1px solid ${mensaje.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`
                        }}>
                            {mensaje}
                        </div>
                    )}

                    <div className="global-values" style={{
                        padding: '10px',
                        backgroundColor: '#e3f2fd',
                        borderRadius: '5px',
                        marginBottom: '20px'
                    }}>
                        <h4>Valores aplicados a todos los jugadores:</h4>
                        <p>📅 Llegada: {valoresGlobales.diaLlegada}/{valoresGlobales.mesLlegada}/{valoresGlobales.anioLlegada}</p>
                        <p>🏛️ Club Anterior: {valoresGlobales.clubAnterior}</p>
                        <p>⚽ Mi Equipo: {valoresGlobales.miEquipo}</p>
                    </div>

                    {jugadores.length > 0 && (
                        <>
                            <div className="preview-container">
                                <h4>Formulario de Jugadores:</h4>
                                
                                <button 
                                    onClick={enviarTodosLosJugadores}
                                    disabled={cargando}
                                    style={{
                                        marginBottom: '20px',
                                        padding: '10px 20px',
                                        backgroundColor: '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontSize: '16px'
                                    }}
                                >
                                    {cargando ? 'ENVIANDO TODOS...' : '📤 ENVIAR TODOS LOS JUGADORES'}
                                </button>

                                {jugadores.map((jugador, index) => (
                                    <div key={index} className="jugador-formulario-CM">
                                        <div className="inputs-group">
                                            <div>
                                                <label className="w-100 label-jugador">
                                                    ID:
                                                    <input 
                                                        type="text" 
                                                        value={jugador.id}
                                                        onChange={(e) => handleInputChange(index, 'id', e.target.value)}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="inputs-group">
                                            <div>
                                                <label className="w-100 label-jugador">
                                                    Nombre:
                                                    <input 
                                                        type="text" 
                                                        value={jugador.nombre}
                                                        onChange={(e) => handleInputChange(index, 'nombre', e.target.value)}
                                                    />
                                                </label>
                                            </div>
                                            <div>
                                                <label className="w-100 label-jugador">
                                                    Apellido:
                                                    <input 
                                                        type="text" 
                                                        value={jugador.apellido}
                                                        onChange={(e) => handleInputChange(index, 'apellido', e.target.value)}
                                                    />
                                                </label>
                                            </div>
                                            <div>
                                                <label className="w-100 label-jugador">
                                                    Alias:
                                                    <input 
                                                        type="text" 
                                                        value={jugador.alias}
                                                        onChange={(e) => handleInputChange(index, 'alias', e.target.value)}
                                                        placeholder="Alias"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="inputs-group">
                                            <div>
                                                <label className="w-100 label-jugador">
                                                    Día Nacimiento:
                                                    <input 
                                                        type="text" 
                                                        value={jugador.diaNacimiento}
                                                        onChange={(e) => handleInputChange(index, 'diaNacimiento', e.target.value)}
                                                        placeholder="DD"
                                                    />
                                                </label>
                                            </div>
                                            <div>
                                                <label className="w-100 label-jugador">
                                                    Mes Nacimiento:
                                                    <input 
                                                        type="text" 
                                                        value={jugador.mesNacimiento}
                                                        onChange={(e) => handleInputChange(index, 'mesNacimiento', e.target.value)}
                                                        placeholder="MM"
                                                    />
                                                </label>
                                            </div>
                                            <div>
                                                <label className="w-100 label-jugador">
                                                    Año Nacimiento:
                                                    <input 
                                                        type="text" 
                                                        value={jugador.anioNacimiento}
                                                        onChange={(e) => handleInputChange(index, 'anioNacimiento', e.target.value)}
                                                        placeholder="AAAA"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="inputs-group">
                                            <div>
                                                <label className="w-100 label-jugador">
                                                    Nacionalidad:
                                                    <input 
                                                        type="text" 
                                                        value={jugador.nacionalidad}
                                                        onChange={(e) => handleInputChange(index, 'nacionalidad', e.target.value)}
                                                        placeholder="Nacionalidad"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="inputs-group">
                                            <div>
                                                <label className="w-100 label-jugador">
                                                    Cantera:
                                                    <input 
                                                        type="text" 
                                                        value={jugador.cantera}
                                                        onChange={(e) => handleInputChange(index, 'cantera', e.target.value)}
                                                        placeholder="Cantera"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="inputs-group">
                                            <div>
                                                <label className="w-100 label-jugador">
                                                    Día Llegada:
                                                    <input 
                                                        type="text" 
                                                        value={jugador.diaLlegada}
                                                        onChange={(e) => handleInputChange(index, 'diaLlegada', e.target.value)}
                                                        placeholder="DD"
                                                    />
                                                </label>
                                            </div>
                                            <div>
                                                <label className="w-100 label-jugador">
                                                    Mes Llegada:
                                                    <input 
                                                        type="text" 
                                                        value={jugador.mesLlegada}
                                                        onChange={(e) => handleInputChange(index, 'mesLlegada', e.target.value)}
                                                        placeholder="MM"
                                                    />
                                                </label>
                                            </div>
                                            <div>
                                                <label className="w-100 label-jugador">
                                                    Año Llegada:
                                                    <input 
                                                        type="text" 
                                                        value={jugador.anioLlegada}
                                                        onChange={(e) => handleInputChange(index, 'anioLlegada', e.target.value)}
                                                        placeholder="AAAA"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="inputs-group">
                                            <div>
                                                <label className="w-100 label-jugador">
                                                    Club Anterior:
                                                    <input 
                                                        type="text" 
                                                        value={jugador.clubAnterior}
                                                        onChange={(e) => handleInputChange(index, 'clubAnterior', e.target.value)}
                                                        placeholder="Club Anterior"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <button 
                                            onClick={() => enviarJugador(index)}
                                            disabled={cargando}
                                            style={{
                                                marginTop: '10px',
                                                padding: '8px 16px',
                                                backgroundColor: '#007bff',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {cargando ? 'ENVIANDO...' : '📤 Enviar este jugador'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    
                    <button onClick={handleReset} className="btn-reset" style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#ff9800',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                        🔄 Cambiar archivo
                    </button>
                </div>
            )}
        </div>
    );
}