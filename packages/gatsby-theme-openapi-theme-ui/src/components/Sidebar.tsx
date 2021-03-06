/** @jsx jsx */
import { useLocation } from '@reach/router';
import { Sidenav } from '@theme-ui/sidenav';
import React from 'react';
import { jsx } from 'theme-ui';
import { useOpenApiInfo } from '../hooks/useOpenapiInfo';
import { useOpenApiOperationsByTag } from '../hooks/useOpenApiOperationsByTag';
import { useOpenApiSchemas } from '../hooks/useOpenapiSchemas';
import { Logo } from './Logo';
import { Nav } from './Nav/Nav';
import { NavItem } from './Nav/NavItem';

export const Sidebar: React.FunctionComponent = () => {
  const { x_logo } = useOpenApiInfo();
  const tags = useOpenApiOperationsByTag();
  const allSchemas = useOpenApiSchemas();
  const { pathname } = useLocation();
  const selectedKey = pathname.replace(/\/$/, '');

  const items: NavItem[] = [
    {
      name: 'Overview',
      to: '/',
      key: 'nav-/',
    },
    {
      name: 'Authentication',
      to: '/authentication',
      key: 'nav-/authentication',
    },
    {
      name: 'Operations',
      key: 'nav-/operations',
      items: Object.keys(tags).map((tag) => {
        return {
          name: tag,
          key: `nav-operations-tag-${tag}`,
          items: tags[tag].map(
            (operationByTag): NavItem => {
              return {
                name:
                  operationByTag.operation.summary ||
                  operationByTag.operation.operationId ||
                  'Summary not set',
                key: `nav-/operation/${operationByTag.fields.slug}`,
                to: `/operation/${operationByTag.fields.slug}/`,
                operation: operationByTag,
              };
            }
          ),
        };
      }),
    },
    {
      name: 'Models',
      key: 'nav-/models',
      items: allSchemas.map(
        (schema): NavItem => {
          return {
            name: schema.name,
            to: `/model/${schema.name}/`,
            key: `nav-/model/${schema.name}`,
          };
        }
      ),
    },
  ];

  return (
    <Sidenav
      sx={{
        overflowY: ['auto', 'auto', 'auto'],
        width: 'initial',
        height: '100vh',
        flexGrow: 1,
        flexBasis: 'sidebar',
        boxShadow:
          'rgba(0,0,0,0.133) 0px 1px 3px 0px, rgba(0,0,0,0.11) 0px 0.5px 1.8px 0px',
      }}
    >
      {x_logo && <Logo logo={x_logo} />}
      <Nav items={items} selectedKey={`nav-${selectedKey}`} />
    </Sidenav>
  );
};
