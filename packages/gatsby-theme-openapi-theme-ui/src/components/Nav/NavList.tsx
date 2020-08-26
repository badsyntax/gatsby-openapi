/* eslint jsx-a11y/anchor-has-content: 0 */
/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { NavItem } from './NavItem';

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
          key={`navitem-${item.key}`}
          selectedItems={selectedItems}
          onItemToggle={onItemToggle}
          item={item}
        />
      ))}
    </ul>
  );
};
