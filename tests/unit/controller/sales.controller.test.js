const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const salesService = require('../../../services/sales.service');
const salesController = require('../../../controllers/sales.controller');

describe('Controller - Ao chamar o controller de getSalesById', () => {
  describe('quando existe a venda no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(salesService, 'getSaleById')
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
    });

    after(() => {
      salesService.getSaleById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await salesController.getSaleById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando uma array', async () => {
      await salesController.getSaleById(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});

describe('Controller - Busca todas as vendas no BD', () => {
  describe('quando não existe nenhuma venda criada', function () {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves([]);
    });
    after(function () {
      salesService.getAll.restore();
    });
    
    it('o status seja 200', async function () {
      await salesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('o array vazio', async function () {
      await salesController.getAll(request, response);
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });
  describe('quando exitem vendas criadas', function () {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves([[{ saleId: 1, date: '2022-08-15 12:50:00', productId: 1, quantity: 5}], []]);
    });
    after(function () {
      salesService.getAll.restore();
    });
    it('o status seja 200', async function () {
      await salesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('o array com os dados', async function () {
      await salesController.getAll(request, response);
      expect(response.json.calledWith([[{ saleId: 1, date: '2022-08-15 12:50:00', productId: 1, quantity: 5}], []])).to.be.equal(true);
    });
  });
});

describe('quando é criada uma nova venda no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = [
        {
          "productId": 1,
          "quantity":1
        },
        {
          "productId": 2,
          "quantity":5
        }
      ];

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(salesService, 'create')
        .resolves({
          "id": 3,
          "itemsSold": [
            {
              "productId": 1,
              "quantity":1
            },
            {
              "productId": 2,
              "quantity":5
            }
          ]
        });
    });

    after(() => {
      salesService.create.restore();
    });

    it('é chamado o método "status" passando o código 201', async () => {
      await salesController.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await salesController.create(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.deep.equal(true);
    });
    it('o objeto com os dados', async function () {
      await salesController.create(request, response);
      expect(response.json.calledWith({
          "id": 3,
          "itemsSold": [
            {
              "productId": 1,
              "quantity":1
            },
            {
              "productId": 2,
              "quantity":5
            }
          ]
        })).to.be.equal(true);
    });
});