/* eslint-disable @typescript-eslint/no-var-requires */
const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');

const { app } = require('../src');

test('should create a new producer', async () => {
  const newProducer = {
    document: "06478445000168",
    producerName: "John Doe",
    farmName: "Farm A",
    city: "City X",
    state: "State Y",
    acres: 100,
    freeArea: 60,
    plantedArea: 40,
    crops: ["Soja", "Milho"]
  };

  const response = await request(app)
    .post('/producers')
    .send(newProducer)
    .expect(201);

  assert.ok(response.body.producerId);
});

test('should not create producer with invalid CPF/CNPJ', async () => {
  const newProducer = {
    document: "invalid",
    producerName: "John Doe",
    farmName: "Farm A",
    city: "City X",
    state: "State Y",
    acres: 100,
    freeArea: 60,
    plantedArea: 40,
    crops: ['Soja', 'Milho'],
  };

  const response = await request(app)
    .post('/producers')
    .send(newProducer)
    .expect(400);

  assert.strictEqual(response.body.message, 'Document given is invalid.');
});

test('should not create producer with area mismatch', async () => {
  const newProducer = {
    document: "06478445000168",
    producerName: "John Doe",
    farmName: "Farm A",
    city: "City X",
    state: "State Y",
    acres: 100,
    freeArea: 80,
    plantedArea: 30,
    crops: ["Soja", "Milho"]
  };

  const response = await request(app)
    .post('/producers')
    .send(newProducer)
    .expect(400);

  assert.strictEqual(response.body.message, 'The sum of free and planted area must not be greater than the acres of ​​the farm');
});

test('should update a producer', async () => {
  const newProducer = {
    document: "66.387.660/0001-85",
    producerName: "John Doe",
    farmName: "Farm A",
    city: "City X",
    state: "State Y",
    acres: 100,
    freeArea: 60,
    plantedArea: 40,
    crops: ["Soja", "Milho"]
  };

  const res = await request(app)
    .post('/producers')
    .send(newProducer)

  const updateProducer = {
    document: "66.387.660/0001-85",
    producerName: 'John Doe Updated',
    farmName: 'Farm B',
    city: 'City Y',
    state: 'State Z',
    acres: 200,
    freeArea: 120,
    plantedArea: 80,
    crops: ['Café', 'Cana de Açucar'],
  };

  const response = await request(app)
    .put(`/producers/${res.body.producerId}`)
    .send(updateProducer)
    .expect(200);

  assert.strictEqual(response.body.name, updateProducer.name);
});

test('should delete a producer', async () => {
  const newProducer = {
    document: "71.010.074/0001-57",
    producerName: "John Doe",
    farmName: "Farm A",
    city: "City X",
    state: "State Y",
    acres: 100,
    freeArea: 60,
    plantedArea: 40,
    crops: ["Soja", "Milho"]
  };

  const res = await request(app)
    .post('/producers')
    .send(newProducer)

  const response = await request(app)
    .delete(`/producers/${res.body.producerId}`)
    .expect(200);

  assert.strictEqual(response.body.id, res.body.producerId);
});

test('should return dashboard data', async () => {
  const response = await request(app)
    .get('/dashboard')
    .expect(200);

  assert.ok(response.body.totalFarms);
  assert.ok(response.body.totalAcres);
  assert.ok(response.body.totalByStates);
  assert.ok(response.body.totalByCrops);
  assert.ok(response.body.totalFreeArea);
  assert.ok(response.body.totalPlantedArea);
});
