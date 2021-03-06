/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from 'theme-ui';
import { NavItem } from './NavItem';
import { NavList } from './NavList';

const getSelectedItems = (items: NavItem[], selectedKey: string): NavItem[] => {
  return items.reduce<NavItem[]>((previousValue, item) => {
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

  const onItemToggle = (item: NavItem): void => {
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
          pb: 2,
          position: 'sticky',
          li: {
            listStyleType: 'none',
            fontSize: 1,
          },
          ul: {
            position: 'sticky',
            margin: 0,
            padding: 0,
          },
        }}
      />
    </nav>
  );
};
