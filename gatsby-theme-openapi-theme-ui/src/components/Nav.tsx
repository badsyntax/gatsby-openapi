/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from 'theme-ui';
import { VscChevronRight, VscChevronDown } from 'react-icons/vsc';
import { Link, LinkProps } from './Link';

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

interface NavList {
  items: NavItem[];
  selectedItems: NavItem[];
  onNodeToggle: (item: NavItem) => void;
}

const NavList: React.FunctionComponent<NavList> = ({
  items,
  selectedItems,
  onNodeToggle,
  ...props
}) => {
  return (
    <ul {...props}>
      {items.map((item) => (
        <NavItem
          selectedItems={selectedItems}
          onNodeToggle={onNodeToggle}
          item={item}
        />
      ))}
    </ul>
  );
};

interface NavItemProps {
  item: NavItem;
  selectedItems: NavItem[];
  onNodeToggle: (item: NavItem) => void;
}

const NavItem: React.FunctionComponent<NavItemProps> = ({
  item,
  selectedItems,
  onNodeToggle,
  ...props
}) => {
  const linkProps: LinkProps = {
    to: item.to || '#',
    sx: linkStyles,
  };
  if (item.items) {
    linkProps.onClick = (event: React.SyntheticEvent) => {
      event.preventDefault();
      onNodeToggle(item);
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
          onNodeToggle={onNodeToggle}
          sx={{
            display: selectedItems.indexOf(item) >= 0 ? 'block' : 'none',
          }}
        />
      )}
    </li>
  );
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

  const onNodeToggle = (item: NavItem) => {
    const openedIndex = selectedItems.indexOf(item);
    const newOpenedNodes = selectedItems.slice();
    if (openedIndex >= 0) {
      newOpenedNodes.splice(openedIndex, 1);
    } else {
      newOpenedNodes.push(item);
    }
    setSelectedItems(newOpenedNodes);
  };

  return (
    <nav>
      <NavList
        items={items}
        selectedItems={selectedItems}
        onNodeToggle={onNodeToggle}
        sx={{
          margin: 0,
          padding: 0,
          position: 'sticky',
          top: 2,
          li: {
            listStyleType: 'none',
          },
          ul: {
            position: 'sticky',
            top: 2,
            margin: 0,
            padding: 0,
            li: { paddingLeft: 3 },
          },
        }}
      />
    </nav>
  );
};
