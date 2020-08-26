import { PluginOptions } from 'gatsby';
import { OpenAPIV3 } from 'openapi-types';

export const GRAPHQL_NODE_OPENAPI_PATH = 'OpenApiPath';
export const GRAPHQL_NODE_OPENAPI_OPERATION = 'OpenApiOperation';
export const GRAPHQL_NODE_OPENAPI_COMPONENT = 'OpenApiComponent';
export const GRAPHQL_NODE_OPENAPI_SECURITY = 'OpenApiSecurity';
export const GRAPHQL_NODE_OPENAPI_SCHEMA = 'OpenApiSchema';
export const GRAPHQL_NODE_OPENAPI_TAG = 'OpenApiTag';
export const GRAPHQL_NODE_OPENAPI_INFO = 'OpenApiInfo';
export const GRAPHQL_NODE_OPENAPI_SERVER = 'OpenApiServer';
export const GRAPHQL_NODE_OPENAPI_EXTERNAL_DOCS = 'OpenApiExternalDocs';
export const GRAPHQL_NODE_OPENAPI_INFO_CONTACT = 'OpenApiInfoContact';
export const GRAPHQL_NODE_OPENAPI_INFO_LICENSE = 'OpenApiInfoLicense';
export const GRAPHQL_NODE_OPENAPI_INFO_X_LOGO = 'OpenApiInfoXLogo';

export interface OpenApiInfo_XLogo {
  altText: string;
  url: string;
}

export interface OpenApiXCodeSample {
  lang: string;
  label?: string;
  source: string;
}

export interface OpenApiOperationObjectWithExtensions
  extends OpenAPIV3.OperationObject {
  x_codeSamples?: OpenApiXCodeSample[];
}

export type OpenAPIV3ObjectConvertToArray =
  | OpenAPIV3.PathsObject
  | OpenAPIV3.SecurityRequirementObject
  | OpenAPIV3.ComponentsObject;

export type JsonString = string;

export interface GraphQLOpenApiServer
  extends Omit<OpenAPIV3.ServerObject, 'variables'> {
  variables: JsonString;
}

export interface GraphQLOpenApiObjectAsArray {
  name: string;
  value: JsonString;
}

export type GraphQLOpenApiPath = GraphQLOpenApiObjectAsArray;
export type GraphQLOpenApiSecurity = GraphQLOpenApiObjectAsArray;
export type GraphQLOpenApiComponent = GraphQLOpenApiObjectAsArray;

export interface GraphQLOpenApiOperation {
  path: string;
  method: string;
  operation: JsonString;
}

export interface GraphQLOpenApiOperationWithFields
  extends GraphQLOpenApiOperation {
  fields: {
    slug: string;
  };
}

export interface GraphQLOpenApiSchema {
  name: string;
  schema: JsonString;
}

export interface GraphQLSiteMetadata {
  title: string;
}

export interface GraphQLOpenApiInfo extends OpenAPIV3.InfoObject {
  x_logo: OpenApiInfo_XLogo;
}

export type CustomPluginOptions = PluginOptions & {
  specPath: string;
  generateCodeSamples?: boolean;
  codeSampleTargets?: string[];
};

export const graphQlTypes = `

  type ${GRAPHQL_NODE_OPENAPI_COMPONENT} implements Node {
    id: ID!
    name: String!
    value: String!
  }

  type ${GRAPHQL_NODE_OPENAPI_SCHEMA} implements Node {
    id: ID!
    name: String!
    schema: String!
  }

  type ${GRAPHQL_NODE_OPENAPI_OPERATION} implements Node {
    id: ID!
    path: String!
    method: String!
  }

  type ${GRAPHQL_NODE_OPENAPI_PATH} implements Node {
    id: ID!
    name: String!
    value: String
  }

  type ${GRAPHQL_NODE_OPENAPI_TAG} implements Node {
    id: ID!
    name: String!
    description: String
  }

  type ${GRAPHQL_NODE_OPENAPI_SERVER} implements Node {
    id: ID!
    url: String!
    description: String
    variables: String
  }

  type ${GRAPHQL_NODE_OPENAPI_SECURITY} implements Node {
    id: ID!
    name: String!
    value: String!
  }

  type ${GRAPHQL_NODE_OPENAPI_EXTERNAL_DOCS} implements Node {
    id: ID!
    url: String!
    description: String
  }

  type ${GRAPHQL_NODE_OPENAPI_INFO} implements Node {
    id: ID!
    title: String
    description: String
    contact: ${GRAPHQL_NODE_OPENAPI_INFO_CONTACT}
    license: ${GRAPHQL_NODE_OPENAPI_INFO_LICENSE}
    version: String
    x_logo: ${GRAPHQL_NODE_OPENAPI_INFO_X_LOGO}
  }

  type ${GRAPHQL_NODE_OPENAPI_INFO_CONTACT} {
    name: String
    url: String
    email: String
  }

  type ${GRAPHQL_NODE_OPENAPI_INFO_LICENSE} {
    name: String
    url: String
  }

  type ${GRAPHQL_NODE_OPENAPI_INFO_X_LOGO} {
    url: String!
    altText: String
  }
`;
