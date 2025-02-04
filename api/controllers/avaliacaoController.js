import { Op } from "sequelize"
import { sequelize } from '../database/conecta.js'
import { Avaliacao } from '../models/Avaliacao.js';
import { Cliente } from '../models/Cliente.js';
import { Filme } from '../models/Filme.js';

export const avaliacaoIndex = async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.findAll({
      include: Cliente
    });
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const avaliacaoFilme = async (req, res) => {
  const { id } = req.params
  try {
    const avaliacoes = await Avaliacao.findAll({
      where: { filme_id: id },
      include: Cliente
    });
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const avaliacaoCreate = async (req, res) => {
  const { filme_id, cliente_id, comentario, estrelas } = req.body

  // se não informou estes atributos
  if (!filme_id || !cliente_id || !comentario || !estrelas) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  const t = await sequelize.transaction();

  try {

    const avaliacao = await Avaliacao.create({
      filme_id, cliente_id, comentario, estrelas, data: new Date()
    }, { transaction: t });

    await Filme.increment('total',
      { by: estrelas, where: { id: filme_id }, transaction: t }
    );

    await Filme.increment('num',
      { by: 1, where: { id: filme_id }, transaction: t }
    );

    await t.commit();
    res.status(201).json(avaliacao)

  } catch (error) {
    await t.rollback();
    res.status(400).json({ "id": 0, "Erro": error })
  }
}

export const avaliacaoDestroy = async (req, res) => {
  const { id } = req.params

  const t = await sequelize.transaction();

  try {

    const avaliacao = await Avaliacao.findByPk(id)

    await Filme.decrement('total',
      {
        by: avaliacao.estrelas,
        where: { id: avaliacao.filme_id },
        transaction: t
      }
    );

    await Filme.decrement('num',
      {
        by: 1,
        where: { id: avaliacao.filme_id },
        transaction: t
      }
    );

    await Avaliacao.destroy({
      where: { id }
    });

    await t.commit();
    res.status(200).json({ msg: "Ok! Avaliação Excluída com Sucesso" })

  } catch (error) {

    await t.rollback();
    res.status(400).json({ "id": 0, "Erro": error })

  }
}

export const avaliacaoGraphEstrelas = async (req, res) => {

  try {
    const avaliacoes = await Avaliacao.findAll({
      attributes: ['estrelas',
        [sequelize.fn('count', sequelize.col('id')), 'num']],
      group: 'estrelas'
    });
    res.status(200).json(avaliacoes)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const dadosGerais = async (req, res) => {

  // new Date().toISOString() retorna "2023-11-21T21:12:05"
  // com o split, separamos pelo "T" e pegamos só a 1ª parte
  const dataAtual = new Date().toISOString().split("T")[0]

  try {
    const clientes = await Cliente.count()
    const filmes = await Filme.count()
    const media = await Filme.findOne({
      attributes: [[sequelize.fn('avg', sequelize.col('preco')), 'preco']]
    })
    const avaliacoes = await Avaliacao.count()
    const avaliacoes_dia = await Avaliacao.count({
      where: { data: { [Op.gte]: dataAtual } }
    })
    res.status(200).json({ clientes, filmes, precoMedio: media ? Number(media.preco) : 0, avaliacoes, avaliacoes_dia })
  } catch (error) {
    res.status(400).send(error)
  }
}