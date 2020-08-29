import { OpenAPIV3 } from 'openapi-types';

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

export type DereferenceObject =
  | OpenAPIV3.ReferenceObject
  | OpenAPIV3.SecuritySchemeObject
  | OpenAPIV3.ResponseObject
  | OpenAPIV3.SchemaObject
  | OpenAPIV3.ExampleObject;

export type Dereference<T> = (obj: DereferenceObject) => T;

export interface SchemaMap {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type CustomPluginOptions = {
  specPath: string | null;
  generateCodeSamples?: boolean;
  codeSampleTargets?: string[];
  singlePage?: boolean;
};
