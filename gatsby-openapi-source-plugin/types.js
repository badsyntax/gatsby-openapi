const API_PATH_TYPE = `OpenApiPaths`;
const API_SECURITY_TYPE = `OpenApiSecurity`;
const API_TAGS_TYPE = `OpenApiTags`;
const API_INFO_TYPE = `OpenApiInfo`;
const API_INFO_CONTACT_TYPE = `OpenApiInfoContact`;
const API_INFO_LICENSE_TYPE = `OpenApiInfoLicense`;
const API_INFO_X_LOGO_TYPE = `OpenApiInfoXLogo`;

const types = `
  type ${API_TAGS_TYPE} implements Node {
    id: ID!
    name: String
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
    altText: String
    url: String
  }
`;

module.exports = {
  types,
  API_PATH_TYPE,
  API_SECURITY_TYPE,
  API_TAGS_TYPE,
  API_INFO_TYPE,
  API_INFO_CONTACT_TYPE,
  API_INFO_LICENSE_TYPE,
  API_INFO_X_LOGO_TYPE,
};
