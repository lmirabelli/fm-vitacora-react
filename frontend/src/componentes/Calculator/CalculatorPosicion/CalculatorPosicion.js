import { useState } from "react";


export const CalculatorPosicion = ({jugadores}) => {

    const [ultimoRegistro, setUltimoRegistro] = useState("00.00.0000")
    console.log(jugadores)

    const ultimoRegistroDecimal = Math.max(0,...jugadores.flatMap(j => j.atributos.map(a => a.fecha.fechaDecimal)));

    let arqueros = []
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

            }
        })
    })
    console.log(arqueros)
    return(
        <div className="standard">
            <h2>Ultimo Registro: {ultimoRegistro}</h2>
        </div>
    )
}