const { expect } = require('chai');
const { describe } = require('mocha');
// const CustomError = require('../../../errors/CustomError');
const sinon = require('sinon');
const connection = require('../../../models/connection');

const salesService = require('../../../services/sales.service');
const Sales = require('../../../models/Sales');

describe('Service - Busca apenas uma venda no BD por seu ID', () => {
  beforeEach(() => { 
    sinon.restore();
  })
  describe('quando não existe uma venda com o ID informado', () => {
    it('retorna undefined', async () => {
      sinon.stub(Sales, 'getByPk').resolves([]);

      return expect(salesService.getSaleById()).to.eventually.be.rejectedWith(Error, 'Sale not found');
    });
  });
  describe('quando existe uma venda com o ID informado', () => {
    it('retorna um objeto', async () => {
      sinon.stub(Sales, 'getByPk')
        .resolves([
            {
              "date": "2021-09-09T04:54:29.000Z",
              "productId": 1,
              "quantity": 2
            },
            {
              "date": "2021-09-09T04:54:54.000Z",
              "productId": 2,
              "quantity": 2
            }
        ]);
      const response = await salesService.getSaleById(1);

      expect(response[0]).to.be.an('object');
    });
    it('o objeto não está vazio', async () => {
      sinon.stub(Sales, 'getByPk')
        .resolves([
            {
              "date": "2021-09-09T04:54:29.000Z",
              "productId": 1,
              "quantity": 2
            },
            {
              "date": "2021-09-09T04:54:54.000Z",
              "productId": 2,
              "quantity": 2
            }
        ]);
      const response = await  salesService.getSaleById(1);

      expect(response).to.be.not.empty;
    });
    it('tal objeto possui as propriedades: "date", "productId", "quantity"', async () => {
      sinon.stub(Sales, 'getByPk')
        .resolves([
            {
              "date": "2021-09-09T04:54:29.000Z",
              "productId": 1,
              "quantity": 2
            },
            {
              "date": "2021-09-09T04:54:54.000Z",
              "productId": 2,
              "quantity": 2
            }
        ]);
      const item = await salesService.getSaleById(1);

      expect(item[0]).to.include.all.keys('date', 'productId', 'quantity');
    });
  });
});

describe('Service - Busca todas as vendas no BD', () => {
  describe('quando não existe nenhuma venda criada', () => {
    before(function () {
      sinon.stub(Sales, 'getAll').resolves([]);
    });
    after(function () {
      Sales.getAll.restore();
    });
    it('retorna um array', async function () {
      const result = await salesService.getAll();
      expect(result).to.be.an('array');
    });

    it('o array vazio', async function () {
      const result = await salesService.getAll();
      expect(result).to.empty;
    });
  });
  describe('quando exitem vendas criadas', () => {
    beforeEach(() => { 
      sinon.restore();
    })
    it('retorne um array', async function () {
      const resultadoQuery = [[{ saleId: 1, date: '2022-08-15 12:50:00', productId: 1, quantity: 5}], []];
      sinon.stub(connection, 'query').resolves(resultadoQuery);
      const result = await salesService.getAll();
      expect(result).to.be.an('array');
    });
    it('o array não esteja vazio', async function () {
      const resultadoQuery = [[{ saleId: 1, date: '2022-08-15 12:50:00', productId: 1, quantity: 5}], []];
      sinon.stub(connection, 'query').resolves(resultadoQuery);
      const result = await salesService.getAll();
      expect(result).to.not.empty;
    });
    it('o array possua itens do tipo objeto', async function () {
      const resultadoQuery = [[{ saleId: 1, date: '2022-08-15 12:50:00', productId: 1, quantity: 5}], []];
      sinon.stub(connection, 'query').resolves(resultadoQuery);
      const result = await salesService.getAll();
      expect(result[0]).to.be.an('object');
    });
    it('objetos tenham as propriedades: "saleId", "date", "productId", "quantity"', async function () {
      const resultadoQuery = [[{ saleId: 1, date: '2022-08-15 12:50:00', productId: 1, quantity: 5}], []];
      sinon.stub(connection, 'query').resolves(resultadoQuery);
      const result = await salesService.getAll();
      const item = result[0];
      expect(item).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
});
  
// describe('Service - Cria um novo produto no BD', () => {
//   const newProductName = 'ProdutoX';
//   before(() => {
//     sinon.stub(Products, 'create')
//       .resolves(
//         {
//           "id": 4,
//           "name": "ProdutoX"
//         }
//       );
//   });
//   after(() => {
//     Products.create.restore();
//   });
//   it('retorna um objeto', async () => {
//     const response = await  productsService.create(newProductName);

//     expect(response).to.be.an('object');
//   });
//   it('o objeto não está vazio', async () => {
//     const response = await  productsService.create(newProductName);
//     expect(response).to.be.not.empty;
//   });
//   it('tal objeto possui as propriedades: "id", "name"', async () => {
//     const item = await Products.create();
//     expect(item).to.include.all.keys('id', 'name');
//   });
// });