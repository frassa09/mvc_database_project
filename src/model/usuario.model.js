import { pool } from "../database/db.js"


export class Usuario {

    #senha

    constructor(nome, email, senha) {
        this.nome = nome
        this.email = email
        this.#senha = senha
    }

    static async criarUsuario(usuario) {

        const { nome, email, senha } = usuario

        try {
            const usuarioCadastrado = await pool.query(`INSERT INTO usuarios(nome, email, senha) VALUES($1, $2, $3) RETURNING *`, [nome, email, senha])

            console.log(`Usuário cadastrado com sucesso. ${usuarioCadastrado.rows[0]}`)
            return usuarioCadastrado.rows[0]
        }
        catch (e) {
            console.error('Erro em: ', { e })
            return e
        }
    }

    salvarUsuario() {

        const usuario = {
            nome: this.nome,
            email: this.email,
            senha: this.#senha
        }

        return Usuario.criarUsuario(usuario)
    }


    static async buscarPorEmail(email) {

        try {
            const usuarioBuscado = await pool.query(`SELECT * FROM usuarios WHERE usuarios.email LIKE $1`, [email])

            if (usuarioBuscado.rows[0] == undefined) {
                return {
                    message: 'Usuário não encontrado',
                    status: 404
                }
            }

            console.log(`Usuário encontrado: ${usuarioBuscado.rows[0]}`)

            return (usuarioBuscado.rows[0])
        }
        catch (e) {
            console.error(`Erro em: ${e}`)
            return {
                message: 'Usuário não encontrado',
                status: 500
            }
        }
    }

    static async buscarPorId(id) {

        try {
            const usuarioBuscado = await pool.query(`SELECT * FROM usuarios WHERE usuarios.id = $1`, [id])

            if(usuarioBuscado.rows[0] == undefined){
                return {
                    message: 'Usuário não encontrado',
                    status: 404
                }
            }

            console.log(`Usuário encontrado: ${usuarioBuscado.rows[0]}`)

            return (usuarioBuscado.rows[0])
        }
        catch (e) {
            console.error(`Erro em: ${e}`)
            return {
                message: 'Usuário não encontrado',
                status: 500
            }
        }
    }

    static async atualizarUsuario(usuario) {

        const { id, nome, email, senha } = usuario

        try {
            const usuarioAtualizado = await pool.query(`UPDATE usuarios SET nome = COALESCE($1, nome), email = COALESCE($2, email), senha = COALESCE($3, senha) WHERE id = $4 RETURNING *`,
                [nome, email, senha, id]
            )

            console.log(`Usuario atualizado com sucesso: ${usuarioAtualizado.rows[0]}`)
            return usuarioAtualizado.rows[0]
        }
        catch(e){
            console.error(`Erro em: ${e}`)
            return e
        }
    }

    static async login(body){

        const { email, senha } = body

        const usuarioInfo = await pool.query(`SELECT email, senha FROM usuarios WHERE email LIKE $1`, [email])

        if(email == usuarioInfo.rows[0].email && senha == usuarioInfo.rows[0].senha){
            return {
                login: true
            }
        }
        else return {login: false}

    }



}