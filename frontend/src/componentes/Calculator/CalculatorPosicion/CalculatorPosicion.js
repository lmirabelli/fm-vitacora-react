import { useState } from "react";
import './CalculatorPosicion.css'


export const CalculatorPosicion = ({jugadores}) => {

    const [ultimoRegistro, setUltimoRegistro] = useState("00.00.0000")
    console.log(jugadores)

    const ultimoRegistroDecimal = Math.max(0,...jugadores.flatMap(j => j.atributos.map(a => a.fecha.fechaDecimal)));

    let arqueros = []
    let defensores = []
    let lateralesDerechos = []
    let lateralesIzquierdos = []
    let medioDefensivos = []

    let posiciones = [arqueros, defensores, lateralesDerechos, lateralesIzquierdos, medioDefensivos]
    let posicionesTitulos = ["arqueros", "defensores centrales", "laterales derechos", "laterales izquierdos", "mediocampo defensivo"]
    jugadores.forEach( j => {
        j.atributos.forEach( att => {

            let izquierda = false
            let derecha = false
            let centro = false

            if(att.posicion.includes("(c)") || att.posicion.includes("(dc)") || att.posicion.includes("(ic)") || att.posicion.includes("(dic)")){
                centro = true
            }

            if(att.posicion.includes("(d)") || att.posicion.includes("(dc)") || att.posicion.includes("(di)") || att.posicion.includes("(dic)")){
                derecha = true
            }

            if(att.posicion.includes("(i)") || att.posicion.includes("(ic)") || att.posicion.includes("(di)") || att.posicion.includes("(dic)")){
                izquierda = true
            }

            if(ultimoRegistro === '00.00.0000'){
                att.fecha.fechaDecimal === ultimoRegistroDecimal && setUltimoRegistro(att.fecha.fecha)
            }
            if(ultimoRegistroDecimal === att.fecha.fechaDecimal){
                if(att.posicion.includes("por")){
                    let pje = ((parseFloat(att.alcanceAereo*0.039) +parseFloat(att.blocaje*0.039) +parseFloat(att.comunicacion*0.039) +parseFloat(att.control*0.028) +parseFloat(att.excentricidad*0.017) +parseFloat(att.salidaPunos*0.011) +parseFloat(att.mando*0.056) +parseFloat(att.pases*0.028) +parseFloat(att.reflejos*0.056) +parseFloat(att.salidas*0.039) +parseFloat(att.saqueConMano*0.034) +parseFloat(att.saqueDePuerta*0.056) +parseFloat(att.manoAMano*0.051) +parseFloat(att.agresividad*0.011) +parseFloat(att.anticipacion*0.051) +parseFloat(att.colocacion*0.056) +parseFloat(att.concentracion*0.056) +parseFloat(att.decisiones*0.034) +parseFloat(att.desmarques*0.011) +parseFloat(att.determinacion*0.011) +parseFloat(att.juegoEnEquipo*0.011) +parseFloat(att.liderazgo*0.011) +parseFloat(att.sacrificio*0.011) +parseFloat(att.serenidad*0.039) +parseFloat(att.talento*0.011) +parseFloat(att.valentia*0.011) +parseFloat(att.vision*0.028) +parseFloat(att.aceleracion*0.028) +parseFloat(att.agilidad*0.056) +parseFloat(att.salto*0.011) +parseFloat(att.equilibrio*0.011) +parseFloat(att.fuerza*0.011) +parseFloat(att.recuperacionFisica*0.011) +parseFloat(att.resistencia*0.011) +parseFloat(att.velocidad*0.011)) * 5).toFixed(2)

                    arqueros.push({jugador: att.jugador, posicion: att.posicion, mejorPosicion: att.mejorPosicion, pje: parseFloat(pje), edad: j.fechaNacimiento === 0 ? "?" :parseInt((ultimoRegistroDecimal - j.fechaNacimiento) / 365.25)})
                }
                if(att.posicion.includes("df") && centro){
                    let pje = ((parseFloat(att.cabeza*0.055) + parseFloat(att.centros*0.017) + parseFloat(att.control*0.029) + parseFloat(att.entradas*0.060) + parseFloat(att.marcaje*0.055) + parseFloat(att.pases*0.034) + parseFloat(att.penales*0.012) + parseFloat(att.regates*0.022) + parseFloat(att.remates*0.012) + parseFloat(att.corners*0.012) + parseFloat(att.saquesLargos*0.012) + parseFloat(att.tecnica*0.029) + parseFloat(att.tirosLejanos*0.012) + parseFloat(att.tirosLibres*0.012) + parseFloat(att.agresividad*0.033) + parseFloat(att.anticipacion*0.041) + parseFloat(att.colocacion*0.058) + parseFloat(att.concentracion*0.041) + parseFloat(att.decisiones*0.041) + parseFloat(att.desmarques*0.017) + parseFloat(att.determinacion*0.012) + parseFloat(att.juegoEnEquipo*0.019) + parseFloat(att.liderazgo*0.012) + parseFloat(att.sacrificio*0.017) + parseFloat(att.serenidad*0.039) + parseFloat(att.talento*0.012) + parseFloat(att.valentia*0.041) + parseFloat(att.vision*0.019) + parseFloat(att.aceleracion*0.012) + parseFloat(att.agilidad*0.017) + parseFloat(att.salto*0.055) + parseFloat(att.equilibrio*0.012) + parseFloat(att.fuerza*0.055) + parseFloat(att.recuperacionFisica*0.012) + parseFloat(att.resistencia*0.021) + parseFloat(att.velocidad*0.039)) * 5 ).toFixed(2)

                    defensores.push({jugador: att.jugador, posicion: att.posicion, mejorPosicion: att.mejorPosicion, pje: parseFloat(pje), edad: j.fechaNacimiento === 0 ? "?" :parseInt((ultimoRegistroDecimal - j.fechaNacimiento) / 365.25)})
                }
                if(att.posicion.includes("df") || att.posicion.includes("cr")){
                        let pje = ((parseFloat(att.cabeza*0.017) + parseFloat(att.centros*0.037) + parseFloat(att.control*0.034) + parseFloat(att.entradas*0.055) + parseFloat(att.marcaje*0.048) + parseFloat(att.pases*0.039) + parseFloat(att.penales*0.012) + parseFloat(att.regates*0.035) + parseFloat(att.remates*0.012) + parseFloat(att.corners*0.012) + parseFloat(att.saquesLargos*0.012) + parseFloat(att.tecnica*0.039) + parseFloat(att.tirosLejanos*0.014) + parseFloat(att.tirosLibres*0.012) + parseFloat(att.agresividad*0.015) + parseFloat(att.anticipacion*0.046) + parseFloat(att.colocacion*0.048) + parseFloat(att.concentracion*0.035) + parseFloat(att.decisiones*0.039) + parseFloat(att.desmarques*0.037) + parseFloat(att.determinacion*0.012) + parseFloat(att.juegoEnEquipo*0.052) + parseFloat(att.liderazgo*0.012) + parseFloat(att.sacrificio*0.043) + parseFloat(att.serenidad*0.023) + parseFloat(att.talento*0.021) + parseFloat(att.valentia*0.015) + parseFloat(att.vision*0.017) + parseFloat(att.aceleracion*0.037) + parseFloat(att.agilidad*0.030) + parseFloat(att.salto*0.014) + parseFloat(att.equilibrio*0.021) + parseFloat(att.fuerza*0.019) + parseFloat(att.recuperacionFisica*0.012) + parseFloat(att.resistencia*0.041) + parseFloat(att.velocidad*0.032)) * 5).toFixed(2)

                        if(derecha){
                            lateralesDerechos.push({jugador: att.jugador, posicion: att.posicion, mejorPosicion: att.mejorPosicion, pje: parseFloat(pje), edad: j.fechaNacimiento === 0 ? "?" :parseInt((ultimoRegistroDecimal - j.fechaNacimiento) / 365.25)})
                        }
                        if(izquierda){
                            lateralesIzquierdos.push({jugador: att.jugador, posicion: att.posicion, mejorPosicion: att.mejorPosicion, pje: parseFloat(pje), edad: j.fechaNacimiento === 0 ? "?" :parseInt((ultimoRegistroDecimal - j.fechaNacimiento) / 365.25)})
                        }
                }
                if(att.posicion.includes("mc") || (att.posicion.includes("me") && centro)){
                    let pje = ((parseFloat(att.cabeza*0.013) +parseFloat(att.centros*0.013) +parseFloat(att.control*0.031) +parseFloat(att.entradas*0.066) +parseFloat(att.marcaje*0.040) +parseFloat(att.pases*0.040) +parseFloat(att.penales*0.013) +parseFloat(att.regates*0.016) +parseFloat(att.remates*0.016) +parseFloat(att.corners*0.013) +parseFloat(att.saquesLargos*0.013) +parseFloat(att.tecnica*0.022) +parseFloat(att.tirosLejanos*0.016) +parseFloat(att.tirosLibres*0.013) +parseFloat(att.agresividad*0.040) +parseFloat(att.anticipacion*0.057) +parseFloat(att.colocacion*0.049) +parseFloat(att.concentracion*0.051) +parseFloat(att.decisiones*0.046) +parseFloat(att.desmarques*0.022) +parseFloat(att.determinacion*0.013) +parseFloat(att.juegoEnEquipo*0.063) +parseFloat(att.liderazgo*0.016) +parseFloat(att.sacrificio*0.046) +parseFloat(att.serenidad*0.037) +parseFloat(att.talento*0.013) +parseFloat(att.valentia*0.022) +parseFloat(att.vision*0.016) +parseFloat(att.aceleracion*0.016) +parseFloat(att.agilidad*0.019) +parseFloat(att.salto*0.016) +parseFloat(att.equilibrio*0.016) +parseFloat(att.fuerza*0.034) +parseFloat(att.recuperacionFisica*0.013) +parseFloat(att.resistencia*0.046) +parseFloat(att.velocidad*0.022)) *5).toFixed(2)


                    medioDefensivos.push({jugador: att.jugador, posicion: att.posicion, mejorPosicion: att.mejorPosicion, pje: parseFloat(pje), edad: j.fechaNacimiento === 0 ? "?" :parseInt((ultimoRegistroDecimal - j.fechaNacimiento) / 365.25)})

                }
            }
        })
    })

    posiciones = posiciones.map(p => {
        p.sort((a,b) => b.pje - a.pje)
        return p.filter(a => a.pje >= p[0].pje * 0.8)
    })

    const crearPaleta = (pje, max) => {
    let porcentaje = (pje / max) * 100;

    return {
        background: `linear-gradient(to right, #00be7f ${porcentaje - 10}%, #ffffff ${porcentaje}%)`
    };
}


    return(
        <div className="standard">
            <h2>Ultimo Registro: {ultimoRegistro}</h2>
            <div className="contenedor-posiciones">
                {posiciones.map((p,idx) => (
                    <div className="tabla-posicion" key={idx} >
                        <h4>{posicionesTitulos[idx]}</h4>
                        {p.map((j,idx2) => (
                            <div className="jugador" key={idx2} style={crearPaleta(j.pje,p[0].pje)}>
                                <div className="w-60">
                                    <div className="w-100">{j.jugador} {` - ${j.mejorPosicion.toUpperCase()}`}</div>
                                    <div className="w-100" style={{color: "#002f18", fontSize: "8px"}}>{j.posicion.toUpperCase()}</div>
                                </div>
                                <div className="w-20">{j.pje.toFixed(2)}</div>
                                <div className="w-20">{j.edad}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}