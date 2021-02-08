class NullPointerException extends Error {  
    constructor (message) {
      super(message);
      Error.captureStackTrace(this, this.constructor);
  
      this.name = this.constructor.name;
      this.status = 374;
    }
  
    statusCode() {
      return this.status
    }
  }
  
  module.exports = NullPointerException;