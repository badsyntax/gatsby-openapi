import React from 'react';
import { css } from '@emotion/core';
import { useStaticQuery, graphql, Link } from 'gatsby';

const styles = css`
  padding: 15px;
  margin-bottom: 15px;
`;

export const Nav: React.FunctionComponent = () => {
  const tagData = useStaticQuery(
    graphql`
      {
        data: allOpenApiPaths {
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
                    schema {
                      type
                      description
                      required
                      items {
                        type
                        description
                        format
                        example
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  );
  return (
    <nav css={styles}>
      <ol>
        {tagData.data.tags.map((tag) => (
          <li>
            {tag.tag}
            <ol>
              {tag.endpoints.map(({ endpoint }) => {
                return (
                  <li>
                    <Link to={`/${endpoint.fields.slug}`}>
                      [{endpoint.method}] {endpoint.operationId}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>
    </nav>
  );
};
