const { expect, use } = require('chai');
const { describe, beforeEach } = require('mocha');
const chai = require('chai-as-promised');
const sinon = require('sinon');
// const connection = require('../../../models/connection');

const productsService = require('../../../services/products.service');
const Products = require('../../../models/Products');
use(chai);

describe('Service - Busca apenas um produto no BD por seu ID', () => {
  beforeEach(() => { 
    sinon.restore();
  })
  describe('quando não existe um produto com o ID informado', () => {
    it('retorna undefined', async () => {
      sinon.stub(Products, 'getByPk').resolves(undefined);

      return expect(productsService.getProductById()).to.eventually.be.rejectedWith(Error, 'Product not found');
    });
  });
  describe('quando existe um produto com o ID informado', () => {
    it('retorna um objeto', async () => {
      sinon.stub(Products, 'getByPk')
        .resolves(
          {
            "id": 1,
            "name": "Martelo de Thor"
          }
        );
      const response = await  productsService.getProductById(99);

      expect(response).to.be.an('object');
    });
    it('o objeto não está vazio', async () => {
      sinon.stub(Products, 'getByPk')
        .resolves(
          {
            "id": 1,
            "name": "Martelo de Thor"
          }
        );
      const response = await  productsService.getProductById(1);

      expect(response).to.be.not.empty;
    });
    it('tal objeto possui as propriedades: "id", "name"', async () => {
      sinon.stub(Products, 'getByPk')
        .resolves(
          {
            "id": 1,
            "name": "Martelo de Thor"
          }
        );
      const item = await productsService.getProductById(1);

      expect(item).to.include.all.keys('id', 'name');
    });
  });
});

describe('Service - Busca todos os produtos no BD', () => {
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
  describe('quando exitem produtos criadas', () => {
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

describe('Service - Atualiza um produto no BD', () => {
  beforeEach(() => {
    sinon.restore();
  })
  const productToUpdate = { id:4, name:'Produto 2' };
  describe('quando não existe um produto com o ID informado', () => {
    it('retorna undefined', async () => {
      sinon.stub(Products, 'getByPk').resolves(undefined);

      return expect(productsService.update()).to.eventually.be.rejectedWith(Error, 'Product not found');
    });
  });
  describe('quando existe um produto com o ID informado', () => {
    it('retorna um objeto', async () => {
      // sinon.stub(Products, 'update')
      //   .resolves(
      //     {"id": 4,"name": "Martelo de Thor"}
      //   );
      sinon.stub(Products, 'update').resolves({ "id": 4, "name": "Produto 2" });
      sinon.stub(Products, 'getByPk').resolves(productToUpdate);
      const response = await productsService.update(productToUpdate.id, productToUpdate.name);
      expect(response).to.be.an('object');
    });
    it('o objeto não está vazio', async () => {
      sinon.stub(Products, 'update').resolves({ "id": 4, "name": "Produto 2" });
      sinon.stub(Products, 'getByPk').resolves(productToUpdate);
      const response = await  productsService.update(productToUpdate.id, productToUpdate.name);
      expect(response).to.be.not.empty;
    });
    it('tal objeto possui as propriedades: "id", "name"', async () => {
      sinon.stub(Products, 'update').resolves({ "id": 4, "name": "Produto 2" });
      sinon.stub(Products, 'getByPk').resolves(productToUpdate);
      const response = await productsService.update(productToUpdate.id, productToUpdate.name);
      expect(response).to.include.all.keys('id', 'name');
    });
  });
});

describe('Service - Deleta um produto no BD', () => {
  beforeEach(() => { 
    sinon.restore();
  })
  const productToDelete = {
    "id": 4,
  }
  describe('quando não existe um produto com o ID informado', () => {
    it('retorna undefined', async () => {
      sinon.stub(Products, 'getByPk').resolves(undefined);

      return expect(productsService.delete()).to.eventually.be.rejectedWith(Error, 'Product not found');
    });
  });
  it('retorna true da requisição', async () => {
    sinon.stub(Products, 'getByPk').resolves(productToDelete);
    sinon.stub(Products, 'delete').resolves(true);
    const response = await productsService.delete(productToDelete.id);
    expect(response).to.be.equal(true);
  });
});