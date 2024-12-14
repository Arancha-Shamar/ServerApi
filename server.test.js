import request from 'supertest';
import mongoose from 'mongoose';
import app from './server';

beforeAll(async () => {
  const url = 'mongodb://localhost:27017/productsdb';
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});


afterAll(async () => {
  await mongoose.disconnect();
});

describe('Express App', () => {
  it('should return HTML for GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toContain('text/html');
  });

  it('should return JSON for GET /api/products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toContain('application/json');
    expect(res.body).toEqual([]);
  });

  it('should return  /400api for GET/products/search without query', async () => {
    const res = await request(app).get('/api/products/search');
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe('Please put in paragraph or word to search for it.');
  });

  it('should create a new product with POST /api/products', async () => {
    const newProduct = {
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
      quantity: 100,
      category: 'Test Category'
    };
    const res = await request(app).post('/api/products').send(newProduct);
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe(newProduct.name);
  });

  it('should update a product with PUT /api/products/:id', async () => {
    const newProduct = {
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
      quantity: 100,
      category: 'Test Category'
    };
    const postRes = await request(app).post('/api/products').send(newProduct);
    const updatedProduct = { ...newProduct, price: 20 };
    const putRes = await request(app).put(`/api/products/${postRes.body._id}`).send(updatedProduct);
    expect(putRes.statusCode).toEqual(200);
    expect(putRes.body.price).toBe(updatedProduct.price);
  });

  it('should partially update a product with PATCH /api/products/:id', async () => {
    const newProduct = {
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
      quantity: 100,
      category: 'Test Category'
    };
    const postRes = await request(app).post('/api/products').send(newProduct);
    const patchRes = await request(app).patch(`/api/products/${postRes.body._id}`).send({ price: 30 });
    expect(patchRes.statusCode).toEqual(200);
    expect(patchRes.body.price).toBe(30);
  });

  it('should delete a product with/products DELETE/: /apiid', async () => {
    const newProduct = {
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
      quantity: 100,
      category: 'Test Category'
    };
    const postRes = await request(app).post('/api/products').send(newProduct);
    const deleteRes = await request(app).delete(`/api/products/${postRes.body._id}`);
    expect(deleteRes.statusCode).toEqual(200);
    expect(deleteRes.body.message).toBe('Product deleted successfully');
  });

  it('should delete all products with DELETE /api/products', async () => {
    const newProduct = {
      name: 'Test Product',
      description: 'Test Description',
      price: 10,
      quantity: 100,
      category: 'Test Category'
    };
    await request(app).post('/api/products').send(newProduct);
    const deleteRes = await request(app).delete('/api/products');
    expect(deleteRes.statusCode).toEqual(200);
    expect(deleteRes.body.message).toBe('All products have been deleted');
  });
});
