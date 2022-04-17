const header = require('../header');

module.exports = {
  successHandler(res, statusCode, data = null, message = null) {
    const response = {
      status: 'success',
    };
    if (data) {
      response.data = data;
    }
    if (message) {
      response.message = message;
    }
    res.writeHead(statusCode, header);
    res.write(JSON.stringify(response));
    res.end();
  },
  errorHandler(res, statusCode, message) {
    res.writeHead(statusCode, header);
    res.write(
      JSON.stringify({
        status: 'failed',
        message: message,
      }),
    );
    res.end();
  },
};
