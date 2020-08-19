const SwaggerParser = require('@apidevtools/swagger-parser');

class OpenApiParser {
  constructor(specPath) {
    this.specPath = specPath;
    this.document = null;
  }

  async parse() {
    this.document = await SwaggerParser.validate(this.specPath);
  }
}

module.exports = {
  OpenApiParser,
};
