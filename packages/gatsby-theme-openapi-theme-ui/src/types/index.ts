import { OpenAPIV3 } from 'openapi-types';
import { OpenAPIV3GraphQLOperation } from 'gatsby-source-openapi/types';

export function isOAuth2SecurityScheme(
  obj: OpenAPIV3.SecuritySchemeObject
): obj is OpenAPIV3.OAuth2SecurityScheme {
  return obj.type === 'oauth2';
}

export function isReferenceObject(
  obj: DereferenceObject
): obj is OpenAPIV3.ReferenceObject {
  return !!obj['$ref'];
}

export interface Edges<Node> {
  edges: Array<{
    node: Node;
  }>;
}

export interface OperationWithFields extends OpenAPIV3GraphQLOperation {
  fields: {
    slug: string;
  };
}

export type DereferenceObject =
  | OpenAPIV3.ReferenceObject
  | OpenAPIV3.SecuritySchemeObject
  | OpenAPIV3.ResponseObject
  | OpenAPIV3.SchemaObject;

export type Dereference<T> = (obj: DereferenceObject) => T;

export interface SchemaMap {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
