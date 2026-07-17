import './Agregar.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AgregarCopa = () => {

    const partidos = Array.from({length: 16})
    let navigate = useNavigate()

    const [tipoCopa, setTipoCopa] = useState('partida')

    const crearCopa = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const infoCopa = {
            temporada: parseInt(formData.get("temporada")),
            copa: formData.get("copa"),
            pais: formData.get("pais"),
            tipo: formData.get("tipo")
        };

        const rondas = formData.getAll("ronda");
        const equiposLocales = formData.getAll("equipoLocal");
        const paisesLocales = formData.getAll("paisLocal");
        const equiposVisitantes = formData.getAll("equipoVisitante");
        const paisesVisitantes = formData.getAll("paisVisitante");
        const glPartidos = formData.getAll("glPartidoIda");
        const gvPartidos = formData.getAll("gvPartidoIda");
        const glGlobales = formData.getAll("glGlobal");
        const gvGlobales = formData.getAll("gvGlobal");

        let listaPartidos = partidos.map((_, idx) => ({
            ronda: rondas[idx] || "",
            equipoLocal: equiposLocales[idx] || "",
            paisLocal: paisesLocales[idx] || "",
            equipoVisitante: equiposVisitantes[idx] || "",
            paisVisitante: paisesVisitantes[idx] || "",
            glPartidoIda: Number(glPartidos[idx]) || 0,
            gvPartidoIda: Number(gvPartidos[idx]) || 0,
            glGlobal: Number(glGlobales[idx]) || 0,
            gvGlobal: Number(gvGlobales[idx]) || 0,
        }));

        let datosCopa = {
            ...infoCopa,
        };

        datosCopa.copa = datosCopa.copa.toLowerCase();
        datosCopa.pais = datosCopa.pais.toLowerCase();
        listaPartidos = listaPartidos.filter(p => p.equipoLocal !== "");
        datosCopa.partidos = []

        for(let p of listaPartidos){
            const partidoIda = {
                local: p.equipoLocal.trim().toLowerCase(),
                visitante: p.equipoVisitante.trim().toLowerCase(),
                paisLocal: p.paisLocal.trim().toLowerCase(),
                paisVisitante: p.paisVisitante.trim().toLowerCase(),
                golesLocal: p.glPartidoIda,
                golesVisitante: p.gvPartidoIda,
                ronda: p.ronda
            }
            datosCopa.partidos.push(partidoIda)
            
            if(p.glGlobal !== 0 || p.gvGlobal !== 0){
                const partidoVuelta = {
                    local: p.equipoVisitante.trim().toLowerCase(),
                    visitante: p.equipoLocal.trim().toLowerCase(),
                    paisLocal: p.paisVisitante.trim().toLowerCase(),
                    paisVisitante: p.paisLocal.trim().toLowerCase(),
                    golesLocal: p.gvGlobal - p.gvPartidoIda,
                    golesVisitante: p.glGlobal - p.glPartidoIda,
                    ronda: p.ronda
                }
                datosCopa.partidos.push(partidoVuelta)
            }
        }

        try {
            const response = await fetch("http://localhost:4001/copas/agregar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datosCopa)
            });

            if (!response.ok) throw new Error("Error al guardar la copa en la vitácora");
            navigate("/copas"); 
        } catch (err) {
            console.error("Hubo un error al enviar el formulario:", err);
        }
    };

    const decidirRonda = (idx) => {
        let ronda = ""
        let cntPart = partidos.length
        idx === cntPart ? ronda = "final" :
        idx === cntPart - 1 ? ronda = "tercer puesto" : 
        idx >= cntPart - 3 ? ronda = "semifinales" :
        idx >= cntPart - 7 ? ronda = "cuartos de final" :
        idx >= cntPart - 15 ? ronda = "octavos de final" : ronda =""

        return ronda
    }

    return(
        <div className="standard">
            <form onSubmit={crearCopa} className='agregador-copas'>
                <div className="infoCopa">
                    <h3>Datos de la Copa</h3>
                    <input name="temporada" className="w-25 input-info" type="number" placeholder="Temporada (XXXX)" required />
                    <input name="copa" className="w-25 input-info" type="text" placeholder="Nombre de la copa" required />
                    <input name="pais" className="w-25 input-info" type="text" placeholder="Pais de la copa" required />
                    
                    <div className="grupo-radio">
                        Tipo de copa:
                        <label className="opciones-radio">
                            <input 
                                type="radio" 
                                name="tipo" 
                                value="real" 
                                checked={tipoCopa === 'real'}
                                onChange={(e) => setTipoCopa(e.target.value)} 
                                required 
                            />
                            <span>REAL</span>
                        </label>
                        <label className="opciones-radio">
                            <input 
                                type="radio" 
                                name="tipo" 
                                value="partida" 
                                checked={tipoCopa === 'partida'}
                                onChange={(e) => setTipoCopa(e.target.value)} 
                                required 
                            />
                            <span>PARTIDA</span>
                        </label>
                    </div>
                </div>

                <div className="ronda">
                    <label className="labelRonda">RONDA</label>
                    <label className="labelTexto">EQUIPO 1</label>
                    <label className="labelTexto">EQUIPO 2</label>
                    <label className="labelResultados">RES. PART.</label>
                    <label className="labelResultados">RES. GLOBAL</label>
                </div>

                {partidos.map((rnd, idx) => (
                    <div className="ronda" key={idx}>
                        <label className="labelRonda">
                            <input name="ronda" type="text" placeholder="RONDA" defaultValue={decidirRonda(idx+1)} />
                        </label>
                        <label className="labelTexto">
                            <input name="equipoLocal" type="text" placeholder="EQUIPO LOCAL" />
                            <input name="paisLocal" type="text" placeholder="PAIS LOCAL" />
                        </label>
                        <label className="labelTexto">
                            <input name="equipoVisitante" type="text" placeholder="EQUIPO Visitante" />
                            <input name="paisVisitante" type="text" placeholder="PAIS Visitante" />
                        </label>
                        <label className="labelResultados">
                            <input name="glPartidoIda" type="number" placeholder="0" />
                            <input name="gvPartidoIda" type="number" placeholder="0" />
                        </label>
                        <label className="labelResultados">
                            <input name="glGlobal" type="number" placeholder="0" />
                            <input name="gvGlobal" type="number" placeholder="0" />
                        </label>
                    </div>
                ))}

                <button type="submit">Guardar Copa</button>
            </form>
        </div>
    )
}