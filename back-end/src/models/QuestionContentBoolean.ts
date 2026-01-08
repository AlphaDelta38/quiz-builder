import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import db from '../db.js'; 
import Question from './Question.js';

export class QuestionContentBoolean extends Model<InferAttributes<QuestionContentBoolean>, InferCreationAttributes<QuestionContentBoolean>> {
  declare id: CreationOptional<number>;
  
  declare content: string;
  declare isCorrect: boolean;

  declare questionId: ForeignKey<Question['id']>;
}

QuestionContentBoolean.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Question,
        key: 'id',
      },
    },

  },
  {
    sequelize: db,
    tableName: 'question_content_booleans',
  }
);

export default QuestionContentBoolean;
