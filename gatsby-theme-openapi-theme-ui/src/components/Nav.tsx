/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from 'theme-ui';
import { NavItem, NavList } from './NavList';

const getSelectedItems = (items: NavItem[], selectedKey: string): NavItem[] => {
  return items.reduce((previousValue, item) => {
    if (item.items) {
      const selectedItems = getSelectedItems(item.items, selectedKey);
      if (selectedItems.length) {
        previousValue.push(item);
        previousValue.push(...selectedItems);
      }
    }
    if (item.key === selectedKey) {
      previousValue.push(item);
    }
    return previousValue;
  }, []);
};

interface NavProps {
  items: NavItem[];
  selectedKey: string;
}

export const Nav: React.FunctionComponent<NavProps> = ({
  items,
  selectedKey,
}) => {
  const [selectedItems, setSelectedItems] = useState<NavItem[]>(
    getSelectedItems(items, selectedKey)
  );

  const onItemToggle = (item: NavItem) => {
    const selectedIndex = selectedItems.indexOf(item);
    const mewSelectedItems = selectedItems.slice();
    if (selectedIndex >= 0) {
      mewSelectedItems.splice(selectedIndex, 1);
    } else {
      mewSelectedItems.push(item);
    }
    setSelectedItems(mewSelectedItems);
  };

  return (
    <nav>
      <NavList
        items={items}
        selectedItems={selectedItems}
        onItemToggle={onItemToggle}
        sx={{
          margin: 0,
          padding: 0,
          position: 'sticky',
          top: 2,
          li: {
            listStyleType: 'none',
            fontSize: 1,
          },
          ul: {
            position: 'sticky',
            top: 2,
            margin: 0,
            padding: 0,
          },
        }}
      />
    </nav>
  );
};
