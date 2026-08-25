import { useState } from "react";
import './CalculatorPosicion.css'


export const CalculatorPosicion = ({jugadores}) => {

    const [ultimoRegistro, setUltimoRegistro] = useState("00.00.0000")
    console.log(jugadores)

    const ultimoRegistroDecimal = Math.max(0,...jugadores.flatMap(j => j.atributos.map(a => a.fecha.fechaDecimal)));

    let arqueros = []
    let defensores = []

    let posiciones = [arqueros, defensores]
    let posicionesTitulos = ["arqueros", "defensores centrales"]
    jugadores.forEach( j => {
        j.atributos.forEach( att => {
            if(ultimoRegistro === '00.00.0000'){
                att.fecha.fechaDecimal === ultimoRegistroDecimal && setUltimoRegistro(att.fecha.fecha)
            }
            if(ultimoRegistroDecimal === att.fecha.fechaDecimal){
                if(att.posicion.includes("por")){
                    let pje = ((parseFloat(att.alcanceAereo*0.039) +parseFloat(att.blocaje*0.039) +parseFloat(att.comunicacion*0.039) +parseFloat(att.control*0.028) +parseFloat(att.excentricidad*0.017) +parseFloat(att.salidaPunos*0.011) +parseFloat(att.mando*0.056) +parseFloat(att.pases*0.028) +parseFloat(att.reflejos*0.056) +parseFloat(att.salidas*0.039) +parseFloat(att.saqueConMano*0.034) +parseFloat(att.saqueDePuerta*0.056) +parseFloat(att.manoAMano*0.051) +parseFloat(att.agresividad*0.011) +parseFloat(att.anticipacion*0.051) +parseFloat(att.colocacion*0.056) +parseFloat(att.concentracion*0.056) +parseFloat(att.decisiones*0.034) +parseFloat(att.desmarques*0.011) +parseFloat(att.determinacion*0.011) +parseFloat(att.juegoEnEquipo*0.011) +parseFloat(att.liderazgo*0.011) +parseFloat(att.sacrificio*0.011) +parseFloat(att.serenidad*0.039) +parseFloat(att.talento*0.011) +parseFloat(att.valentia*0.011) +parseFloat(att.vision*0.028) +parseFloat(att.aceleracion*0.028) +parseFloat(att.agilidad*0.056) +parseFloat(att.salto*0.011) +parseFloat(att.equilibrio*0.011) +parseFloat(att.fuerza*0.011) +parseFloat(att.recuperacionFisica*0.011) +parseFloat(att.resistencia*0.011) +parseFloat(att.velocidad*0.011)) * 5).toFixed(2)

                    arqueros.push({jugador: att.jugador, pje: parseFloat(pje), edad: j.fechaNacimiento === 0 ? "?" :parseInt((ultimoRegistroDecimal - j.fechaNacimiento) / 365.25)})
                    // console.log(att)
                }
                if(att.posicion.includes("df (c)") || att.posicion.includes("df (dc)" || att.posicion.includes("df (ic)") || att.posicion.includes("df (dic)"))){
                    let pje = ((parseFloat(att.cabeza*0.055) + parseFloat(att.centros*0.017) + parseFloat(att.control*0.029) + parseFloat(att.entradas*0.060) + parseFloat(att.marcaje*0.055) + parseFloat(att.pases*0.034) + parseFloat(att.penales*0.012) + parseFloat(att.regates*0.022) + parseFloat(att.remates*0.012) + parseFloat(att.corners*0.012) + parseFloat(att.saquesLargos*0.012) + parseFloat(att.tecnica*0.029) + parseFloat(att.tirosLejanos*0.012) + parseFloat(att.tirosLibres*0.012) + parseFloat(att.agresividad*0.033) + parseFloat(att.anticipacion*0.041) + parseFloat(att.colocacion*0.058) + parseFloat(att.concentracion*0.041) + parseFloat(att.decisiones*0.041) + parseFloat(att.desmarques*0.017) + parseFloat(att.determinacion*0.012) + parseFloat(att.juegoEnEquipo*0.019) + parseFloat(att.liderazgo*0.012) + parseFloat(att.sacrificio*0.017) + parseFloat(att.serenidad*0.039) + parseFloat(att.talento*0.012) + parseFloat(att.valentia*0.041) + parseFloat(att.vision*0.019) + parseFloat(att.aceleracion*0.012) + parseFloat(att.agilidad*0.017) + parseFloat(att.salto*0.055) + parseFloat(att.equilibrio*0.012) + parseFloat(att.fuerza*0.055) + parseFloat(att.recuperacionFisica*0.012) + parseFloat(att.resistencia*0.021) + parseFloat(att.velocidad*0.039)) * 5 ).toFixed(2)

                    defensores.push({jugador: att.jugador, pje: parseFloat(pje), edad: j.fechaNacimiento === 0 ? "?" :parseInt((ultimoRegistroDecimal - j.fechaNacimiento) / 365.25)})
                    // console.log(att)
                }

            }
        })
    })

    posiciones.forEach(p => {
        p.sort((a,b) => b.pje - a.pje)
    })
    console.log(defensores)
    return(
        <div className="standard">
            <h2>Ultimo Registro: {ultimoRegistro}</h2>
            <div className="contenedor-posiciones">
                {posiciones.map((p,idx) => (
                    <div className="tabla-posicion" key={idx}>
                        <h4>{posicionesTitulos[idx]}</h4>
                        {p.map((j,idx2) => (
                            <div className="jugador" key={idx2}>
                                <div className="w-50">{j.jugador}</div>
                                <div className="w-20">{j.pje}</div>
                                <div className="w-20">{j.edad}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}