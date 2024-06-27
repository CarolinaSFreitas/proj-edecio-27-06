import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

import * as dotenv from 'dotenv'
dotenv.config()

import { Admin } from "../models/Admin.js"

export async function loginAdmin(req, res) {
  const { email, senha } = req.body

  const mensaErroPadrao = "Erro... Login ou Senha Inválidos"

  if (!email || !senha) {
    res.status(400).json({ erro: mensaErroPadrao })
    return
  }

  // verifica se o e-mail está cadastrado
  try {
    const admin = await Admin.findOne({ where: { email } })

    if (admin == null) {
      res.status(400).json({ erro: mensaErroPadrao })
      return
    } 

    if (bcrypt.compareSync(senha, admin.senha)) {
      const token = jwt.sign({
        admin_logado_id: admin.id,
        admin_logado_nome: admin.nome
      },
        process.env.JWT_KEY,
        { expiresIn: "1h" })

      res.status(200).json({token, id: admin.id, nome: admin.nome })
    }
    else {
      res.status(400).json({ erro: mensaErroPadrao })
      return
    }
  } catch (error) {
    res.status(400).json(error)
  }
}