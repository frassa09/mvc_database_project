import { Usuario } from "../model/usuario.model.js"

export const controllerUsuario = {

    cadastrar: async (req, res) => {

        const { nome, email, senha } = req.body

        const usuario = {
            nome,
            email,
            senha
        }

        const response = await Usuario.criarUsuario(usuario)

        res.json({ resposta: response })

    },
    atualizar: async (req, res) => {

        const { nome, email, senha } = req.body
        const { id } = req.params

        const usuario = {
            id,
            nome,
            email,
            senha
        }

        const response = await Usuario.atualizarUsuario(usuario)

        res.json({ resposta: response })
    },
    buscaPorEmail: async (req, res) => {

        const { email } = req.params

        const response = await Usuario.buscarPorEmail(email)

        res.json({ resposta: response })
    },
    buscaPorId: async (req, res) => {

        const { id } = req.params

        const response = await Usuario.buscarPorId(id)

        res.json({ resposta: response })
    },
    login: async (req, res) => {

        const {email, senha} = req.body

        const body = {
            email, senha
        }

        const response = await Usuario.login(body)

        res.json({resposta: response})
    }
}