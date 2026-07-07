import './AgregarCampeon.css'

export const AgregarCampeon = () => {

    const agregarCampeon = async (e) => {
        e.preventDefault();

        const dataForm = new FormData(e.target);
        
        const payload = {
            temporada: parseInt(dataForm.get('temporada'), 10),
            competicion: dataForm.get('competicion'),
            equipo: dataForm.get('equipo')
        };
        if (!payload.temporada || !payload.competicion || !payload.equipo) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await fetch('http://localhost:4001/campeones/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const resultado = await response.json().catch(() => ({}));

            if (response.ok) {
                console.log("Respuesta del servidor:", resultado);
                alert(resultado.mensaje || "¡Campeón guardado correctamente!");
                e.target.reset();
            } else {
                alert(`Error: ${resultado.mensaje || response.statusText}`);
            }
        } catch (error) {
            console.error("Error de red al agregar campeón:", error);
            alert("Hubo un problema de conexión con el servidor.");
        }
    };

    return (
        <div className="standard">
            <form className="campeones-form" onSubmit={agregarCampeon}>
                <input type="number" placeholder="0000" min={2020} name="temporada" required />
                <input type="text" placeholder="competicion" name="competicion" required />
                <input type="text" placeholder="equipo (xxx)" name="equipo" required />
                <button className="submit" type="submit">GUARDAR</button>
            </form>
        </div>
    );
};