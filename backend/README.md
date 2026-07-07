# ⚙️ Bitácora FM - Backend API (Node.js & Express)

Este módulo representa el motor lógico y la API local del sistema. Se encarga de procesar las peticiones del frontend, gestionar las reglas de negocio de las estadísticas futbolísticas y persistir la información.

## 🛠️ Tecnologías utilizadas
* **Node.js** (Entorno de ejecución, configurado como ES Modules)
* **Express.js** (Servidor HTTP y enrutamiento de la API)
* **File System (`fs`)** (Módulo nativo para la manipulación de archivos)

---

## 📐 Arquitectura de Datos y Funcionamiento
La API funciona de forma local respondiendo a las peticiones del cliente (Frontend). 

Al no requerir un motor de base de datos pesado (como MySQL o MongoDB), la persistencia se resuelve de manera ligera leyendo y escribiendo directamente sobre archivos planos en formato JSON. Cada consulta mapea los archivos, procesa la información en memoria y devuelve las respuestas estructuradas.

---

## 🗃️ Estructura del Backend

### 🔀 Rutas de la API (`/routes`)
* **`jugadores.js`**: Endpoints para manejar el CRUD completo de los futbolistas (altas, edición, bajas), además de la lógica de transferencias, ventas y salidas del club.
* **`partidos.js`**: Almacenamiento y gestión de partidos, cómputo de resultados, registro de goleadores, asistentes y eliminación de encuentros.
* **`planteles.js`**: Organización estructural de las plantillas del equipo divididas por temporadas específicas.
* **`estadisticas.js`**: Filtros avanzados y controladores de agregación para generar reportes dinámicos (tablas de goleadores, minutos de los goles, veteranía y récords).
* **`configuracion.js`**: Gestión de parámetros generales del sistema e intercambio dinámico de los escudos de los clubes según país y equipo.

### 💾 Base de Datos Local (`/baseDeDatos`)
* Carpeta destinada a almacenar los archivos **`.json`**. Estos archivos actúan como las tablas de nuestra base de datos relacional simplificada. 
* *Nota: Es fundamental que estos archivos mantengan su estructura de arrays (`[]`) al inicializar el sistema de cero.*

---

## 🛠️ Archivo de Entrada Principal

### 🌐 `server.js` (o archivo de arranque)
Configura el ciclo de vida del servidor local de Express:
1. Inyecta el middleware `express.json()` en el pipeline para procesar correctamente los cuerpos (`body`) de las peticiones HTTP que envía React.
2. Centraliza y monta todos los módulos de la carpeta `/routes` bajo el prefijo común `/api`.
3. Escucha en un puerto fijo (ej: `4000`) para quedar disponible ante las llamadas de la interfaz.

---

## 🚀 Comandos de Ejecución

```bash
# Instalar las dependencias de la API
npm install

# Levantar el servidor Express en modo desarrollo/producción
npm start