import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conecta.js';
import { Cliente } from './Cliente.js';
import { Filme } from './Filme.js'

export const Avaliacao = sequelize.define('avaliacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  comentario: {
    type: DataTypes.STRING(255),
  },
  estrelas: {
    type: DataTypes.INTEGER(2),
    allowNull: false
  },
  data: {
    type: DataTypes.DATE(),
    allowNull: false
  }
}, {
  tableName: "avaliacoes"
});

Avaliacao.belongsTo(Filme, {
  foreignKey: {
    name: 'filme_id',
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Filme.hasMany(Avaliacao, {
  foreignKey: 'filme_id'
})

Avaliacao.belongsTo(Cliente, {
  foreignKey: {
    name: 'cliente_id',
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Cliente.hasMany(Avaliacao, {
  foreignKey: 'cliente_id'
})