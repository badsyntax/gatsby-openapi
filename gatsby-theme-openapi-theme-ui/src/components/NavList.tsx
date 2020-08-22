/* eslint jsx-a11y/anchor-has-content: 0 */
/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { LinkProps, Link } from './Link';
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc';

const linkStyles = {
  pt: 2,
  pb: 2,
  pr: 3,
  pl: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export interface NavItem {
  name: string;
  key: string;
  to?: string;
  items?: NavItem[];
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
      <Link {...linkProps}>
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
