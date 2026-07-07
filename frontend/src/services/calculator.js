

export const FormulaCalculator = (atributos) => {

    let porcentajePrimario = 0.75
    let porcentajeSecundario = 0.22
    let porcentajeTerciario = 1 - porcentajePrimario - porcentajeSecundario

    let jug = {}
    const {
        aer, blo, com, exc, pun, mdo, ref, sld, sqm, sqp, uvu, cab, cen, ctr, ent, mar, pas, pen, reg, rem, sqe, sql, tec, tle, tli, agr, ant, col, cnc, dec, dmq, det, jeq, lid, sac, ser, tal, val, vis, ace, agi, equ, sal, fue, rfi, res, vel
    } = atributos;

    let atributosTotal = ((aer + blo + com + exc + pun + mdo + ref + sld + sqm + sqp + uvu + cab + cen + ctr + ent + mar + pas + pen + reg + rem + sqe + sql + tec + tle + tli + agr + ant + col + cnc + dec + dmq + det + jeq + lid + sac + ser + tal + val + vis + ace + agi + equ + sal + fue + rfi + res + vel))

    //portero defensa
    let prc = ((aer + blo + com + mdo + ref + sqp + col + cnc + agi) / 9)
    let sec = ((sqm + uvu + ant + dec + vel) / 5)
    let trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.pordf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    //portero cierre - defensa

    prc = ((mdo + ref + sqp + uvu + ant + col + cnc + agi) / 8)
    sec = ((aer + blo + com + ctr + pas + sld + sqm + dec + ser + vis + ace + vel) / 12)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.pcidf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    //portero cierre - apoyo

    prc = ((mdo + ref + sld + sqp + uvu + ant + col + cnc + ser + agi) / 10)
    sec = ((aer + blo + com + ctr + pas + sqm + dec + vis + ace + vel) / 10)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.pciap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    //portero cierre - ataque

    prc = ((mdo + ref + sld + sqp + uvu + ant + col + cnc + ser + agi) / 10)
    sec = ((aer + blo + com + ctr + exc + pas + sqm + dec + vis + ace + vel) / 11)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.pciat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    jug.porpromedio = (jug.pordf + jug.pcidf + jug.pciap + jug.pciat) / 4

    //carrilero - defensa

    prc = ((ent + mar + ant + col + jeq + sac + ace + res) / 8)
    sec = ((cen + ctr + pas + reg + tec + cnc + dec + dmq + agi + equ + vel) / 11)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.cardf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    //carrilero - apoyo

    prc = ((cen + ent + mar + reg + dmq + jeq + sac + ace + res) / 9)
    sec = ((ctr + pas + tec + ant + col + cnc + dec + agi + equ + vel) / 10)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.carap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    //carrilero - ataque

    prc = ((cen + ent + reg + tec + dmq + jeq + sac + ace + res + vel) / 10)
    sec = ((ctr + mar + pas + ant + col + cnc + dec + tal + agi + equ) / 10)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.carat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.carpromedio = (jug.cardf + jug.carap + jug.carat) / 3

    //carrilero Completo - apoyo

    prc = ((cen + reg + tec + dmq + jeq + sac + ace + res) / 8)
    sec = ((ctr + ent + mar + pas + ant + col + dec + tal + agi + equ + vel) / 11)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.ccmap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    //carrilero Completo - ataque

    prc = ((cen + reg + tec + dmq + jeq + sac + tal + ace + res) / 9)
    sec = ((ctr + ent + mar + pas + ant + col + dec + agi + equ + vel) / 10)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.ccmat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.ccmpromedio = (jug.ccmap + jug.ccmat) / 2

    //carrilero Inverso - defensa

    prc = ((ent + pas + ant + col + dec + jeq) / 6)
    sec = ((ctr + mar + tec + cnc + dmq + sac + ser + ace + agi + res + vel) / 11)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.cindf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    //carrilero inverso - apoyo

    prc = ((ctr + ent + pas + dec + jeq + ser) / 6)
    sec = ((mar + tec + ant + col + cnc + dmq + sac + vis + agi + res) / 10)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.cinap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // carrilero inverso - ataque

    prc = ((ctr + ent + pas + tec + dec + dmq + jeq + ser + vis + ace) / 10)
    sec = ((cen + mar + reg + tle + ant + col + cnc + sac + tal + agi + res + vel) / 12)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.cinat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.cinpromedio = (jug.cindf + jug.cinap + jug.cinat) / 3

    // central lateral - defensa

    prc = ((cab + ent + mar + col + sal + fue) / 6)
    sec = ((ctr + pas + reg + tec + agr + ant + cnc + dec + sac + ser + val + agi + vel) / 13)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.cltdf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // central lateral - apoyo

    prc = ((cab + ent + mar + reg + col + sal + fue + vel) / 8)
    sec = ((cen + ctr + pas + tec + agr + ant + cnc + dec + dmq + sac + ser + val + agi + res) / 14)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.cltap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // central lateral - ataque

    prc = ((cab + cen + ent + mar + reg + dmq + sal + fue + res + vel) / 10)
    sec = ((ctr + pas + tec + agr + ant + col + cnc + dec + sac + ser + val + agi) / 12)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.cltat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.cltpromedio = (jug.cltdf + jug.cltap + jug.cltat) / 3

    // central practico - defensa

    prc = ((cab + ent + mar + col + sal + fue) / 6)
    sec = ((agr + ant + cnc + val + vel) / 5)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.ctpdf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // central parctico - tapon

    prc = ((cab + ent + agr + col + val + sal + fue) / 7)
    sec = ((mar + ant + cnc) / 3)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.ctptp = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    prc = ((ent + mar + ant + col + cnc + vel) / 6)
    sec = ((cab + val + sal + fue) / 4)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.ctpco = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.ctppromedio = (jug.ctpdf + jug.ctptp + jug.ctpco) / 3

    // defensa central - defensa

    prc = ((cab + ent + mar + col + sal + fue) / 6)
    sec = ((agr + ant + cnc + dec + ser + val + vel) / 7)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.dfcdf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // defensa central - tapon

    prc = ((cab + ent + agr + col + dec + val + sal + fue) / 8)
    sec = ((mar + ant + cnc + ser) / 4)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.dfctp = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // defensa central - cubrir

    prc = ((ent + mar + ant + col + cnc + dec + vel) / 7)
    sec = ((cab + ser + val + sal + fue) / 5)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.dfcco = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.dfcpromedio = (jug.dfcdf + jug.dfctp + jug.dfcco) / 3

    // defensa central con toque - defensa

    prc = ((cab + ent + mar + pas + col + sal + fue + ser) / 8)
    sec = ((ctr + tec + agr + ant + cnc + dec + val + vis + vel) / 9)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.dftdf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // defensa central con toque - tapon

    prc = ((cab + ent + pas + agr + col + dec + ser + val + sal + fue) / 10)
    sec = ((ctr + mar + tec + ant + cnc + vis) / 6)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.dfttp = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // defensa central con toque - cubrir

    prc = ((ent + mar + pas + ant + col + cnc + dec + ser + vel) / 9)
    sec = ((cab + ctr + tec + val + vis + sal + fue) / 7)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.dftco = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.dftpromedio = (jug.dftdf + jug.dfttp + jug.dftco) / 3

    // lateral - defensa

    prc = ((ent + mar + ant + col + cnc) / 5)
    sec = ((cen + pas + dec + jeq + sac + res + vel) / 7)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.latdf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // lateral - apoyo

    prc = ((ent + mar + ant + col + cnc + jeq) / 6)
    sec = ((cen + pas + reg + tec + dec + sac + res + vel) / 8)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.latap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // lateral - ataque

    prc = ((cen + ent + mar + ant + col + jeq) / 6)
    sec = ((ctr + pas + reg + tec + cnc + dec + dmq + sac + agi + res + vel) / 11)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.latat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.latpromedio = (jug.latap + jug.latat + jug.latdf) / 3

    // lateral inverso - defensa

    prc = ((cab + ent + mar + col + fue) / 5)
    sec = ((ctr + pas + reg + tec + agr + ant + cnc + dec + sac + ser + val + agi + sal + vel) / 14)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.lindf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // lateral practico - defensa

    prc = ((ent + mar + ant + col + fue) / 5)
    sec = ((cab + agr + cnc + jeq + val) / 5)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.lprdf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // libero - defensa

    prc = ((cab + ctr + ent + mar + pas + tec + col + dec + jeq + ser + sal + fue) / 12)
    sec = ((ant + cnc + val + res + vel) / 5)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.libdf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // libero - apoyo

    prc = ((cab + ctr + ent + mar + pas + tec + col + dec + jeq + ser + sal + fue) / 12)
    sec = ((reg + ant + cnc + val + vis + res + vel) / 7)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.libap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.libpromedio = (jug.libap + jug.libdf) / 2

    // buscador de espacios - ataque

    prc = ((rem + ant + cnc + dec + dmq + ser + equ) / 7)
    sec = ((ctr + tec + sac + ace + res) / 5)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.bdeat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // centrocampista - defensa

    prc = ((ent + col + cnc + dec + jeq) / 5)
    sec = ((ctr + mar + pas + tec + agr + ant + sac + ser + res) / 9)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.ctcdf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // centrocampista - apoyo

    prc = ((ctr + ent + pas + dec + jeq) / 5)
    sec = ((tec + ant + cnc + dmq + sac + ser + val + res) / 8)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.ctcap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // centrocampista - ataque

    prc = ((ctr + pas + dec + dmq) / 4)
    sec = ((ent + tec + tle + ant + jeq + sac + ser + vis + ace + res) / 10)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.ctcat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.ctcpromedio = (jug.ctcdf + jug.ctcap + jug.ctcat) / 3

    // centrocampista de banda - defensa

    prc = ((ent + pas + col + cnc + dec + jeq + sac) / 7)
    sec = ((cen + ctr + mar + tec + ant + ser + res) / 7)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.cmbdf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // centrocampista de banda - apoyo

    prc = ((ent + pas + dec + jeq + sac + res) / 6)
    sec = ((cen + ctr + tec + ant + col + cnc + dmq + ser + vis) / 9)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.cmbap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // centrocampista de banda - ataque

    prc = ((cen + ctr + pas + dec + jeq + sac + res) / 7)
    sec = ((ent + tec + ant + dmq + ser + vis) / 6)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.cmbat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.cmbpromedio = (jug.cmbdf + jug.cmbap + jug.cmbat) / 3

    // centrocampista recuperador - defensa

    prc = ((ent + agr + ant + jeq + sac + res) / 6)
    sec = ((mar + col + cnc + val + agi + fue + vel) / 7)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.recdf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // centrocampista recuperador - apoyo

    prc = ((ent + agr + ant + jeq + sac + res) / 6)
    sec = ((mar + pas + cnc + val + agi + fue + vel) / 7)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.recap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.recpromedio = (jug.recap + jug.recdf) / 2

    // centrocampista todoterreno

    prc = ((ent + pas + dmq + jeq + sac + res) / 6)
    sec = ((ctr + reg + rem + tec + tle + agr + ant + col + dec + ser + ace + equ + fue + vel) / 14)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.cttap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // delantero interior - apoyo

    prc = ((ctr + reg + rem + tec + dmq + ace + agi) / 7)
    sec = ((pas + tle + ant + sac + ser + tal + vis + equ + res + vel) / 10)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.dliap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // delantero interior - ataque

    prc = ((ctr + reg + rem + tec + ant + dmq + ace + agi) / 8)
    sec = ((pas + tle + sac + ser + tal + equ + res + vel) / 8)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.dliat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.dlipromedio = (jug.dliap + jug.dliat) / 2

    // delantero objetivo escorado - apoyo

    prc = ((cab + jeq + val + sal + fue) / 5)
    sec = ((cen + ctr + ant + dmq + sac + equ + res) / 7)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.doeap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // delantero objetivo escorado - ataque

    prc = ((cab + dmq + val + sal + fue) / 5)
    sec = ((cen + ctr + rem + ant + jeq + sac + equ + res) / 8)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.doeat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.doepromedio = (jug.doeap + jug.doeat) / 2

    // delantero sorpresa - ataque

    prc = ((ctr + reg + rem + ant + dmq + ser + ace) / 7)
    sec = ((pas + tec + cnc + dec + sac + agi + equ + res + vel) / 9)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.dsrat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // enganche - apoyo

    prc = ((ctr + pas + tec + dec + ser + vis) / 6)
    sec = ((reg + ant + dmq + jeq + tal + agi) / 6)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.engap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // extremo - apoyo

    prc = ((cen + reg + tec + ace + agi) / 5)
    sec = ((ctr + pas + dmq + sac + equ + res + vel) / 7)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.extap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // extremo - ataque

    prc = ((cen + reg + tec + ace + agi) / 5)
    sec = ((ctr + pas + ant + dmq + sac + tal + equ + res + vel) / 9)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.extat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.extpromedio = (jug.extap + jug.extat) / 2

    // extremo defensivo - defensa

    prc = ((tec + ant + col + dmq + jeq + sac + res) / 7)
    sec = ((cen + ctr + ent + mar + reg + agr + cnc + dec + ace) / 9)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.exddf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // extremo defensivo - apoyo

    prc = ((cen + tec + dmq + jeq + sac + res) / 6)
    sec = ((ctr + ent + mar + pas + reg + agr + ant + col + cnc + dec + ser + ace) / 12)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.exdap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.exdpromedio = (jug.exddf + jug.exdap) / 2

    // extremo inverso - apoyo

    prc = ((cen + pas + reg + tec + ace + agi) / 6)
    sec = ((ctr + tle + dec + dmq + sac + ser + vis + equ + res + vel) / 10)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.exiap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // extremo inverso - ataque

    prc = ((cen + pas + reg + tec + ace + agi) / 6)
    sec = ((ctr + tle + ant + dec + dmq + sac + ser + tal + vis + equ + res + vel) / 12)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.exiat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.exipromedio = (jug.exiap + jug.exiat) / 2

    // interior mixto - apoyo

    prc = ((ctr + ent + pas + col + dec + jeq + res) / 7)
    sec = ((tec + ant + cnc + dmq + sac + ser + vis) / 7)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.imxap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // mediapunta - apoyo

    prc = ((ctr + pas + tec + tle + ant + dec + dmq + tal) / 8)
    sec = ((reg + ser + vis + agi) / 4)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.mptap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // mediapunta - ataque

    prc = ((ctr + pas + reg + tec + tle + ant + dec + dmq + tal) / 9)
    sec = ((rem + ser + vis + agi) / 4)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.mptat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.mptpromedio = (jug.mptap + jug.mptat) / 2

    // mediocierre - defensa

    prc = ((ent + mar + ant + col + cnc + dec + jeq + ser) / 8)
    sec = ((ctr + pas + agr + sac + val + sal + fue + res) / 8)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.mcidf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // mediocentro - defensa

    prc = ((ent + ant + col + cnc + jeq) / 5)
    sec = ((mar + pas + agr + dec + sac + ser + fue + res) / 8)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.mdcdf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // mediocentro - apoyo

    prc = ((ent + ant + col + cnc + jeq) / 5)
    sec = ((ctr + mar + pas + agr + dec + sac + ser + fue + res) / 9)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.mdcap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.mdcpromedio = (jug.mdcap + jug.mdcdf) / 2

    // mezzala - apoyo

    prc = ((pas + tec + dec + dmq + sac + ace) / 6)
    sec = ((ctr + ent + reg + tle + ant + ser + vis + equ + res) / 9)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.mzzap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // mezzala - ataque

    prc = ((pas + reg + tec + dec + dmq + sac + vis + ace) / 8)
    sec = ((ctr + rem + tle + ant + ser + tal + equ + res) / 8)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.mzzat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.mzzpromedio = (jug.mzzap + jug.mzzat) / 2

    // organizador adelantado - apoyo

    prc = ((ctr + pas + tec + dec + dmq + jeq + ser + vis) / 8)
    sec = ((reg + ant + tal + agi) / 4)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.oadap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // organizador adelantado - ataque

    prc = ((ctr + pas + tec + dec + dmq + jeq + ser + vis) / 8)
    sec = ((reg + ant + tal + ace + agi) / 5)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.oadat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.oadpromedio = (jug.oadap + jug.oadat) / 2

    // organizador de banda - apoyo

    prc = ((ctr + pas + tec + dec + jeq + ser + vis) / 7)
    sec = ((reg + dmq + agi) / 3)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.ogbap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // organizador de banda - ataque

    prc = ((ctr + pas + reg + tec + dec + dmq + jeq + ser + vis) / 9)
    sec = ((ant + tal + ace + agi) / 4)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.ogbat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.ogbpromedio = (jug.ogbap + jug.ogbat) / 2

    // organizador intinerante - apoyo

    prc = ((ctr + pas + tec + ant + dec + dmq + jeq + sac + ser + vis + ace + res) / 12)
    sec = ((reg + tle + col + cnc + agi + equ + vel) / 7)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.oitap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // pivote defensivo - defensa

    prc = ((ent + mar + ant + col + cnc + dec) / 6)
    sec = ((jeq + ser + fue) / 3)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.pvddf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // pivote organizador - defensa

    prc = ((ctr + pas + tec + dec + jeq + ser + vis) / 7)
    sec = ((ent + ant + col + equ) / 4)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.pvodf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // pivote organizador - apoyo

    prc = ((ctr + pas + tec + dec + jeq + ser + vis) / 7)
    sec = ((ant + col + dmq + equ) / 4)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.pvoap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.pvopromedio = (jug.pvodf + jug.pvoap) / 2

    // regista - apoyo

    prc = ((ctr + pas + tec + dec + dmq + jeq + ser + tal + vis) / 9)
    sec = ((reg + tle + ant + equ) / 4)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.regap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // segundo volante - apoyo

    prc = ((ent + mar + pas + col + dmq + sac + res + vel) / 8)
    sec = ((ctr + rem + tle + ant + cnc + dec + ser + ace + equ + fue) / 10)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.sgvap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // segundo volante - ataque

    prc = ((ent + pas + rem + tle + ant + col + dmq + sac + res + vel) / 10)
    sec = ((ctr + mar + cnc + dec + ser + ace + equ + fue) / 8)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.sgvat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.sgvpromedio = (jug.sgvap + jug.sgvat) / 2

    // ariete - ataque

    prc = ((rem + ant + dmq + ser) / 4)
    sec = ((cab + ctr + tec + dec + ace) / 5)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.ariat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // delantero avanzado - ataque

    prc = ((ctr + reg + rem + tec + dmq + ser + ace) / 7)
    sec = ((pas + ant + dec + sac + agi + equ + res + vel) / 8)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.dlaat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // delantero completo - apoyo

    prc = ((cab + ctr + pas + reg + tec + tle + ant + dec + dmq + ser + vis + ace + agi + fue) / 14)
    sec = ((rem + jeq + sac + sal + equ + res + vel) / 7)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.dlcap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // delantero completo - ataque

    prc = ((cab + ctr + reg + rem + tec + ant + dmq + ser + ace + agi + fue) / 11)
    sec = ((pas + tle + dec + jeq + sac + vis + sal + equ + res + vel) / 10)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.dlcat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.dlcpromedio = (jug.dlcap + jug.dlcat) / 2

    // delantero objetivo - apoyo

    prc = ((cab + jeq + val + sal + equ + fue) / 6)
    sec = ((ctr + rem + agr + ant + dec + dmq + ser) / 7)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.dloap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // delantero objetivo - ataque

    prc = ((cab + rem + dmq + ser + val + sal + equ + fue) / 8)
    sec = ((ctr + agr + ant + dec + jeq) / 5)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.dloat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.dlopromedio = (jug.dloap + jug.dloat) / 2

    // delantero presionante - defensa

    prc = ((agr + ant + dec + jeq + sac + val + ace + res + vel) / 9)
    sec = ((ctr + cnc + ser + agi + equ + fue) / 6)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.dprdf = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // delantero presionante - apoyo

    prc = ((agr + ant + dec + jeq + sac + val + ace + res + vel) / 9)
    sec = ((ctr + pas + cnc + dmq + ser + agi + equ + fue) / 8)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.dprap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // delantero presionante - ataque

    prc = ((agr + ant + dmq + jeq + sac + val + ace + res + vel) / 9)
    sec = ((ctr + rem + cnc + dec + ser + agi + equ + fue) / 8)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.dprat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.dprpromedio = (jug.dprdf + jug.dprap + jug.dprat) / 3

    // falso nueve - apoyo

    prc = ((ctr + pas + reg + tec + dec + dmq + ser + vis + ace + agi) / 10)
    sec = ((rem + ant + jeq + tal + equ) / 5)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.fnvap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // segundo delantero - apoyo

    prc = ((ctr + pas + tec + dec + dmq + jeq + ser) / 7)
    sec = ((rem + ant + tal + vis + equ + fue) / 6)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.sgdap = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    // segundo delantero - ataque

    prc = ((ctr + pas + tec + dec + dmq + jeq + ser) / 7)
    sec = ((reg + rem + ant + tal + vis + equ + fue) / 7)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.sgdat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5
    jug.sgdpromedio = (jug.sgdap + jug.sgdat) / 2

    //trequartista - ataque

    prc = ((ctr + pas + reg + tec + dec + dmq + ser + tal + vis + ace) / 10)
    sec = ((rem + ant + agi + equ) / 4)
    trc = ((atributosTotal / 47) - (prc - sec) / 2)

    jug.tqtat = (prc * porcentajePrimario + sec * porcentajeSecundario + trc * porcentajeTerciario) * 5

    return jug
}