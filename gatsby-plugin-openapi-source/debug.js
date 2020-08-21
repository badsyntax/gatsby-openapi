const { OpenApiParser } = require('./openapi/OpenApiParser');

(async function () {
  const foo = await OpenApiParser.parse('./openapi.yml');

  console.log('foo', foo);
})();
