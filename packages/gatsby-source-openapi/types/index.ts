import { OpenAPIV3 } from 'openapi-types';

export const API_PATH_TYPE = 'OpenApiPath';
export const API_OPERATION_TYPE = 'OpenApiOperation';
export const API_COMPONENT_TYPE = 'OpenApiComponent';
export const API_SECURITY_TYPE = 'OpenApiSecurity';
export const API_SCHEMA_TYPE = 'OpenApiSchema';
export const API_TAG_TYPE = 'OpenApiTag';
export const API_INFO_TYPE = 'OpenApiInfo';
export const API_SERVER_TYPE = 'OpenApiServer';
export const API_EXTERNAL_DOCS_TYPE = 'OpenApiExternalDocs';
export const API_INFO_CONTACT_TYPE = 'OpenApiInfoContact';
export const API_INFO_LICENSE_TYPE = 'OpenApiInfoLicense';
export const API_INFO_X_LOGO_TYPE = 'OpenApiInfoXLogo';

export type OpenAPIV3ObjectConvertToArray =
  | OpenAPIV3.PathsObject
  | OpenAPIV3.SecurityRequirementObject
  | OpenAPIV3.ComponentsObject;

export type JsonString = string;

export interface OpenAPIV3GraphQLServerObject
  extends Omit<OpenAPIV3.ServerObject, 'variables'> {
  variables: JsonString;
}

export interface OpenAPIV3GraphQLObjectAsArray {
  name: string;
  value: JsonString;
}

export interface OpenAPIV3GraphQLOperation {
  path: string;
  method: string;
  operation: JsonString;
}

export interface OpenAPIV3GraphQLSchema {
  name: string;
  schema: JsonString;
}

export const graphQlTypes = `

  type ${API_COMPONENT_TYPE} implements Node {
    id: ID!
    name: String!
    value: String!
  }

  type ${API_SCHEMA_TYPE} implements Node {
    id: ID!
    name: String!
    schema: String!
  }

  type ${API_OPERATION_TYPE} implements Node {
    id: ID!
    path: String!
    method: String!
  }

  type ${API_PATH_TYPE} implements Node {
    id: ID!
    name: String!
    value: String
  }

  type ${API_TAG_TYPE} implements Node {
    id: ID!
    name: String!
    description: String
  }

  type ${API_SERVER_TYPE} implements Node {
    id: ID!
    url: String!
    description: String
    variables: String
  }

  type ${API_SECURITY_TYPE} implements Node {
    id: ID!
    name: String!
    value: String!
  }

  type ${API_EXTERNAL_DOCS_TYPE} implements Node {
    id: ID!
    url: String!
    description: String
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
