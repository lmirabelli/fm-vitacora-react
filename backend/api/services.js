import fs from "fs";

export const cargarBaseDeDatos = (archivoDeDatos) => {
    const json = fs.readFileSync(archivoDeDatos, "utf-8");
    let listaDeDatos = JSON.parse(json);
    return listaDeDatos;
};

export const busquedaEscudo = (lista, club) => {

    club = club.includes("(s21)") ? club.slice(6) : club
    club = club.includes(".-") ? club.slice(8) : club
    let buscarEscudo = lista.find((i) => i.equipo == club.slice(0, -6));
    let linkImagen = {escudo: buscarEscudo ? buscarEscudo.imagen : "https://i.ibb.co/Vtxh4dx/X.png",
        colorPrimario: buscarEscudo ? buscarEscudo.color1 : "#e5e5c5",
        colorSecundario: buscarEscudo ? buscarEscudo.color2 : "#252545",
        paisDelEquipo: buscarEscudo ? buscarEscudo.pais : "desconocido",
        estado: !buscarEscudo ? "sinEscudo" : "ok"
    };
    return linkImagen;
};

export const busquedaBandera = (listaDePaises, pais) => {
    let buscarBandera = listaDePaises.find(i => i.pais == pais);
    let linkImagen = {
        bandera: buscarBandera ? buscarBandera.imagen : 'https://i.ibb.co/Vtxh4dx/X.png',
        colorPrimario: buscarBandera ? buscarBandera.color1 : "#e5e5c5",
        colorSecundario: buscarBandera ? buscarBandera.color2 : "#252545"}
    return linkImagen;
};

export const entablar = (p, listaDeEscudos, listaDeBanderas, club, pais, temporada, tablaHistorica) => {
    let victoria3 = temporada >= 1994 ? p.golesLocal > p.golesVisitante ? p.local : p.golesLocal < p.golesVisitante ? p.visitante : "." : "."
    let victoria2 = temporada < 1994 ? p.golesLocal > p.golesVisitante ? p.local : p.golesLocal < p.golesVisitante ? p.visitante : "." : "."
    let derrota = p.golesLocal > p.golesVisitante ? p.visitante : p.golesLocal < p.golesVisitante ? p.local : "."
    let empate = p.golesLocal == p.golesVisitante ? "empate" : "."
    let golesFavor = p.local == club ? p.golesLocal : p.golesVisitante
    let golesContra = p.visitante == club ? p.golesLocal : p.golesVisitante

    let busquedaClub = tablaHistorica.find(a => a.nombreDelEquipo == club)
    
    if(!busquedaClub){
        const escudo = busquedaEscudo(listaDeEscudos, `${club} (xxx)`)
        const bandera = busquedaBandera(listaDeBanderas, pais)

        let nuevoClub = {
            nombreDelEquipo: club,
            escudo,
            pais,
            bandera,
            pg3: victoria3 == club ? 1 : 0,
            pg2: victoria2 == club ? 1 : 0,
            pp: derrota == club ? 1 : 0,
            pe: empate == "empate" ? 1 : 0,
            gf: golesFavor,
            gc: golesContra,
            goleada: golesFavor >= 3 ? 1 : 0,
            vallaInvicta: golesContra == 0 ? 1 : 0,
            ultimaparticipacion: temporada,
            participaciones: [temporada]
        }
        tablaHistorica.push(nuevoClub)
    } else {
        club == victoria3 && busquedaClub.pg3++
        club == victoria2 && busquedaClub.pg2++
        club == derrota && busquedaClub.pp++
        empate == "empate" && busquedaClub.pe++
        busquedaClub.gf += golesFavor
        busquedaClub.gc += golesContra
        golesFavor >= 3 && busquedaClub.goleada++
        golesContra == 0 && busquedaClub.vallaInvicta++
        busquedaClub.ultimaparticipacion = temporada
        let temporadaUnica = busquedaClub.participaciones.find(t => t == temporada)
        !temporadaUnica && busquedaClub.participaciones.push(temporada)
    }
    
    return tablaHistorica;
}

export const calcularEstadisticasFinales = (tablaHistorica) => {
    for(let equipo of tablaHistorica){
        let diferencia = equipo.gf - equipo.gc
        let ptsTradicional = equipo.pg2 * 2 + equipo.pg3 * 3 + equipo.pe
        let ptsTradicionalC = ptsTradicional + diferencia / 10000 + equipo.gf / 1000000
        let ptsModerno = ptsTradicional + equipo.goleada + equipo.vallaInvicta
        let ptsModernoC = ptsModerno + diferencia / 10000 + equipo.gf / 1000000

        equipo.pg = equipo.pg2 + equipo.pg3
        equipo.diferencia = diferencia
        equipo.ptsTradicional = ptsTradicional
        equipo.ptsTradicionalC = ptsTradicionalC
        equipo.ptsModerno = ptsModerno
        equipo.ptsModernoC = ptsModernoC
    }
    
    return tablaHistorica;
}

export const calcularFechas = (dia,mes,anio) => {

    const fechaUniversal = new Date(`${anio}-${mes}-${dia}`)
    const fechaDecimal = Math.floor(fechaUniversal.getTime() / 86400000);
    const diaV = String(dia).padStart(2, "0");
    const mesV = String(mes).padStart(2, "0");
    const fecha = `${diaV}.${mesV}.${anio}`;

    return ({fecha,fechaDecimal})
}

export const estructurarJugadores = (j,listaDePaises,listaDeEscudos) => {

    j.bandera = busquedaBandera(listaDePaises,j.nacionalidad)
    j.escudoCantera = busquedaEscudo(listaDeEscudos,j.cantera)
    j.situacion = j.etapas[j.etapas.length - 1].fechaSalida === "00.00.0000" ? "club" : "fuera"
    j.cantidadEtapas = j.etapas.length
    j.etapas.forEach(etapa => {
        etapa.escudoAnterior = busquedaEscudo(listaDeEscudos,etapa.clubAnterior)
        etapa.escudoPosterior = busquedaEscudo(listaDeEscudos,etapa.clubPosterior)
        etapa.escudoMiEquipo = busquedaEscudo(listaDeEscudos,etapa.miEquipo)
        etapa.edadLlegada = parseInt((etapa.fechaDecimalLlegada - j.fechaDecimalNacimiento) / 365.25)
        etapa.edadSalida = etapa.fechaDecimalSalida == -1 ? "--" : parseInt((etapa.fechaDecimalSalida - j.fechaDecimalNacimiento) / 365.25)
    });

    return (j)
}

export default {
    cargarBaseDeDatos,
    busquedaEscudo,
    busquedaBandera,
    entablar,
    calcularEstadisticasFinales,
    calcularFechas,
    estructurarJugadores
};