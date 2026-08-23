import './CalculatorProcesador.css'
import { useState } from 'react';
import { PanelInformacion } from './PanelInformacion/PanelInformacion';


export const CalculatorProcesador = ({ jugadores }) => {
    const [fecha, setFecha] = useState("00.00.0000")
    const [jugadorProcesado,setJugadorProcesado] = useState([])
    const [posicionJugador, setPosicionJugador] = useState("por")

    const recolectarValoresRadio = () => {
    const primario = [];
    const secundario = [];
    const terciario = [];
    
    // Seleccionar todos los radio buttons que están checked
    const radioButtons = document.querySelectorAll('input[type="radio"]:checked');
    
    radioButtons.forEach(radio => {
        const name = radio.getAttribute('name');
        const value = parseInt(radio.value);
        
        if (name && name !== 'valor-primario' && name !== 'valor-secundario' && name !== 'valor-cantidad' && name !== "pos") {
            if (value === 1) {
                primario.push(name);
            } else if (value === 2) {
                secundario.push(name);
            } else if (value === 3) {
                terciario.push(name);
            }
        }
    });
    
    return { primario, secundario, terciario };
};

    const calcular = async (e) => {
        e.preventDefault()
        let lista = []
        setPosicionJugador(document.querySelector('input[name="pos"]:checked').value)
        const { primario, secundario, terciario } = recolectarValoresRadio();
        const pondendadorPrimario = parseInt(document.querySelector('input[name="valor-primario"]').value)
        const pondendadorSecundario = parseInt(document.querySelector('input[name="valor-secundario"]').value)
        const pondendadorTerciario = 100 - pondendadorPrimario - pondendadorSecundario
    
        if((pondendadorPrimario + pondendadorSecundario) < 96){
        
        const ultimoRegistro = Math.max(0,...jugadores.flatMap(j => j.atributos.map(a => a.fecha.fechaDecimal)));

        const arquero = ["alcanceAereo","blocaje","comunicacion","control","excentricidad","salidaPunos","mando","pases","reflejos","salidas","saqueConMano","saqueDePuerta","manoAMano"]
        const tecnico = ["cabeza","centros","control","entradas","marcaje","pases","penales","regates","remates","corners","saquesLargos","tecnica","tirosLejanos","tirosLibres"]
        const mental = ["agresividad","anticipacion","colocacion","concentracion","decisiones","desmarques","determinacion","juegoEnEquipo","liderazgo","sacrificio","serenidad","talento","valentia","vision"]
        const fisico = ["aceleracion","agilidad","salto","equilibrio","fuerza","recuperacionFisica","resistencia","velocidad"]

        jugadores.forEach(j => {
            j.atributos.forEach( a => {
                if(a.fecha.fechaDecimal === ultimoRegistro){
                    setFecha(a.fecha.fecha)
                    let pjePrimario = 0
                    let pjeSecundario = 0
                    let pjeTerciario = 0
                    primario.forEach( att => pjePrimario += a[att])
                    secundario.forEach( att => pjeSecundario += a[att])
                    terciario.forEach( att => pjeTerciario += a[att])
                    let nuevoJugador = {
                        arquero: {},
                        tecnico: {},
                        mental: {},
                        fisico: {},
                        primario: parseFloat((pjePrimario / primario.length * (pondendadorPrimario / 100)).toFixed(2)),
                        secundario: parseFloat((pjeSecundario / secundario.length * (pondendadorSecundario / 100)).toFixed(2)),
                        terciario: parseFloat((pjeTerciario / terciario.length * (pondendadorTerciario / 100)).toFixed(2)),
                        info: {
                            jugador: j.jugador,
                            edad: j.fechaNacimiento === 0 ? "S/Reg" : parseInt((ultimoRegistro - j.fechaNacimiento) / 365.25),
                            bandera: j.nacionalidad,
                            posicion: a.posicion,
                            mejorPosicion: a.mejorPosicion,
                            id: j.id
                        }
                    }

                    arquero.forEach(att =>{nuevoJugador.arquero[att] = a[att]})
                    tecnico.forEach(att =>{nuevoJugador.tecnico[att] = a[att]})
                    mental.forEach(att =>{nuevoJugador.mental[att] = a[att]})
                    fisico.forEach(att =>{nuevoJugador.fisico[att] = a[att]})
                    nuevoJugador.total = nuevoJugador.primario + nuevoJugador.secundario + nuevoJugador.terciario
                    lista.push(nuevoJugador)
                }
            })
        });

        setJugadorProcesado(lista)
    }
    };

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
                <div className='w-100'>
                        <label>Arquero: </label>
                        <input type="radio" name="pos" value={"por"} defaultChecked/>
                        <label>Defensor: </label>
                        <input type="radio" name="pos" value={"df"} />
                        <label>Carrilero</label>
                        <input type="radio" name="pos" value={"cr"} />
                        <label>Mediocentro: </label>
                        <input type="radio" name="pos" value={"mc"} />
                        <label>Mediocampista: </label>
                        <input type="radio" name="pos" value={"me"} />
                        <label>Mediapunta: </label>
                        <input type="radio" name="pos" value={"mp"} />
                        <label>Delantero: </label>
                        <input type="radio" name="pos" value={"dl"} />
                </div>
                <div className="w-100">
                    <h4>Valoracion</h4>
                    <h6>primario: es el porcentaje del puntaje total que equivale a los valores de los atributos primarios.</h6>
                    <h6>secundario: es el porcentaje del puntaje total que equivale a los valores de los atributos secundarios.</h6>
                    <h6>la suma de ambos valores no puede exceder el 98%, ya que para el buen funcionamiento del calculator queda reservado como minimo un 2% para los valores terciarios</h6>
                    <label className='pondendador'>Primario: <input type="number" defaultValue={45} name="valor-primario" /></label>
                    <label className='pondendador'>Secundario: <input type="number" defaultValue={30} name="valor-secundario" /></label>
                    <label className='pondendador'>Jugadores a mostrar: <input type="number" defaultValue={10} name="valor-cantidad" /></label>
                </div>
                <button type="submit">Calcular</button>
            </form>
                <PanelInformacion jugadorProcesado={jugadorProcesado} fecha={fecha} posicion={posicionJugador}/>
        </div>
    );
};
