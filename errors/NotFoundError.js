class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.code = 'notFound';
  }
}

module.exports = NotFoundError;