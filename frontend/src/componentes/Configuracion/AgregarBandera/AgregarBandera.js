import './AgregarBandera.css'
import { useNavigate } from 'react-router-dom';

export const AgregarBandera = () => {

    const navigate = useNavigate()
    const agregarBandera = async (e) => {
    e.preventDefault();

    const dataForm = new FormData(e.target);
    
    const payload = {
        equipo: dataForm.get('equipo'),
        pais: dataForm.get('pais'),
        acronimo: dataForm.get('acronimo'),
        imagen: dataForm.get('imagen'),
        color1: dataForm.get('color1'),
        color2: dataForm.get('color2')
    };

    try {
        const response = await fetch('http://localhost:4001/imagenes/bandera', {
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
        console.error("Error de red al agregar el bandera:", error);
        alert("Hubo un problema de conexión con el servidor.");
    }
};

    return(
            <div className="agregar-imagen">
                <h2>AGREGAR BANDERA</h2>
                <form onSubmit={agregarBandera} className="form-imagen">
                    <label>
                        <span>Pais</span>
                        <input type="text" placeholder="PAIS" name="pais" required />
                    </label>
                    <label>
                        <span>Acronimo</span>
                        <input type="text" placeholder="XXX" name="acronimo" required />
                    </label>
                    <label>
                        <span>URL Imagen:</span>
                        <input type="text" placeholder="URL IMAGEN" name="imagen" required />
                    </label>
                    <label>
                        <span>Color Principal</span>
                        <input type="color" name="color1" required />
                    </label>
                    <label>
                        <span>Color Secundario</span>
                        <input type="color" name="color2" required />
                    </label>
                    <button type="submit">GUARDAR BANDERA</button>
                </form>
            </div>
    )
}