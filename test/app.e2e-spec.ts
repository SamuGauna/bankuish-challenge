import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Cursos - Endpoints E2E', () => {
  let app: any;
  let token = '';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/login', () => {
    it('should authenticate a user and return a token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'titovila@gmail.com',
          password: 'lala1025.',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      token = response.body.token;
      expect(token).toBeTruthy();
    });
  });

  describe('POST /courses', () => {
    it('should create a new course successfully', async () => {
      const uniqueCourseName = `Curso de pruebas ${Date.now()}`;

      const response = await request(app.getHttpServer())
        .post('/courses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: uniqueCourseName,
          prerequisites: [],
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });
  });
});
