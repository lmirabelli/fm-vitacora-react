import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import services from '../services.js'

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonLigas = path.join(__dirname, "../../basededatos/ligas.json");
const jsonPaises = path.join(__dirname, "../../basededatos/banderas.json");
const jsonEscudos = path.join(__dirname, "../../basededatos/escudos.json");



export default router

