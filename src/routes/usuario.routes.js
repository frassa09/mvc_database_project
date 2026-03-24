import { Router } from "express";
import { controllerUsuario } from "../controller/usuario.controller.js";


const usuarioRouter = Router()


usuarioRouter.post('/cadastrar', controllerUsuario.cadastrar)
usuarioRouter.post('/login', controllerUsuario.login)

usuarioRouter.put('/atualizar/:id', controllerUsuario.atualizar)

usuarioRouter.get('/busca/email/:email', controllerUsuario.buscaPorEmail)
usuarioRouter.get('/busca/id/:id', controllerUsuario.buscaPorId)

export default usuarioRouter