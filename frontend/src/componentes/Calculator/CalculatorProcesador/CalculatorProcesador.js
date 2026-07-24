import './CalculatorProcesador.css'
import { useState } from 'react';
import { Link } from 'react-router-dom'


export const CalculatorProcesador = ({ jugadores }) => {
    const [mensajeError, setMensajeError] = useState(null);
    const [panelInformacion, setPanelInformacion] = useState(null)
    const [jugadorProcesado,setJugadorProcesado] = useState([])
    let ultimoRegistro = 0

    const calcular = async (e) => {
        e.preventDefault();
        setMensajeError(null);
        const formData = new FormData(e.target);

        const ponderaciones = {};
        formData.forEach((value, key) => {
            ponderaciones[key] = Number(value);
        });

        let jmostrar = parseInt(formData.get("valor-cantidad"))
        if((parseInt(formData.get("valor-primario")) + parseInt(formData.get("valor-secundario"))) > 98){

            setMensajeError("Se te fueron al carajo los calculos los valores primarios y secundarios no deben ser superiores a 98");
            console.log((formData.get("valor-primario") + formData.get("valor-secundario")))
        } 
        let lista = []
        let hayJugadorInvalido = false;
        jugadores.forEach((j) => {
            let primario = [];
            let secundario = [];
            let terciario = [];
            let totalPrimario = 0
            let totalSecundario = 0
            let totalTerciario = 0

            const att = j.atributos[j.atributos.length - 1];
            att.fecha.fechaDecimal > ultimoRegistro && (ultimoRegistro = att.fecha.fechaDecimal)
            Object.entries(ponderaciones).forEach(([atributo, prioridad]) => {
                if (att && att[atributo] !== undefined) {
                    const valor = att[atributo];

                    if (prioridad === 1) {
                        primario.push(valor);
                    } else if (prioridad === 2) {
                        secundario.push(valor);
                    } else if (prioridad === 3) {
                        terciario.push(valor);
                    }
                }

            });
            if (primario.length < 4 || secundario.length < 4 || terciario.length < 4) {
                hayJugadorInvalido = true;
            }

            primario.forEach( j => {
                totalPrimario += j
            })

            totalPrimario = totalPrimario / primario.length * parseInt(formData.get("valor-primario"))

            secundario.forEach( j => {
                totalSecundario += j
            })
            totalSecundario = totalSecundario / secundario.length * parseInt(formData.get("valor-secundario"))
            terciario.forEach( j => {
                totalTerciario += j
            })
            totalTerciario = totalTerciario / terciario.length * (100 - parseInt(formData.get("valor-secundario")) - parseInt(formData.get("valor-secundario")))

            lista.push({
                jugador: j.jugador,
                id: j.id,
                promedio: ((totalPrimario + totalSecundario + totalTerciario) / 200),
                posicion: att.posicion,
                fecha: att.fecha,
                edad: j.fechaNacimiento !== 0 ? (att.fecha.fechaDecimal - j.fechaNacimiento) / 365.25 : "NR",
                nacionalidad: j.nacionalidad
            })

        });

        if (hayJugadorInvalido) {
            setMensajeError("No alcanza los valores mínimos esperados");
        }

        if(mensajeError === null){
            console.log(mensajeError)
            lista = lista.filter(a => a.fecha.fechaDecimal === ultimoRegistro)
            lista.sort((a,b) => b.promedio - a.promedio)
            setPanelInformacion(`${lista.length} jugadores analizados`)
            jmostrar = jmostrar > lista.length ? lista.length : jmostrar < 1 ? 10 : jmostrar
            lista = lista.slice(0,jmostrar)
            setJugadorProcesado(lista)
        }
    };
    console.log(jugadorProcesado)

    const calcularFondo = (miProm, mejorProm) => {

        let diferencia = miProm / mejorProm
        let rojo = 153 / (diferencia * 1.15)
        rojo > 255 && (rojo = 255)
        let verde = 255 * diferencia
        console.log(verde)

        return `rgba(${rojo}, ${verde}, 0, 0.6)`
    }
    return (
        <div className="standard">
            <form className="form-botonera" onSubmit={calcular}>

                <h2>Central de Atributos</h2>
                <h6>Tiene que haber 4 atributos primarios, 4 secundarios y 4 terciarios como minimo</h6>
                <div className="w-22">
                    <h3>Arqueros</h3>
                    <div className="item-atributo">
                        <label>Alcance Aéreo:</label>
                        <input type="radio" name="alcanceAereo" value={1} />
                        <input type="radio" name="alcanceAereo" value={2} />
                        <input
                            type="radio"
                            name="alcanceAereo"
                            value={3}
                            defaultChecked
                        />
                    </div>
                    <div className="item-atributo">
                        <label>Blocaje:</label>
                        <input type="radio" name="blocaje" value={1} />
                        <input type="radio" name="blocaje" value={2} />
                        <input
                            type="radio"
                            name="blocaje"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Comunicación:</label>
                        <input type="radio" name="comunicacion" value={1} />
                        <input type="radio" name="comunicacion" value={2} />
                        <input
                            type="radio"
                            name="comunicacion"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Excentricidad:</label>
                        <input type="radio" name="excentricidad" value={1} />
                        <input type="radio" name="excentricidad" value={2} />
                        <input
                            type="radio"
                            name="excentricidad"
                            value={3}
                            defaultChecked
                        />
                    </div>
                    <div className="item-atributo">
                        <label>Salida de Puños:</label>
                        <input type="radio" name="salidaPunos" value={1} />
                        <input type="radio" name="salidaPunos" value={2} />
                        <input
                            type="radio"
                            name="salidaPunos"
                            value={3}
                            defaultChecked
                        />
                    </div>
                    <div className="item-atributo">
                        <label>Mando en el Área:</label>
                        <input type="radio" name="mando" value={1} />
                        <input type="radio" name="mando" value={2} />
                        <input
                            type="radio"
                            name="mando"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Reflejos:</label>
                        <input type="radio" name="reflejos" value={1} />
                        <input type="radio" name="reflejos" value={2} />
                        <input
                            type="radio"
                            name="reflejos"
                            value={3}
                            defaultChecked
                        />
                    </div>


                    <div className="item-atributo">
                        <label>Salidas:</label>
                        <input type="radio" name="salidas" value={1} />
                        <input type="radio" name="salidas" value={2} />
                        <input
                            type="radio"
                            name="salidas"
                            value={3}
                            defaultChecked
                        />
                    </div>
                    <div className="item-atributo">
                        <label>Saque Con Mano:</label>
                        <input type="radio" name="saqueConMano" value={1} />
                        <input type="radio" name="saqueConMano" value={2} />
                        <input
                            type="radio"
                            name="saqueConMano"
                            value={3}
                            defaultChecked
                        />
                    </div>
                    <div className="item-atributo">
                        <label>Saque de Puerta:</label>
                        <input type="radio" name="saqueDePuerta" value={1} />
                        <input type="radio" name="saqueDePuerta" value={2} />
                        <input
                            type="radio"
                            name="saqueDePuerta"
                            value={3}
                            defaultChecked
                        />
                    </div>
                    <div className="item-atributo">
                        <label>1v1 (Mano a Mano):</label>
                        <input type="radio" name="manoAMano" value={1} />
                        <input type="radio" name="manoAMano" value={2} />
                        <input
                            type="radio"
                            name="manoAMano"
                            value={3}
                            defaultChecked
                        />
                    </div>
                </div>
                <div className="w-22">
                    <h3>Tecnico</h3>
                    <div className="item-atributo">
                        <label>Cabeza:</label>
                        <input type="radio" name="cabeza" value={1} />
                        <input type="radio" name="cabeza" value={2} />
                        <input
                            type="radio"
                            name="cabeza"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Centros:</label>
                        <input type="radio" name="centros" value={1} />
                        <input type="radio" name="centros" value={2} />
                        <input
                            type="radio"
                            name="centros"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Control:</label>
                        <input type="radio" name="control" value={1} />
                        <input type="radio" name="control" value={2} />
                        <input
                            type="radio"
                            name="control"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Entradas:</label>
                        <input type="radio" name="entradas" value={1} />
                        <input type="radio" name="entradas" value={2} />
                        <input
                            type="radio"
                            name="entradas"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Marcaje:</label>
                        <input type="radio" name="marcaje" value={1} />
                        <input type="radio" name="marcaje" value={2} />
                        <input
                            type="radio"
                            name="marcaje"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Pases:</label>
                        <input type="radio" name="pases" value={1} />
                        <input type="radio" name="pases" value={2} />
                        <input
                            type="radio"
                            name="pases"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Penales:</label>
                        <input type="radio" name="penales" value={1} />
                        <input type="radio" name="penales" value={2} />
                        <input
                            type="radio"
                            name="penales"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Regates:</label>
                        <input type="radio" name="regates" value={1} />
                        <input type="radio" name="regates" value={2} />
                        <input
                            type="radio"
                            name="regates"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Remates:</label>
                        <input type="radio" name="remates" value={1} />
                        <input type="radio" name="remates" value={2} />
                        <input
                            type="radio"
                            name="remates"
                            value={3}
                            defaultChecked
                        />
                    </div>
                    <div className="item-atributo">
                        <label>Córners:</label>
                        <input type="radio" name="corners" value={1} />
                        <input type="radio" name="corners" value={2} />
                        <input
                            type="radio"
                            name="corners"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Saques Largos:</label>
                        <input type="radio" name="saquesLargos" value={1} />
                        <input type="radio" name="saquesLargos" value={2} />
                        <input
                            type="radio"
                            name="saquesLargos"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Técnica:</label>
                        <input type="radio" name="tecnica" value={1} />
                        <input type="radio" name="tecnica" value={2} />
                        <input
                            type="radio"
                            name="tecnica"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Tiros Lejanos:</label>
                        <input type="radio" name="tirosLejanos" value={1} />
                        <input type="radio" name="tirosLejanos" value={2} />
                        <input
                            type="radio"
                            name="tirosLejanos"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Tiros Libres:</label>
                        <input type="radio" name="tirosLibres" value={1} />
                        <input type="radio" name="tirosLibres" value={2} />
                        <input
                            type="radio"
                            name="tirosLibres"
                            value={3}
                            defaultChecked
                        />
                    </div>
                </div>
                <div className="w-22">
                    <h3>Mental</h3>
                    <div className="item-atributo">
                        <label>Agresividad:</label>
                        <input type="radio" name="agresividad" value={1} />
                        <input type="radio" name="agresividad" value={2} />
                        <input
                            type="radio"
                            name="agresividad"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Anticipación:</label>
                        <input type="radio" name="anticipacion" value={1} />
                        <input type="radio" name="anticipacion" value={2} />
                        <input
                            type="radio"
                            name="anticipacion"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Colocación:</label>
                        <input type="radio" name="colocacion" value={1} />
                        <input type="radio" name="colocacion" value={2} />
                        <input
                            type="radio"
                            name="colocacion"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Concentración:</label>
                        <input type="radio" name="concentracion" value={1} />
                        <input type="radio" name="concentracion" value={2} />
                        <input
                            type="radio"
                            name="concentracion"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Decisiones:</label>
                        <input type="radio" name="decisiones" value={1} />
                        <input type="radio" name="decisiones" value={2} />
                        <input
                            type="radio"
                            name="decisiones"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Desmarques:</label>
                        <input type="radio" name="desmarques" value={1} />
                        <input type="radio" name="desmarques" value={2} />
                        <input
                            type="radio"
                            name="desmarques"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Determinación:</label>
                        <input type="radio" name="determinacion" value={1} />
                        <input type="radio" name="determinacion" value={2} />
                        <input
                            type="radio"
                            name="determinacion"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Juego en Equipo:</label>
                        <input type="radio" name="juegoEnEquipo" value={1} />
                        <input type="radio" name="juegoEnEquipo" value={2} />
                        <input
                            type="radio"
                            name="juegoEnEquipo"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Liderazgo:</label>
                        <input type="radio" name="liderazgo" value={1} />
                        <input type="radio" name="liderazgo" value={2} />
                        <input
                            type="radio"
                            name="liderazgo"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Sacrificio:</label>
                        <input type="radio" name="sacrificio" value={1} />
                        <input type="radio" name="sacrificio" value={2} />
                        <input
                            type="radio"
                            name="sacrificio"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Serenidad:</label>
                        <input type="radio" name="serenidad" value={1} />
                        <input type="radio" name="serenidad" value={2} />
                        <input
                            type="radio"
                            name="serenidad"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Talento:</label>
                        <input type="radio" name="talento" value={1} />
                        <input type="radio" name="talento" value={2} />
                        <input
                            type="radio"
                            name="talento"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Valentía:</label>
                        <input type="radio" name="valentia" value={1} />
                        <input type="radio" name="valentia" value={2} />
                        <input
                            type="radio"
                            name="valentia"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Visión:</label>
                        <input type="radio" name="vision" value={1} />
                        <input type="radio" name="vision" value={2} />
                        <input
                            type="radio"
                            name="vision"
                            value={3}
                            defaultChecked
                        />
                    </div>
                </div>
                <div className="w-22">
                    <h3>Fisico</h3>
                    <div className="item-atributo">
                        <label>Aceleración:</label>
                        <input type="radio" name="aceleracion" value={1} />
                        <input type="radio" name="aceleracion" value={2} />
                        <input
                            type="radio"
                            name="aceleracion"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Agilidad:</label>
                        <input type="radio" name="agilidad" value={1} />
                        <input type="radio" name="agilidad" value={2} />
                        <input
                            type="radio"
                            name="agilidad"
                            value={3}
                            defaultChecked
                        />
                    </div>
                    <div className="item-atributo">
                        <label>Salto:</label>
                        <input type="radio" name="salto" value={1} />
                        <input type="radio" name="salto" value={2} />
                        <input
                            type="radio"
                            name="salto"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Equilibrio:</label>
                        <input type="radio" name="equilibrio" value={1} />
                        <input type="radio" name="equilibrio" value={2} />
                        <input
                            type="radio"
                            name="equilibrio"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Fuerza:</label>
                        <input type="radio" name="fuerza" value={1} />
                        <input type="radio" name="fuerza" value={2} />
                        <input
                            type="radio"
                            name="fuerza"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Recuperación Física:</label>
                        <input
                            type="radio"
                            name="recuperacionFisica"
                            value={1}
                        />
                        <input
                            type="radio"
                            name="recuperacionFisica"
                            value={2}
                        />
                        <input
                            type="radio"
                            name="recuperacionFisica"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Resistencia:</label>
                        <input type="radio" name="resistencia" value={1} />
                        <input type="radio" name="resistencia" value={2} />
                        <input
                            type="radio"
                            name="resistencia"
                            value={3}
                            defaultChecked
                        />
                    </div>

                    <div className="item-atributo">
                        <label>Velocidad:</label>
                        <input type="radio" name="velocidad" value={1} />
                        <input type="radio" name="velocidad" value={2} />
                        <input
                            type="radio"
                            name="velocidad"
                            value={3}
                            defaultChecked
                        />
                    </div>
                </div>
                <div className="w-100">
                    <h4>Valoracion</h4>
                    <h6>primario: es el porcentaje del puntaje total que equivale a los valores de los atributos primarios.</h6>
                    <h6>secundario: es el porcentaje del puntaje total que equivale a los valores de los atributos secundarios.</h6>
                    <h6>la suma de ambos valores no puede exceder el 98%, ya que para el buen funcionamiento del calculator queda reservado como minimo un 2% para los valores terciarios</h6>
                    <label>Primario: <input type="number" defaultValue={45} name="valor-primario" /></label>
                    <label>Secundario: <input type="number" defaultValue={30} name="valor-secundario" /></label>
                    <label>Jugadores a mostrar: <input type="number" defaultValue={10} name="valor-cantidad" /></label>
                </div>
                <button type="submit">Calcular</button>
            </form>
            {mensajeError && (
                <div className="mensaje-error">
                    <h2>{mensajeError}</h2>
                </div>
            )}
            {panelInformacion && !mensajeError && (
                <div className='panel-informacion'>
                        <h2>{panelInformacion}</h2>
                        <h4>{jugadorProcesado[0].fecha.fecha}</h4>
                        {jugadorProcesado.map((j,idx) => (
                            <Link to={`/jugadores/${j.id}`} className='jugador' key={idx} style={{background: `${calcularFondo(j.promedio, jugadorProcesado[0].promedio)}`, animationDelay: `${0.15 * idx}s`}}>
                                <div className='w-5'>{idx + 1}</div>
                                <div className='w-10'><img src={j.nacionalidad} alt="bandera" className='bandera'/></div>
                                <div className='w-20'>{j.jugador}</div>
                                <div className='w-10'>{isNaN(parseInt(j.edad)) ? "S/Reg" : parseInt(j.edad)}</div>
                                <div className='w-15'>{j.posicion}</div>
                                <div className='w-15'>{j.promedio.toFixed(2)}</div>
                            </Link>
                        ))}
                    </div>
            )}
        </div>
    );
};
