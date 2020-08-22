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

export interface OpenApiResponseContentExample {
  name: string;
  example: string;
}

export interface OpenApiResponseContent {
  contentType: string;
  schema: string;
  examples: OpenApiResponseContentExample[];
}

export interface OpenApiResponse {
  code: string;
  description: string;
  content: OpenApiResponseContent[];
}

export interface OpenApiPath {
  method: 'get' | 'put' | 'post' | 'delete';
  summary: string;
  description: string;
  operationId: string;
  security: OpenApiSecurity[];
  responses: OpenApiResponse[];
  path: string;
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
