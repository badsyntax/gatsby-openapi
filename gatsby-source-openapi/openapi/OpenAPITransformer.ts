import { OpenAPIV3 } from 'openapi-types';
import {
  OpenAPIV3ObjectConvertToArray,
  OpenAPIV3ObjectAsArray,
  OpenAPIV3ServerObject,
} from '../types';

function sanitizeFieldNames<T>(obj): T {
  return Object.keys(obj).reduce(
    (newObj, key) => ({
      ...newObj,
      [newObj[key.replace('-', '_')]]: obj[key],
    }),
    {}
  ) as T;
}

export class OpenAPITransformer {
  constructor(public readonly document: OpenAPIV3.Document) {}

  getObjectAsArray(
    openApiObject: OpenAPIV3ObjectConvertToArray | undefined
  ): OpenAPIV3ObjectAsArray[] {
    return openApiObject
      ? Object.keys(openApiObject).map(
          (name): OpenAPIV3ObjectAsArray => {
            return {
              name,
              value: JSON.stringify(openApiObject[name]),
            };
          }
        )
      : [];
  }

  getInfo(): OpenAPIV3.InfoObject {
    return sanitizeFieldNames<OpenAPIV3.InfoObject>(this.document.info);
  }

  getPaths(): OpenAPIV3ObjectAsArray[] {
    return this.getObjectAsArray(this.document.paths);
  }

  getSecurity(security = this.document.security): OpenAPIV3ObjectAsArray[] {
    return security
      ? security
          .map((securityItem): OpenAPIV3ObjectAsArray[] => {
            return this.getObjectAsArray(securityItem);
          })
          .flat()
      : [];
  }

  getComponents(): OpenAPIV3ObjectAsArray[] {
    return this.getObjectAsArray(this.document.components);
  }

  getServers(): OpenAPIV3ServerObject[] {
    return (this.document.servers || []).map(
      ({ url, description, variables }): OpenAPIV3ServerObject => {
        return {
          url,
          description,
          variables: JSON.stringify(variables),
        };
      }
    );
  }
}
