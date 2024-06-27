import { Router } from "express"
import { filmeCreate, filmeDelete, filmeDestaqueUpdate, filmeIndex, filmePesquisa, filmeShow, filmeUpdate } from "./controllers/filmeController.js"
import { clienteCreate, clienteIndex } from "./controllers/clienteController.js"
import { loginCliente } from "./controllers/loginController.js"
import { avaliacaoCreate, avaliacaoDestroy, avaliacaoFilme, avaliacaoGraphEstrelas, avaliacaoIndex, dadosGerais } from "./controllers/avaliacaoController.js"
import { loginAdmin } from "./controllers/adminLoginController.js"
import { adminCreate, adminIndex } from "./controllers/adminController.js"
import { verificaToken } from "./middlewares/verificaToken.js"

const router = Router()

router.get("/filmes", filmeIndex)
      .post("/filmes", verificaToken, filmeCreate)
      .put("/filmes/:id", verificaToken, filmeUpdate)
      .delete("/filmes/:id", verificaToken, filmeDelete)
      .get("/filmes/:id", filmeShow)
      .get("/filmes/pesquisa/:palavra", filmePesquisa)
      .put("/filmes/destacar/:id", verificaToken, filmeDestaqueUpdate)

router.get("/clientes", clienteIndex)
      .post("/clientes", clienteCreate)
      
router.post("/login", loginCliente)

router.get('/avaliacoes', avaliacaoIndex)
      .post('/avaliacoes', avaliacaoCreate)
      .delete('/avaliacoes/:id', avaliacaoDestroy)
      .get('/avaliacoes/filme/:id', avaliacaoFilme)
      .get('/avaliacoes/dados/estrelas', avaliacaoGraphEstrelas)

router.get('/dadosGerais', dadosGerais)

router.get('/admin', adminIndex)
      .post('/admin', adminCreate)

router.post("/loginAdmin", loginAdmin)      

export default router