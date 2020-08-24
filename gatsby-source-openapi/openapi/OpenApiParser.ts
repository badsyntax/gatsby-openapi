import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPI, OpenAPIV3 } from 'openapi-types';

export class OpenApiParser {
  static parse(api: string | OpenAPIV3.Document): Promise<OpenAPI.Document> {
    return SwaggerParser.bundle(api);
  }
}
