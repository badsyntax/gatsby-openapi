"use strict";
exports.__esModule = true;
exports.isReferenceObject = exports.isOAuth2SecurityScheme = void 0;
function isOAuth2SecurityScheme(obj) {
    return obj.type === 'oauth2';
}
exports.isOAuth2SecurityScheme = isOAuth2SecurityScheme;
function isReferenceObject(obj) {
    return !!obj['$ref'];
}
exports.isReferenceObject = isReferenceObject;
