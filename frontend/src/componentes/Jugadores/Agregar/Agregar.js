import { useState } from "react"
import { Link } from "react-router-dom"

export const AgregarJugadores = () => {
    const [jugadoresData, setJugadoresData] = useState({
        id: "",
        nombre: "",
        apellido: "",
        alias: "",
        diaNacimiento: "",
        mesNacimiento: "",
        anioNacimiento: "",
        nacionalidad: "",
        miEquipo: "",
        cantera: "",
        diaLlegada: "",
        mesLlegada: "",
        anioLlegada: "",
        clubAnterior: "",
        diaSalida: "",
        mesSalida: "",
        anioSalida: "",
        clubPosterior: "",
        precioVenta: 0,
        precioCompra: ""
    })

    const [mensaje, setMensaje] = useState("")
    const [cargando, setCargando] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setJugadoresData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const agregarJugador = async (e) => {
        e.preventDefault()
        setCargando(true)
        setMensaje("")

        try {
            const response = await fetch('http://localhost:4001/jugadores/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jugadoresData)
            })

            if (!response.ok) throw new Error('Error al guardar')
            .then(response => response.json())
            .catch(error => console.error('Error:', error));

            setMensaje("✅ Jugador guardado exitosamente")
            
            setJugadoresData({
                id: "",
                nombre: "",
                apellido: "",
                alias: "",
                diaNacimiento: "",
                mesNacimiento: "",
                anioNacimiento: "",
                nacionalidad: jugadoresData.nacionalidad,
                miEquipo: jugadoresData.miEquipo,
                cantera: "",
                diaLlegada: jugadoresData.diaLlegada,
                mesLlegada: jugadoresData.mesLlegada,
                anioLlegada: jugadoresData.anioLlegada,
                clubAnterior: jugadoresData.clubAnterior,
                diaSalida: "",
                mesSalida: "",
                anioSalida: "",
                clubPosterior: "",
                precioVenta: 0,
                precioCompra: jugadoresData.precioCompra
            })
        } catch (error) {
            console.error('Error:', error)
            setMensaje("❌ Error al guardar el jugador")
        } finally {
            setCargando(false)
        }
    }

    return(
        <div className="standard">
            <div className="botonera-superior">
                <Link to="/jugadores/cargaMasiva" className="btn-superior" style={{background: '#758100'}}>Carga Masiva</Link>
            </div>
            <form onSubmit={agregarJugador}>
                <div className="modulo-formulario">
                    <input 
                        type="text" 
                        name="id"
                        value={jugadoresData.id} 
                        onChange={handleChange}
                        className="w-70" 
                        placeholder="ID"
                    />
                    <h4>Nombre y Apellido</h4>
                    <input 
                        type="text" 
                        name="nombre"
                        value={jugadoresData.nombre} 
                        onChange={handleChange}
                        className="w-30" 
                        placeholder="nombre"
                    />
                    <input 
                        type="text" 
                        name="apellido"
                        value={jugadoresData.apellido} 
                        onChange={handleChange}
                        className="w-30" 
                        placeholder="apellido"
                    />
                    <input 
                        type="text" 
                        name="alias"
                        value={jugadoresData.alias} 
                        onChange={handleChange}
                        className="w-30" 
                        placeholder="alias"
                    />
                    <h4>Nacimiento</h4>
                    <input 
                        type="number" 
                        name="diaNacimiento"
                        value={jugadoresData.diaNacimiento} 
                        onChange={handleChange}
                        className="w-30" 
                        placeholder="00"
                    />
                    <input 
                        type="number" 
                        name="mesNacimiento"
                        value={jugadoresData.mesNacimiento} 
                        onChange={handleChange}
                        className="w-30" 
                        placeholder="00"
                    />
                    <input 
                        type="number" 
                        name="anioNacimiento"
                        value={jugadoresData.anioNacimiento} 
                        onChange={handleChange}
                        className="w-30" 
                        placeholder="0000"
                    />
                    <input 
                        type="text" 
                        name="nacionalidad"
                        value={jugadoresData.nacionalidad} 
                        onChange={handleChange}
                        className="w-70" 
                        placeholder="nacionalidad"
                    />
                    <input 
                        type="text" 
                        name="cantera"
                        value={jugadoresData.cantera} 
                        onChange={handleChange}
                        className="w-70" 
                        placeholder="cantera"
                    />
                    <input 
                        type="text" 
                        name="miEquipo"
                        value={jugadoresData.miEquipo} 
                        onChange={handleChange}
                        className="w-70" 
                        placeholder="mi equipo"
                    />
                    <h4>Llegada al Club</h4>
                    <input 
                        type="number" 
                        name="diaLlegada"
                        value={jugadoresData.diaLlegada} 
                        onChange={handleChange}
                        className="w-30" 
                        placeholder="00"
                    />
                    <input 
                        type="number" 
                        name="mesLlegada"
                        value={jugadoresData.mesLlegada} 
                        onChange={handleChange}
                        className="w-30" 
                        placeholder="00"
                    />
                    <input 
                        type="number" 
                        name="anioLlegada"
                        value={jugadoresData.anioLlegada} 
                        onChange={handleChange}
                        className="w-30" 
                        placeholder="0000"
                    />
                    <input 
                        type="text" 
                        name="clubAnterior"
                        value={jugadoresData.clubAnterior} 
                        onChange={handleChange}
                        className="w-70" 
                        placeholder="Club Anterior"
                    />
                    <input 
                        type="number" 
                        name="precioCompra"
                        value={jugadoresData.precioCompra} 
                        onChange={handleChange}
                        className="w-30" 
                        placeholder="$$$ valor total de compra"
                    />
                </div>

                {mensaje && <div className="mensaje">{mensaje}</div>}

                <button 
                    type="submit" 
                    className="btn-submit"
                    disabled={cargando}
                >
                    {cargando ? "GUARDANDO..." : "GUARDAR JUGADOR"}
                </button>
            </form>
        </div>
    )
}