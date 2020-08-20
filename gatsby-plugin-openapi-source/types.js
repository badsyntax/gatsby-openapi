const API_PATH_TYPE = `OpenApiPath`;
const API_SECURITY_TYPE = `OpenApiSecurity`;
const API_SECURITY_SCHEMA_TYPE = `OpenApiSecuritySchema`;
const API_TAG_TYPE = `OpenApiTag`;
const API_INFO_TYPE = `OpenApiInfo`;
const API_INFO_CONTACT_TYPE = `OpenApiInfoContact`;
const API_INFO_LICENSE_TYPE = `OpenApiInfoLicense`;
const API_INFO_X_LOGO_TYPE = `OpenApiInfoXLogo`;

const types = `
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

module.exports = {
  types,
  API_PATH_TYPE,
  API_SECURITY_TYPE,
  API_TAG_TYPE,
  API_INFO_TYPE,
  API_INFO_CONTACT_TYPE,
  API_INFO_LICENSE_TYPE,
  API_INFO_X_LOGO_TYPE,
  API_SECURITY_SCHEMA_TYPE,
};
