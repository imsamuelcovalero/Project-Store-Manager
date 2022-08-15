const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const productsService = require('../../../services/products.service');
const productsController = require('../../../controllers/products.controller');

describe('Controller - Ao chamar o controller de getProductById', () => {
  // describe('quando o produto não existe no BD', async () => {
  //   const response = {};
  //   const request = {};

  //   before(() => {
  //     request.params = {
  //       id: 1,
  //     };

  //     response.status = sinon.stub()
  //       .returns(response);
  //     response.json = sinon.stub()
  //       .returns();

  //     sinon.stub(productsService, 'getProductById')
  //       .resolves(id);
  //   });

  //   after(() => {
  //     productsService.getProductById.restore();
  //   });

  //   it('é chamado o método "status" passando 404', async () => {
  //     await productsService.getProductById(request, response);

  //     expect(response.status.calledWith(404)).to.be.equal(false);
  //   });

  //   it('é chamado o método "json" passando a mensagem "Product not found"', async () => {
  //     await productsService.getProductById(request, response);

  //     expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(false);
  //   });
  // });

  describe('quando existe o produto no banco de dados', async () => {
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

      sinon.stub(productsService, 'getProductById')
        .resolves({
            "id": 1,
            "name": "Martelo de Thor"
        });
    });

    after(() => {
      productsService.getProductById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productsController.getProductById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await productsController.getProductById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('Controller - Busca todas os produtos no BD', () => {
  describe('quando não existe nenhum produto criado', function () {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves([]);
    });
    after(function () {
      productsService.getAll.restore();
    });
    
    it('o status seja 200', async function () {
      await productsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('o array vazio', async function () {
      await productsController.getAll(request, response);
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });
  describe('quando exitem produtos criados', function () {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves([{ id: 1, name: 'Martelo de Thor' }]);
    });
    after(function () {
      productsService.getAll.restore();
    });
    it('o status seja 200', async function () {
      await productsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('o array com os dados', async function () {
      await productsController.getAll(request, response);
      expect(response.json.calledWith([{ id: 1, name: 'Martelo de Thor' }])).to.be.equal(true);
    });
  });
});

describe('Controller - Quando insere um produto no banco de dados', async () => {
  const newProductName = 'ProdutoX';
  const response = {};
  const request = {};

  before(() => {
    request.body = {
      name: newProductName,
    };

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();

    sinon.stub(productsService, 'create')
      .resolves({
          "id": 4,
          "name": "ProdutoX"
      });
  });

  after(() => {
    productsService.create.restore();
  });

  it('é chamado o método "status" passando o código 201', async () => {
    await productsController.create(request, response);

    expect(response.status.calledWith(201)).to.be.equal(true);
  });

  it('é chamado o método "json" passando um objeto', async () => {
    await productsController.create(request, response);

    expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
  });
});