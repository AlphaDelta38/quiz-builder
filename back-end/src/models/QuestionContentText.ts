import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import db from '../db.js'; 
import Question from './Question.js';

export class QuestionContentText extends Model<InferAttributes<QuestionContentText>, InferCreationAttributes<QuestionContentText>> {
  declare id: CreationOptional<number>;
  
  declare content: string;
  declare questionId: ForeignKey<Question['id']>;
}

QuestionContentText.init(
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
    tableName: 'question_content_texts',
  }
);

export default QuestionContentText;
