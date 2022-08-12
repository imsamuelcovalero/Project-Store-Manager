// const NotFoundError = require('../errors/NotFoundError');
// const InvalidError = require('../errors/InvalidError');
const Joi = require('joi');
const CustomError = require('../errors/CustomError');

const validators = {
  validateNameExists: async (req, _res, next) => {
    // const { name } = req.body;
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const { error } = schema.validate(req.body, schema);

    if (error) {
      throw new CustomError(400, 'invalidData', 'name is required');
    }

    next(); 
  },
  validateNameLength: async (req, _res, next) => {
    // const { name } = req.body;
    const schema = Joi.object({
      name: Joi.string().min(5).required(),
    });

    const { error } = schema.validate(req.body, schema);

    if (error) {
      throw new CustomError(422, 'invalidData', 'name length must be at least 5 characters long');
    }

    next(); 
  },

  validateName: (req, res, next) => {
  const { name } = req.body;
    if (!name) {
    throw new CustomError(400, '"name" is required');
    /* return res.status(400)
      .json({ message: '"name" is required' });  */
  }
    if (name.length < 5) {
    throw new CustomError(422, '"name" length must be at least 5 characters long');
    /* return res.status(422)
    .json({ message: '"name" length must be at least 5 characters long' }); */ 
  }
  next();
  },
};

module.exports = validators;