import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 4001;

app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import partidosRoutes from './routes/partidos.js'
import jugadoresRoutes from './routes/jugadores.js'
import plantelesRoutes from './routes/planteles.js'
import estadisticasRoutes from './routes/estadisticas.js'
import campeonesRoutes from './routes/campeones.js'
import imagenesRoutes from './routes/imagenes.js'
import configuracionRoutes from './routes/configuracion.js'


app.use('/partidos', partidosRoutes)
app.use('/jugadores', jugadoresRoutes)
app.use('/planteles', plantelesRoutes)
app.use('/estadisticas', estadisticasRoutes)
app.use('/campeones', campeonesRoutes)
app.use('/imagenes', imagenesRoutes)
app.use('/configuracion', configuracionRoutes)


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

