import User from './User.js';
import Quizze from './Quizze.js';
import Question from './Question.js';
import QuestionContentText from './QuestionContentText.js';
import QuestionContentMulti from './QuestionContentMulti.js';
import QuestionContentBoolean from './QuestionContentBoolean.js';

// user has many quizzes
User.hasMany(Quizze, { 
  foreignKey: 'userId', 
  as: 'quizzes',
  onDelete: 'CASCADE',
  hooks: true
});
Quizze.belongsTo(User, { 
  foreignKey: 'userId', 
  as: 'owner'
});

// user has many questions
User.hasMany(Question, {
  foreignKey: 'userId',
  as: 'questions'
});
Question.belongsTo(User, {
  foreignKey: 'userId',
  as: 'author'
});

// quiz has many questions
Quizze.belongsToMany(Question, { 
  through: 'quiz_questions', 
  as: 'questions', 
  timestamps: false 
});
Question.belongsToMany(Quizze, { 
  through: 'quiz_questions', 
  as: 'quizzes',
  timestamps: false 
});


Question.hasOne(QuestionContentText, {
  foreignKey: 'questionId',
  as: 'textContent',
  onDelete: 'CASCADE',
  hooks: true
});
QuestionContentText.belongsTo(Question, { foreignKey: 'questionId' });


Question.hasOne(QuestionContentMulti, {
  foreignKey: 'questionId',
  as: 'multiContent',
  onDelete: 'CASCADE',
  hooks: true
});
QuestionContentMulti.belongsTo(Question, { foreignKey: 'questionId' });


Question.hasOne(QuestionContentBoolean, {
  foreignKey: 'questionId',
  as: 'booleanContent',
  onDelete: 'CASCADE',
  hooks: true
});
QuestionContentBoolean.belongsTo(Question, { foreignKey: 'questionId' });


export { 
  User, 
  Quizze, 
  Question,
  QuestionContentText,
  QuestionContentMulti,
  QuestionContentBoolean,
};
