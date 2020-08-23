import {
  OpenApiRequestBodiesByName,
  OpenApiRequestBody,
  OpenApiRequestBodyContent,
} from '../types';

export function getRequestBodyContent(
  requestBody: OpenApiRequestBody,
  allRequestBodiesByName: OpenApiRequestBodiesByName
): OpenApiRequestBodyContent[] {
  if (!requestBody) {
    return [];
  }
  if (!requestBody.ref) {
    return requestBody.content;
  }
  const ref = JSON.parse(requestBody.ref);
  const refSchemaName = ref['$ref'].split('/').pop();
  const refSchema = allRequestBodiesByName[refSchemaName];
  return refSchema.content;
}
