/* eslint jsx-a11y/anchor-has-content: 0 */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { OpenAPIV3 } from 'openapi-types';
import { jsx, Box } from 'theme-ui';
import { LinkProps, Link } from './Link';
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc';
import { RequestMethodBadge } from './RequestMethodBadge';
import { OpenApiOperationByTag } from '../hooks/useOpenApiOperationsByTag';

const fadeInAnimationStyles = {
  '@keyframes fadeIn': {
    to: {
      opacity: 1,
    },
  },
  animation: 'fadeIn 400ms ease-out forwards',
  opacity: 0,
};

const linkStyles = {
  pt: 2,
  pb: 2,
  pr: 3,
  pl: 3,
  display: 'flex',
  '&:hover': {
    backgroundColor: 'backgroundContent',
  },
};

const navItemStyles = {
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export interface NavItem {
  name: string;
  key: string;
  to?: string;
  items?: NavItem[];
  operation?: OpenApiOperationByTag;
}

interface NavItemProps {
  item: NavItem;
  selectedItems: NavItem[];
  onItemToggle: (item: NavItem) => void;
}

const NavItem: React.FunctionComponent<NavItemProps> = ({
  item,
  selectedItems,
  onItemToggle,
  ...props
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const linkProps: LinkProps = {
    to: item.to || '#',
    sx: linkStyles,
  };
  if (item.items) {
    linkProps.onClick = (event: React.SyntheticEvent) => {
      event.preventDefault();
      setShouldAnimate(true);
      onItemToggle(item);
    };
  }

  if (item.name === "Operations") {
    console.log('item', item);
    console.log('selectedItems', selectedItems);
    console.log(selectedItems.indexOf(item))
  }
  return (
    <li key={item.key} {...props}>
      <Link {...linkProps}>
        {item.operation && (
          <div
            sx={{
              width: '32px',
              pt: 1,
              mr: 2,
            }}
          >
            <RequestMethodBadge
              method={item.operation.method}
              pb={0.5}
              pt={0.5}
              pl={1}
              pr={1}
              sx={{
                fontSize: '0.5rem',
                textAlign: 'center',
                display: 'block',
              }}
            />
          </div>
        )}
        <Box sx={navItemStyles}>
          {item.name}
          {item.items &&
            (selectedItems.indexOf(item) === -1 ? (
              <VscChevronRight
                sx={{
                  strokeWidth: 1,
                }}
              />
            ) : (
              <VscChevronDown
                sx={{
                  strokeWidth: 1,
                }}
              />
            ))}
        </Box>
      </Link>
      {item.items && (
        <NavList
          items={item.items}
          selectedItems={selectedItems}
          onItemToggle={onItemToggle}
          sx={{
            display: selectedItems.indexOf(item) >= 0 ? 'block' : 'none',
            ...(shouldAnimate && selectedItems.indexOf(item) >= 0 && fadeInAnimationStyles),
          }}
        />
      )}
    </li>
  );
};

interface NavList {
  items: NavItem[];
  selectedItems: NavItem[];
  onItemToggle: (item: NavItem) => void;
}

export const NavList: React.FunctionComponent<NavList> = ({
  items,
  selectedItems,
  onItemToggle,
  ...props
}) => {
  console.log('selectedItems', selectedItems);
  return (
    <ul {...props}>
      {items.map((item) => (
        <NavItem
          key={`navitem-${item.key}`}
          selectedItems={selectedItems}
          onItemToggle={onItemToggle}
          item={item}
        />
      ))}
    </ul>
  );
};
