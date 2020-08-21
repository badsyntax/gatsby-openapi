const SwaggerParser = require('@apidevtools/swagger-parser');

exports.OpenApiParser = class OpenApiParser {
  static parse(specPath) {
    return SwaggerParser.bundle(specPath);
  }
};
