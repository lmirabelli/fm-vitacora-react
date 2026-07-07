import './AgregarEscudo.css'
import { useNavigate } from 'react-router-dom';

export const AgregarEscudo = ({equipoElegido}) => {

    const navigate = useNavigate()
    const agregarEscudo = async (e) => {
    e.preventDefault();

    const dataForm = new FormData(e.target);
    
    const payload = {
        equipo: dataForm.get('equipo'),
        ciudad: dataForm.get('ciudad'),
        pais: dataForm.get('pais'),
        fundacion: dataForm.get('fundacion'),
        imagen: dataForm.get('imagen'),
        color1: dataForm.get('color1'),
        color2: dataForm.get('color2')
    };

    try {
        const response = await fetch('http://localhost:4001/imagenes/escudo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const resultado = await response.json().catch(() => ({}));

        if (response.ok) {
            e.target.reset();
            navigate('/configuracion')
        } else {
            alert(`Error al guardar: ${resultado.mensaje || response.statusText}`);
        }
    } catch (error) {
        console.error("Error de red al agregar el escudo:", error);
        alert("Hubo un problema de conexión con el servidor.");
    }
};

    return(
            <div className="agregar-imagen">
                <h2>AGREGAR ESCUDO</h2>
                <form onSubmit={agregarEscudo} className="form-imagen">
                    <label>
                        <span>Equipo</span>
                        <input type="text" placeholder="EQUIPO" name="equipo" defaultValue={equipoElegido?.equipo} required />
                    </label>
                    <label>
                        <span>Ciudad</span>
                        <input type="text" placeholder="CIUDAD" name="ciudad" defaultValue={equipoElegido?.ciudad} required />
                    </label>
                    <label>
                        <span>Pais</span>
                        <input type="text" placeholder="PAIS" name="pais" defaultValue={equipoElegido?.pais} required />
                    </label>
                    <label>
                        <span>Fundacion</span>
                        <input type="text" placeholder="0000" name="fundacion" defaultValue={equipoElegido?.fundacion} required />
                    </label>
                    <label>
                        <span>URL Imagen:</span>
                        <input type="text" placeholder="URL IMAGEN" name="imagen" defaultValue={equipoElegido?.imagen} required />
                    </label>
                    <label>
                        <span>Color Principal</span>
                        <input type="color" name="color1" defaultValue={equipoElegido?.color1} required />
                    </label>
                    <label>
                        <span>Color Secundario</span>
                        <input type="color" name="color2" defaultValue={equipoElegido?.color2} required />
                    </label>
                    <button type="submit">GUARDAR ESCUDO</button>
                </form>
            </div>
    )
}