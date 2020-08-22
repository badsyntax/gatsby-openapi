/* eslint jsx-a11y/anchor-has-content: 0 */
/** @jsx jsx */
import React from 'react';
import { jsx, Badge, Box } from 'theme-ui';
import { LinkProps, Link } from './Link';
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc';
import { OpenApiResponse, OpenApiPath } from '../types';
import { RequestMethodBadge } from './RequestMethodBadge';

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
  endpoint?: OpenApiPath;
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
  const linkProps: LinkProps = {
    to: item.to || '#',
    sx: linkStyles,
  };
  if (item.items) {
    linkProps.onClick = (event: React.SyntheticEvent) => {
      event.preventDefault();
      onItemToggle(item);
    };
  }
  return (
    <li key={item.key} {...props}>
      <Link
        {...linkProps}
        // className={selectedItems.indexOf(item) >= 0 ? 'active' : null}
      >
        {item.endpoint && (
          <div
            sx={{
              minWidth: '32px',
              pt: 1,
              mr: 2,
            }}
          >
            <RequestMethodBadge
              path={item.endpoint}
              sx={{
                fontSize: '0.5rem',
                pb: 0.5,
                pt: 0.5,
                pl: 1,
                pr: 1,
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
  return (
    <ul {...props}>
      {items.map((item) => (
        <NavItem
          selectedItems={selectedItems}
          onItemToggle={onItemToggle}
          item={item}
        />
      ))}
    </ul>
  );
};
