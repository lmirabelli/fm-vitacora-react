export const linkearJugadores = (jugadorID) => {
    if (jugadorID) {
        return `/jugadores/${jugadorID}`;
    } else {
        return `/jugadores`;
    }
};
