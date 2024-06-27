import express from 'express'
import cors from "cors"
import { sequelize } from './database/conecta.js'
import { Filme } from './models/Filme.js'
import { Cliente } from './models/Cliente.js'
import { Avaliacao } from './models/Avaliacao.js'
import { Admin } from './models/Admin.js'
import routes from './routes.js'

const app = express()
const port = 3004

app.use(express.json())
app.use(cors())
app.use(routes)

app.get('/', (req, res) => {
  res.send('Sistema de Controle de Filmes')
})

async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com Banco de Dados realizada com Sucesso');
    // await Filme.sync({alter: true})      // indica uma alteração (sem remover os registros)
    // await Filme.sync({force: true})      // recria a tabela (limpa, remove todos os registros)
    await Filme.sync()      // cria a tabela no banco (se não existir)
    console.log("Tabela de Filmes: Ok")
    await Cliente.sync()      // cria a tabela no banco (se não existir)
    console.log("Tabela de Clientes: Ok")
    await Avaliacao.sync()      // cria a tabela no banco (se não existir)
    console.log("Tabela de Avaliações: Ok")
    await Admin.sync()      // cria a tabela no banco (se não existir)
    console.log("Tabela de Admins: Ok")
  } catch (error) {
    console.error('Erro ao conectar o banco de dados:', error);
  }  
}
conecta_db()

app.listen(port, () => {
  console.log(`API de Filmes Rodando na Porta: ${port}`)
})