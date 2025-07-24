const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/User');
const Book = require('../src/models/Book');
require('dotenv').config();

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany({});
  await Book.deleteMany({});

  // Signup & login
  await request(app).post('/api/auth/signup').send({
    username: 'testuser',
    password: 'password123',
  });

  const res = await request(app).post('/api/auth/login').send({
    username: 'testuser',
    password: 'password123',
  });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Book API', () => {
  let bookId;

  test('POST /api/books should create a book', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'The Secret',
        author: 'Ajay',
        publishedYear: 1999,
        genre: 'Crime',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('The Secret');
    bookId = res.body._id;
  });

  test('GET /api/books should return books', async () => {
    const res = await request(app)
      .get('/api/books')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('PUT /api/books/:id should update a book', async () => {
    const res = await request(app)
      .put(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Secret History' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Secret History');
  });

  test('DELETE /api/books/:id should fail if not admin', async () => {
    const res = await request(app)
      .delete(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(403); // only admin can delete
  });
});
