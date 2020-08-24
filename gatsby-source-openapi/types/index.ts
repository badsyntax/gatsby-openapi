import { OpenAPIV3 } from 'openapi-types';

export interface OpenApiGraphQLReferenceObject
  extends Omit<OpenAPIV3.ReferenceObject, '$ref'> {
  ref: string;
}

export interface OpenApiGraphQLSchemaExample {
  name?: string | null;
  example?: string; // store model as JSON string
  ref?: string;
}

export interface OpenApiGraphQLRequestBodyContent
  extends Omit<OpenAPIV3.MediaTypeObject, 'schema' | 'examples'> {
  type: string;
  schema: string; // store model as JSON string
  examples: OpenApiGraphQLSchemaExample[];
}

export interface OpenApiGraphQLRequestBodyObject
  extends Omit<OpenAPIV3.RequestBodyObject, 'content'> {
  content: OpenApiGraphQLRequestBodyContent[];
}

export interface OpenApiGraphQLRequestBody {
  name: string;
  requestBody?: OpenApiGraphQLRequestBodyObject | OpenApiGraphQLReferenceObject;
}

export interface OpenApiGraphQLSchema {
  name: string;
  schema?: string; // store model as JSON string
}

export type OpenApiGraphQLSecuritySchema = OpenApiGraphQLSchema;

export interface OpenApiGraphQLResponseObject
  extends Omit<OpenAPIV3.ResponseObject, 'content' | '$ref' | 'description'> {
  code?: string;
  content?: OpenApiGraphQLRequestBodyContent[];
  ref?: string;
  description?: string;
}

export type OpenApiGraphQLResponse =
  | OpenAPIV3.ReferenceObject
  | OpenApiGraphQLResponseObject;

export interface OpenApiGraphQLOperation
  extends Omit<
    OpenAPIV3.OperationObject,
    'responses' | 'requestBody' | 'security'
  > {
  responses?: OpenApiGraphQLResponse[];
  requestBody?: OpenApiGraphQLReferenceObject | OpenApiGraphQLRequestBodyObject;
  security?: OpenApiGraphQLSecurityRequirement[];
  method: string;
  path: string;
}

export interface OpenApiGraphQLSecurityRequirement {
  name: string;
  opts: string[];
}

export const API_OPERATION_TYPE = 'OpenApiOperation';
export const API_SECURITY_TYPE = 'OpenApiSecurity';
export const API_SECURITY_SCHEMA_TYPE = 'OpenApiSecuritySchema';
export const API_SCHEMA_TYPE = 'OpenApiSchema';
export const API_TAG_TYPE = 'OpenApiTag';
export const API_INFO_TYPE = 'OpenApiInfo';
export const API_INFO_CONTACT_TYPE = 'OpenApiInfoContact';
export const API_INFO_LICENSE_TYPE = 'OpenApiInfoLicense';
export const API_INFO_X_LOGO_TYPE = 'OpenApiInfoXLogo';
export const API_REQUEST_BODY_SCHEMA_TYPE = 'OpenApiRequestBodySchema';
export const API_REQUEST_BODY_CONTENT_TYPE = 'OpenApiRequestBodyContent';
export const API_SCHEMA_EXAMPLE = 'OpenApiSchemaExample';

export const graphQlTypes = `
  type ${API_TAG_TYPE} implements Node {
    id: ID!
    name: String!
    description: String
  }

  type ${API_SECURITY_TYPE} implements Node {
    id: ID!
    name: String!
    opts: [String!]!
  }

  type ${API_SECURITY_SCHEMA_TYPE} implements Node {
    id: ID!
    name: String!
    type: String!
    description: String
    extra: String
  }

  type ${API_SCHEMA_TYPE} implements Node {
    id: ID!
    name: String!
    schema: String
  }

  type ${API_REQUEST_BODY_SCHEMA_TYPE} implements Node {
    id: ID!
    name: String!
    description: String
    required: Boolean
    content: [${API_REQUEST_BODY_CONTENT_TYPE}]
  }

  type ${API_REQUEST_BODY_CONTENT_TYPE} {
    type: String!
    description: String
    schema: String
    examples: [${API_SCHEMA_EXAMPLE}]
  }

  type ${API_SCHEMA_EXAMPLE} {
    name: String
    example: String!
  }

  type ${API_INFO_TYPE} implements Node {
    id: ID!
    title: String
    description: String
    contact: ${API_INFO_CONTACT_TYPE}
    license: ${API_INFO_LICENSE_TYPE}
    version: String
    x_logo: ${API_INFO_X_LOGO_TYPE}
  }

  type ${API_INFO_CONTACT_TYPE} {
    name: String
    url: String
    email: String
  }

  type ${API_INFO_LICENSE_TYPE} {
    name: String
    url: String
  }

  type ${API_INFO_X_LOGO_TYPE} {
    url: String!
    altText: String
  }
`;
