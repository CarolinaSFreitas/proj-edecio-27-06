import jwt from "jsonwebtoken"

import * as dotenv from "dotenv"
dotenv.config()

export function verificaToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decode = jwt.verify(token, process.env.JWT_KEY)
    console.log(decode)
    req.admin_logado_id = decode.admin_logado_id
    req.admin_logado_nome = decode.admin_logado_nome
    next()
  } catch (error) {
    return res.status(401).json({erro: "Falha na autenticação"})
  }
}