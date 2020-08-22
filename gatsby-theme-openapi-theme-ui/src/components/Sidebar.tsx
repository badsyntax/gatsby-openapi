/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { Sidenav } from '@theme-ui/sidenav';
import { useLocation } from '@reach/router';
import { Nav } from './Nav';
import { useOpenApiInfo } from '../hooks/useOpenapiInfo';
import { Logo } from './Logo';
import { useOpenapiPathsByTag } from '../hooks/useOpenapiPathsByTag';
import { useOpenApiSchemas } from '../hooks/useOpenapiSchemas';
import { NavItem } from './NavList';

export const Sidebar: React.FunctionComponent = () => {
  const { x_logo } = useOpenApiInfo();
  const tags = useOpenapiPathsByTag();
  const allSchemas = useOpenApiSchemas();
  const { pathname: selectedKey } = useLocation();

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
      key: 'nav-operations',
      items: tags.map((tag) => {
        return {
          name: tag.tag,
          key: `nav-operations-tag-${tag.tag}`,
          items: tag.endpoints.map(
            ({ endpoint }): NavItem => {
              return {
                name: endpoint.summary,
                key: `nav-/operation/${endpoint.fields.slug}`,
                to: `/operation/${endpoint.fields.slug}`,
              };
            }
          ),
        };
      }),
    },
    {
      name: 'Models',
      key: 'nav-models',
      items: allSchemas.map(
        (schema): NavItem => {
          return {
            name: schema.name,
            to: `/model/${schema.name}`,
            key: `nav-/model/${schema.name}`,
          };
        }
      ),
    },
  ];

  return (
    <Sidenav
      sx={{
        p: '3 0',
        pt: 2,
        overflowY: ['auto', 'auto', 'initial'],
        width: 'initial',
        minHeight: '100vh',
        flexGrow: 1,
        flexBasis: 'sidebar',
      }}
    >
      {x_logo && <Logo logo={x_logo} />}
      <Nav items={items} selectedKey={`nav-${selectedKey}`} />
    </Sidenav>
  );
};
