"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceNodes = exports.createSchemaCustomization = void 0;
const OpenApiParser_1 = require("./openapi/OpenApiParser");
const OpenAPITransformer_1 = require("./openapi/OpenAPITransformer");
const types_1 = require("./types");
function sanitizeFieldNames(obj) {
    return Object.keys(obj).reduce((newObj, key) => {
        newObj[key.replace('-', '_')] = obj[key];
        return newObj;
    }, {});
}
exports.createSchemaCustomization = ({ actions, }) => {
    const { createTypes } = actions;
    createTypes(types_1.graphQlTypes);
};
exports.sourceNodes = async ({ actions, createContentDigest, createNodeId, reporter }, pluginOptions) => {
    const { createNode } = actions;
    function createInfoNode(transformer) {
        const info = sanitizeFieldNames(transformer.document.info);
        createNode({
            ...info,
            id: createNodeId(types_1.API_INFO_TYPE),
            children: [],
            internal: {
                type: types_1.API_INFO_TYPE,
                content: JSON.stringify(info),
                contentDigest: createContentDigest(info),
            },
        });
        reporter.success(`create ${types_1.API_INFO_TYPE} node`);
    }
    function createSecurityNodes(transformer) {
        transformer.getSecurity().forEach((security) => {
            createNode({
                ...security,
                id: createNodeId(`${types_1.API_SECURITY_TYPE}-${security.name}`),
                children: [],
                internal: {
                    type: types_1.API_SECURITY_TYPE,
                    content: JSON.stringify(security),
                    contentDigest: createContentDigest(security),
                },
            });
        });
        reporter.success(`create ${types_1.API_SECURITY_TYPE} nodes`);
    }
    function createSecuritySchemaNodes(transformer) {
        transformer.getSecuritySchemas().forEach((securitySchema) => {
            createNode({
                ...securitySchema,
                id: createNodeId(`${types_1.API_SECURITY_SCHEMA_TYPE}-${securitySchema.name}`),
                children: [],
                internal: {
                    type: types_1.API_SECURITY_SCHEMA_TYPE,
                    content: JSON.stringify(securitySchema),
                    contentDigest: createContentDigest(securitySchema),
                },
            });
        });
        reporter.success(`create ${types_1.API_SECURITY_SCHEMA_TYPE} nodes`);
    }
    function createSchemaNodes(transformer) {
        transformer.getSchemas().forEach((schema) => {
            createNode({
                ...schema,
                id: createNodeId(`${types_1.API_SCHEMA_TYPE}-${schema.name}`),
                children: [],
                internal: {
                    type: types_1.API_SCHEMA_TYPE,
                    content: JSON.stringify(schema),
                    contentDigest: createContentDigest(schema),
                },
            });
        });
        reporter.success(`create ${types_1.API_SCHEMA_TYPE} nodes`);
    }
    function createRequestBodySchemaNodes(transformer) {
        transformer.getRequestBodySchemas().forEach((schema) => {
            createNode({
                ...schema,
                id: createNodeId(`${types_1.API_REQUEST_BODY_SCHEMA_TYPE}-${schema.name}`),
                children: [],
                internal: {
                    type: types_1.API_REQUEST_BODY_SCHEMA_TYPE,
                    content: JSON.stringify(schema),
                    contentDigest: createContentDigest(schema),
                },
            });
        });
        reporter.success(`create ${types_1.API_REQUEST_BODY_SCHEMA_TYPE} nodes`);
    }
    function createTagNodes(transformer) {
        var _a;
        (((_a = transformer.document) === null || _a === void 0 ? void 0 : _a.tags) || []).forEach((tag) => {
            createNode({
                ...tag,
                id: createNodeId(`${types_1.API_TAG_TYPE}-${tag.name}`),
                children: [],
                internal: {
                    type: types_1.API_TAG_TYPE,
                    content: JSON.stringify(tag),
                    contentDigest: createContentDigest(tag),
                },
            });
        });
        reporter.success(`create ${types_1.API_TAG_TYPE} nodes`);
    }
    function createOperationNodes(transformer) {
        transformer.getOperations().forEach((operation) => {
            createNode({
                ...operation,
                id: createNodeId(`${types_1.API_OPERATION_TYPE}-${operation.path}-${operation.method}`),
                children: [],
                internal: {
                    type: types_1.API_OPERATION_TYPE,
                    content: JSON.stringify(operation),
                    contentDigest: createContentDigest(operation),
                },
            });
        });
        reporter.success(`create ${types_1.API_OPERATION_TYPE} nodes`);
    }
    try {
        const document = (await OpenApiParser_1.OpenApiParser.parse(pluginOptions.specPath));
        const transformer = new OpenAPITransformer_1.OpenAPITransformer(document);
        createInfoNode(transformer);
        createOperationNodes(transformer);
        createSecurityNodes(transformer);
        createSecuritySchemaNodes(transformer);
        createTagNodes(transformer);
        createSchemaNodes(transformer);
        createRequestBodySchemaNodes(transformer);
    }
    catch (e) {
        reporter.panicOnBuild(`Error sourcing OpenAPI data: ${e.message}`);
    }
};
