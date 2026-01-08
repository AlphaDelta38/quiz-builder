import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute } from 'sequelize';
import db from '../db.js'; 
import QuestionContentText from './QuestionContentText.js';
import QuestionContentMulti from './QuestionContentMulti.js';
import QuestionContentBoolean from './QuestionContentBoolean.js';
import Quizze from './Quiz.js';
import User from './User.js';

export enum QuestionType {
  TEXT = 'text',
  BOOLEAN = 'boolean',
  MULTI = 'multi'
}

export class Question extends Model<InferAttributes<Question>, InferCreationAttributes<Question>> {
  declare id: CreationOptional<number>;
  
  declare textContent?: NonAttribute<QuestionContentText>;
  declare booleanContent?: NonAttribute<QuestionContentBoolean>;
  declare multiContent?: NonAttribute<QuestionContentMulti>;
  declare quizzes?: NonAttribute<Quizze[]>;
  declare author?: NonAttribute<User>;

  declare userId: ForeignKey<User['id']>;

  declare type: QuestionType;
  
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    type: {
      type: DataTypes.ENUM(...Object.values(QuestionType)),
      allowNull: false,
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
    tableName: 'questions',
  }
);

export default Question;
