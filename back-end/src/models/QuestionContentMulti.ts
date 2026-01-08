import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import db from '../db.js'; 
import Question from './Question.js';

type Answer = {
  content: string;
  isCorrect: boolean;
}

export class QuestionContentMulti extends Model<InferAttributes<QuestionContentMulti>, InferCreationAttributes<QuestionContentMulti>> {
  declare id: CreationOptional<number>;
  
  declare content: string;
  declare answers: Answer[];

  declare questionId: ForeignKey<Question['id']>;
}

QuestionContentMulti.init(
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

    answers: {
      type: DataTypes.JSONB,
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
    tableName: 'question_content_multi',
  }
);

export default QuestionContentMulti;
