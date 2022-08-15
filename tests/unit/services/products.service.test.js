const { expect } = require('chai');
const { describe } = require('mocha');
// const CustomError = require('../../../errors/CustomError');
const sinon = require('sinon');
const connection = require('../../../models/connection');

const productsService = require('../../../services/products.service');
const Products = require('../../../models/Products');

describe('Service - Busca apenas um produto no BD por seu ID', () => {
  before(async () => {
    const query = [[]];

    sinon.stub(connection, 'query').resolves(query);
  });
  after(async () => {
    connection.query.restore();
  });
  describe('quando não existe um produto com o ID informado', () => {
    it('retorna undefined', async () => {
      const response = await Products.getByPk();
      const response2 = await productsService.getProductById();
      const err = new TypeError('Product not found');


      expect(response).to.be.equal(undefined);
      expect(response2).to.throw(err);

      // expect(response).to.be.equal(false);
      // expect(response).to.throw(new CustomError('Product not found'));
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

describe('Service - Busca todas os produtos no BD', () => {
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
  
describe('Service - Cria um novo produto no BD', () => {
  const newProductName = 'ProdutoX';
  before(() => {
    sinon.stub(Products, 'create')
      .resolves(
        {
          "id": 4,
          "name": "ProdutoX"
        }
      );
  });
  after(() => {
    Products.create.restore();
  });
  it('retorna um objeto', async () => {
    const response = await  productsService.create(newProductName);

    expect(response).to.be.an('object');
  });
  it('o objeto não está vazio', async () => {
    const response = await  productsService.create(newProductName);
    expect(response).to.be.not.empty;
  });
  it('tal objeto possui as propriedades: "id", "name"', async () => {
    const item = await Products.create();
    expect(item).to.include.all.keys('id', 'name');
  });
});