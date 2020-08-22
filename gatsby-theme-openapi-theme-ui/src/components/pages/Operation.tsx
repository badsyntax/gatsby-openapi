import React from 'react';
import { Helmet } from 'react-helmet';
import { PageProps } from 'gatsby';
import { Heading, Box, Badge } from 'theme-ui';
import { Layout } from '../Layout';
import { useOpenApiInfo } from '../../hooks/useOpenapiInfo';
import { OpenApiPath } from '../../types';
import { useMarkdownReact } from '../../hooks/useMarkdownReact';
import { Link } from '../Link';
import { useOpenApiSchemasByName } from '../../hooks/useOpenapiSchemasByName';
import { Responses } from '../Responses';
import { RequestInfo } from '../RequestInfo';
import { RequestMethodBadge } from '../RequestMethodBadge';

interface OperationDataProps {
  path: OpenApiPath;
}

export const Operation: React.FunctionComponent<PageProps<
  OperationDataProps
>> = ({ data }) => {
  const { title } = useOpenApiInfo();
  const { path } = data;
  const markdownReact = useMarkdownReact(path.description);
  const allSchemasByName = useOpenApiSchemasByName();
  return (
    <Layout>
      <Helmet>
        <title>
          {title} - {path.summary}
        </title>
      </Helmet>
      <Heading as="h2" mb={3}>
        {path.summary}
      </Heading>
      <Box bg={'codeBlockBG'} p={2} mb={3}>
        <RequestMethodBadge
          path={path}
          sx={{
            mr: 2,
          }}
          shortLabel={false}
        />
        {path.path}
      </Box>
      {markdownReact}
      <Heading as="h2" mt={4} mb={3}>
        Authorizations
      </Heading>
      {Boolean(path.security.length) && (
        <ul>
          {path.security.map((security) => {
            return (
              <li key={`authorization-${security.name}`}>
                <Link to={`/authentication#${security.name}`}>
                  {security.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {!Boolean(path.security.length) && (
        <div>(No authorizations for this operation.)</div>
      )}
      <Heading as="h2" mt={4} mb={3}>
        Request
      </Heading>
      <RequestInfo path={path} />
      <Heading as="h2" mt={4} mb={3}>
        Responses
      </Heading>
      <Responses
        responses={path.responses}
        allSchemasByName={allSchemasByName}
      />
    </Layout>
  );
};
