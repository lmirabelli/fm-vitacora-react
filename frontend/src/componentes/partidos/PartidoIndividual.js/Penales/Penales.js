


export const Penales = ({listaDePenales}) => {


    let fechar = (dia,mes,anio) => {

        dia = parseInt(dia) < 10 ? `0${dia}` : dia
        mes = parseInt(mes) < 10 ? `0${mes}` : mes

        return `${dia}.${mes}.${anio}`
    }

    let colorear = (final) => {

        let estilo = {background: "#35353550", color: "#fef1f3"}

        final === "convertido" && (estilo = {background: "#083f0450", color: "#fef1f3"})
        final === "fallado" && (estilo = {background: "#3f040450", color: "#fef1f3"})

        return estilo
    }
    return(
        <div className="w-100 pk-container">
            <h2>Penales</h2>
            {listaDePenales.map((pk, idx) => (
                <div className="w-100 pk" style={colorear(pk.final)} key={idx}>
                    <div className="w-5">{idx + 1}</div>
                    <div className="w-20">{fechar(pk.dia,pk.mes,pk.anio)}</div>
                    <div className="w-25">{pk.pateador}</div>
                    <div className="w-25">{pk.arqueroRival}</div>
                    <div className="w-20">{pk.momentum}</div>
                </div>
            ))}
        </div>
    )
}