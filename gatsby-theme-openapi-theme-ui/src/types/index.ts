export interface SiteMetadata {
  title: string;
}

export type Schema = string;

export interface ParsedSchema {
  type: string;
  format: string;
  [key: string]: unknown;
}

export interface OpenApiSchema {
  name: string;
  schema: Schema;
}

export interface OpenApiSchemasByName {
  [name: string]: Schema;
}

export interface OpenApiSecuritySchema {
  description: string;
  extra: string;
  name: string;
  type: string;
}

export interface OpenApiSecurity {
  name: string;
  opts: string[];
}

export interface OpenApiSchemaExample {
  name: string;
  example: string;
}

export interface OpenApiResponseContent {
  type: string;
  schema: string;
  examples: OpenApiSchemaExample[];
}

export interface OpenApiResponse {
  code: string;
  description: string;
  content: OpenApiResponseContent[];
}

export interface OpenApiRequestBodyContent {
  schema: string;
  type: string;
  description: string;
  examples: OpenApiSchemaExample[];
}

export interface OpenApiRequestBody {
  content: OpenApiRequestBodyContent[];
  ref: string;
  description: string;
  name: string;
  required: boolean;
}

export interface OpenApiRequestBodiesByName {
  [name: string]: OpenApiRequestBody;
}

export interface OpenApiPath {
  method: 'get' | 'put' | 'post' | 'delete';
  summary: string;
  description: string;
  operationId: string;
  security: OpenApiSecurity[];
  responses: OpenApiResponse[];
  path: string;
  requestBody: OpenApiRequestBody;
  fields: {
    slug: string;
  };
}

export interface OpenApiInfo_XLogo {
  altText: string;
  url: string;
}

export interface OpenApiInfo {
  title: string;
  contact: {
    name: string;
    url: string;
    email: string;
  };
  description: string;
  license: {
    name: string;
    url: string;
  };
  version: string;
  x_logo: OpenApiInfo_XLogo;
}
