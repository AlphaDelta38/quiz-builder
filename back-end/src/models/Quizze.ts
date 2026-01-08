import { 
  DataTypes, 
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional,  
  NonAttribute,
  ForeignKey,
} from 'sequelize';
import db from '../db.js'; 
import Question from './Question.js';
import User from './User.js';

export class Quizze extends Model<InferAttributes<Quizze>, InferCreationAttributes<Quizze>> {
  declare id: CreationOptional<number>;
  
  declare title: string;
  declare questions?: NonAttribute<Question[]>;
  declare isPrivate: CreationOptional<boolean>;

  declare userId: ForeignKey<User['id']>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Quizze.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: db,
    tableName: 'quizzes',
  }
);

export default Quizze;
