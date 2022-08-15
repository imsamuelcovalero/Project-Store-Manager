const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const connection = require('../../../models/connection');

const Sales = require('../../../models/Sales');

describe('Model -  Busca apenas uma venda no BD por seu ID', () => {
  beforeEach(() => { 
    sinon.restore();
  })
  describe('quando não existe uma venda com o ID informado', () => {
    it('retorna undefined', async () => {
      // sinon.stub(Sales, 'getByPk').resolves(undefined);
      const query = [[]];
      sinon.stub(connection, 'query').resolves(query);
      const response = await Sales.getByPk();
      expect(response.length).to.be.equal(0);
    });
  });
  describe('quando existe uma venda com o ID informado', () => {
    it('retorna uma array', async () => {
      sinon.stub(Sales, 'getByPk')
        .resolves(
          [
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
          ]
        );
      const response = await  Sales.getByPk(1);

      expect(response).to.be.an('array');
    });
    it('a array não está vazia', async () => {
      sinon.stub(Sales, 'getByPk')
        .resolves(
          [
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
          ]
        );
      const response = await  Sales.getByPk(1);
      expect(response).to.be.not.empty;
    });
    it('tal array possui as propriedades: "date", "productId", "quantity"', async () => {
      sinon.stub(Sales, 'getByPk')
        .resolves(
          [
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
          ]
        );
      const item = await Sales.getByPk(1);
      expect(item[0]).to.include.all.keys('date', 'productId', 'quantity');
    });
  });
});

describe('Model - Busca todas as vendas no BD', () => {
  describe('quando não existe nenhuma venda criada', () => {
    before(function () {
      const resultadoQuery = [[], []];
      sinon.stub(connection, 'query').resolves(resultadoQuery);
    });
    after(function () {
      connection.query.restore();
    });
    it('retorna um array', async function () {
      const result = await Sales.getAll();
      expect(result).to.be.an('array');
    });
    it('o array vazio', async function () {
      const result = await Sales.getAll();
      expect(result).to.be.empty;
    });
  });
  describe('quando exitem vendas criados', () => {
    before(function () {
      const resultadoQuery = [[{ saleId: 1, date: '2022-08-15 12:50:00', productId: 1, quantity: 5}], []];
      sinon.stub(connection, 'query').resolves(resultadoQuery);
    });
    it('retorne um array', async function () {
      const resultado = await Sales.getAll();
      expect(resultado).to.be.an('array');
    });
    it('o array não esteja vazio', async function () {
      const result = await Sales.getAll();
      expect(result).to.be.not.empty;
    });
    it('o array possua itens do tipo objeto', async function () {
      const result = await Sales.getAll();
      expect(result[0]).to.be.an('object');
    });
    it('objetos tenham as propriedades: "saleId", "date", "productId", "quantity"', async function () {
      const result = await Sales.getAll();
      const item = result[0];
      expect(item).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
});

describe('Model - Cria uma venda no BD', () => {
  describe('quanto é criada uma nova venda', () => {
    beforeEach(() => { 
      sinon.restore();
      })
      
      const answerObj = {
        "insertId": 4,
      }

      it('retorna um objeto', async () => {
        sinon.stub(connection, 'query').resolves([answerObj]);
        const response = await  Sales.createSale();

        expect(response).to.be.an('object');
      });
      it('o objeto não está vazio', async () => {
        sinon.stub(connection, 'query').resolves([answerObj]);
        const response = await Sales.createSale();
        
        expect(response).to.be.not.empty;
      });
      it('tal objeto possui as propriedades: "id", "name"', async () => {
        sinon.stub(connection, 'query').resolves([answerObj]);
        const item = await Sales.createSale();
        
        expect(item).to.include.all.keys('id');
      });
  });
  
  describe('quanto são inseridos os produtos vendidos', () => {
    beforeEach(() => { 
      sinon.restore();
      })
    
    const newsale = {
      "id": 4,
      "productId": 1,
      "quantity":1
    }
    
    const answerObj = {
      "productId": 1,
      "quantity":1
    }

      it('retorna um objeto', async () => {
        sinon.stub(connection, 'query').resolves([answerObj]);
        const response = await  Sales.insertSalesProducts(newsale);

        expect(response).to.be.an('object');
      });
      it('o objeto não está vazio', async () => {
        sinon.stub(connection, 'query').resolves([answerObj]);
        const response = await Sales.insertSalesProducts(newsale);
        
        expect(response).to.be.not.empty;
      });
      it('tal objeto possui as propriedades: "productId", "quantity"', async () => {
        sinon.stub(connection, 'query').resolves([answerObj]);
        const item = await Sales.insertSalesProducts(newsale);
        
        expect(item).to.include.all.keys('productId', 'quantity');
      });
    });
});