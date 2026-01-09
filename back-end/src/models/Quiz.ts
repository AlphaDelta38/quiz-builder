import { 
  DataTypes, 
  Model, 
  InferAttributes, 
  InferCreationAttributes, 
  CreationOptional,  
  NonAttribute,
  ForeignKey,
  HasManyAddAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import db from '../db.js'; 
import Question from './Question.js';
import User from './User.js';

export class Quiz extends Model<InferAttributes<Quiz>, InferCreationAttributes<Quiz>> {
  declare id: CreationOptional<number>;
  
  declare title: string;
  declare questions?: NonAttribute<Question[]>;
  declare isPrivate: CreationOptional<boolean>;

  declare addQuestions: HasManyAddAssociationsMixin<Question, number>;
  declare getQuestions: HasManyGetAssociationsMixin<Question>;
  declare addQuestion: HasManyAddAssociationMixin<Question, number>;
  
  declare owner?: NonAttribute<User>;
  declare userId: ForeignKey<User['id']>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Quiz.init(
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

    createdAt: {
      type: DataTypes.DATE,
      field: 'createdAt'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updatedAt'
    }
  },
  {
    sequelize: db,
    tableName: 'quizzes',
  }
);

export default Quiz;
