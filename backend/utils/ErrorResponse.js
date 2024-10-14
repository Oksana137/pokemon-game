// von Error geerbt
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    // message lassen wir so, wie sie ist, und fügen nur Statuscode hinzu
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;

// Durch obige Funktion wird bei CRuD-Operations für Errorhandling nur folgendes gebraucht:
// throw new ErrorResponse('message',418)
