import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import db from './db.js';
import { 
  User, 
  Quizze, 
  Question, 
  QuestionContentText, 
  QuestionContentMulti,
  QuestionContentBoolean,
} from './models/index.js';
import { QuestionType } from './models/Question.js';
import 'dotenv/config';

const seed = async () => {
  try {
    await db.authenticate();
    console.log('Database connected');

    await db.sync({ force: true });
    console.log('Database cleared and synced');

    console.log('Seeding Users...');
    
    const usersData = Array.from({ length: 5 }, () => ({
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('12345678', process.env.BCRYPT_SALT_ROUNDS || 5),
    }));

    const users = await User.bulkCreate(usersData);
    console.log(`Created ${users.length} users`);

    console.log('Seeding Quizzes & Questions...');

    for (const user of users) {
      const quiz = await Quizze.create({
        title: faker.lorem.words(3),
        userId: user.id,
        isPrivate: faker.datatype.boolean(),
      });

      const qText = await Question.create({
        type: QuestionType.TEXT,
        userId: user.id,
      });

      await QuestionContentText.create({
        questionId: qText.id,
        content: faker.lorem.sentence() + '?',
      });

      const qMulti = await Question.create({
        type: QuestionType.MULTI,
        userId: user.id,
      });

      await QuestionContentMulti.create({
        questionId: qMulti.id,
        content: 'Which of these animals is a mammal?',
        answers: [
          { content: faker.animal.cat(), isCorrect: true },
          { content: faker.animal.fish(), isCorrect: false },
          { content: faker.animal.snake(), isCorrect: false },
          { content: faker.animal.bird(), isCorrect: false },
        ],
      });

      const qBoolean = await Question.create({
        type: QuestionType.BOOLEAN,
        userId: user.id,
      });

      await QuestionContentBoolean.create({
        questionId: qBoolean.id,
        content: faker.lorem.sentence() + ' True or False?',
        isCorrect: faker.datatype.boolean(),
      });

      await (quiz as any).addQuestions([qText, qMulti, qBoolean]);

      console.log(`Quiz "${quiz.title}" created with 3 questions for user ${user.username}`);
    }

    console.log('\n Seeding completed successfully!');
    process.exit(0);

  } catch (e) {
    console.error('Seeding failed:', e);
    process.exit(1);
  }
};

seed();
