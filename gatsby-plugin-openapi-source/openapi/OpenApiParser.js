const SwaggerParser = require('@apidevtools/swagger-parser');

exports.OpenApiParser = class OpenApiParser {
  static async parse(specPath) {
    const document = await SwaggerParser.bundle(specPath);
    return document;
  }
};
