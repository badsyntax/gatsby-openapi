/** @jsx jsx */
import React from 'react';
import { jsx, Text } from 'theme-ui';
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from './Link';
import { useOpenApiSchemas } from '../hooks/useOpenapiSchemas';

const linkStyles = {
  pt: 1,
  pb: 1,
  display: 'block',
};

export const Nav: React.FunctionComponent = () => {
  const tagData = useStaticQuery(
    graphql`
      {
        data: allOpenApiPath {
          tags: group(field: tags) {
            tag: fieldValue
            totalCount
            endpoints: edges {
              endpoint: node {
                method
                summary
                description
                operationId
                tags
                fields {
                  slug
                }
                x_codeSamples {
                  lang
                  source
                }
                responses {
                  code
                  description
                  content {
                    contentType
                    examples {
                      name
                      example
                    }
                    schema
                  }
                }
              }
            }
          }
        }
      }
    `
  );
  const { tags } = tagData.data;

  const allSchemas = useOpenApiSchemas();

  return (
    <nav>
      <ul
        sx={{
          margin: 0,
          padding: 0,
          position: `sticky`,
          top: 2,
          li: {
            listStyleType: 'none',
          },
          ul: {
            position: `sticky`,
            top: 2,
            margin: 0,
            padding: 0,
            li: { paddingLeft: 3 },
          },
        }}
      >
        <li>
          <Link to="/" sx={linkStyles}>
            Overview
          </Link>
        </li>
        <li>
          <Link to="/authentication" sx={linkStyles}>
            Authentication
          </Link>
        </li>
        <li>
          <Text
            sx={{
              fontWeight: 'bold',
              pt: 1,
              pb: 1,
            }}
          >
            Operations
          </Text>
          <ul>
            {tags.map((tag) => (
              <li>
                <Text
                  sx={{
                    fontWeight: 'bold',
                    pt: 1,
                    pb: 1,
                  }}
                >
                  {tag.tag}
                </Text>
                <ul>
                  {tag.endpoints.map(({ endpoint }) => (
                    <li>
                      <Link
                        sx={linkStyles}
                        to={`/operation/${endpoint.fields.slug}`}
                      >
                        {/* [{endpoint.method}]  */}
                        {endpoint.summary}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <Text
            sx={{
              fontWeight: 'bold',
              pt: 1,
              pb: 1,
            }}
          >
            Models
          </Text>
          <ul>
            {allSchemas.map((schema) => {
              return (
                <li>
                  <Link sx={linkStyles} to={`/model/${schema.name}`}>
                    {schema.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </nav>
  );
};
