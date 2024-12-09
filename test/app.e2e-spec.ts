import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Cursos - Endpoints E2E', () => {
  let app: any;
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
      console.log('Token received:', response.text);
      expect(response.status).toBe(201);
      expect(response.text).toBeTruthy();
    });
  });

  describe('POST /courses', () => {
    let token = '';

    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'titovila@gmail.com',
          password: 'lala1025.',
        });
      token = response.text;
    });

    it('should create a new course successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/courses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Curso de pruebas',
          prerequisites: [],
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });

    it('should block duplicate course creation', async () => {
      const response = await request(app.getHttpServer())
        .post('/courses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Curso de pruebas',
          prerequisites: [],
        });

      expect(response.status).toBe(400);
    });
  });
});
