const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const connection = require('../../../models/connection');

const productsService = require('../../../services/products.service');
const Products = require('../../../models/Products');

describe('Busca apenas um produto no BD por seu ID', () => {
  before(async () => {
    const query = [[]];

    sinon.stub(connection, 'query').resolves(query);
  });
  after(async () => {
    connection.query.restore();
  });
  describe('quando não existe um produto com o ID informado', () => {
    it('retorna undefined', async () => {
      const response = await productsService.getProductById();

      expect(response).to.be.equal(false);
    });
  });
  describe('quando existe um produto com o ID informado', () => {
    before(() => {
      sinon.stub(Products, 'getByPk')
        .resolves(
          {
            "id": 1,
            "name": "Martelo de Thor"
          }
        );
    });
    after(() => {
      Products.getByPk.restore();
    });
    it('retorna um objeto', async () => {
      const response = await  productsService.getProductById(1);

      expect(response).to.be.an('object');
    });
    it('o objeto não está vazio', async () => {
      const response = await  productsService.getProductById(1);

      expect(response).to.be.not.empty;
    });
    it('tal objeto possui as propriedades: "id", "name"', async () => {
      const item = await productsService.getProductById(1);

      expect(item).to.include.all.keys('id', 'name');
    });
  });
});

describe('Busca todas os produtos no BD', () => {
  describe('quando não existe nenhum produto criado', () => {
    before(function () {
      sinon.stub(Products, 'getAll').resolves([]);
    });
    after(function () {
      Products.getAll.restore();
    });
    it('retorna um array', async function () {
      const result = await productsService.getAll();
      expect(result).to.be.an('array');
    });

    it('o array vazio', async function () {
      const result = await productsService.getAll();
      expect(result).to.empty;
    });
  });
  describe('quando exitem pessoas criadas', () => {
    before(function () {
      sinon.stub(Products, 'getAll').resolves([{ id: 1, name: 'Martelo de Thor' }]);
    });
    after(function () {
      Products.getAll.restore();
    });
    it('retorne um array', async function () {
      const result = await productsService.getAll();
      expect(result).to.be.an('array');
    });
    it('o array não esteja vazio', async function () {
      const result = await productsService.getAll();
      expect(result).to.not.empty;
    });
    it('o array possua itens do tipo objeto', async function () {
      const result = await productsService.getAll();
      expect(result[0]).to.be.an('object');
    });
    it('objetos tenham as propriedades: "id", "name"', async function () {
      const result = await productsService.getAll();
      const item = result[0];
      expect(item).to.include.all.keys('id', 'name');
    });
  });
});

describe('Cria um produto no BD', () => {
  describe('quando não for passado um nome', () => {
    it('retorna um erro', async () => {
      const response = await productsService.create();

      expect(response).to.be.an('error');
    }).timeout(1000);
  }).timeout(1000);
  describe('quando for passado um nome', () => {
    before(function () {
      sinon.stub(Products, 'create').resolves({ id: 1, name: 'Martelo de Thor' });
    }).timeout(1000);
    after(function () {
      Products.create.restore();
    }).timeout(1000);
    it('retorna um objeto', async function () {
      const result = await productsService.create('Martelo de Thor');
      expect(result).to.be.an('object');
    }).timeout(1000);
    it('o objeto não está vazio', async function () {
      const result = await productsService.create('Martelo de Thor');
      expect(result).to.not.empty;
    }).timeout(1000);
    it('o objeto possua as propriedades: "id", "name"', async function () {
      const result = await productsService.create('Martelo de Thor');
      expect(result).to.include.all.keys('id', 'name');
    }).timeout(1000);
  }).timeout(1000);
});