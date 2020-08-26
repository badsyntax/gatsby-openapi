/** @jsx jsx */
import React, { useState } from 'react';
import { Flex, jsx } from 'theme-ui';

interface TabItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  itemKey: string;
}

export const TabItem: React.FunctionComponent<TabItemProps> = () => null;

function isTabItem(item: React.ReactNode): item is React.ReactElement {
  return (
    !!item &&
    !!(item as React.ReactElement).type &&
    ((item as React.ReactElement).type as React.ComponentType).name ===
      TabItem.name
  );
}

function getTabItems(props): TabItemProps[] {
  const items: TabItemProps[] = [];

  React.Children.map(
    React.Children.toArray(props.children),
    (child: React.ReactChild) => {
      if (isTabItem(child)) {
        items.push(child.props);
      } else {
        console.warn(
          'The children of a Tab component must be of type TabItem to be rendered.'
        );
      }
    }
  );

  return items;
}

function renderTabItems(
  tabItems: TabItemProps[],
  selectedKey: string,
  onTabClick: (item: TabItemProps) => void
) {
  return (
    <React.Fragment>
      {tabItems.map((tabItem, i) => {
        return (
          <button
            type="button"
            onClick={() => onTabClick(tabItem)}
            sx={{
              p: 2,
              mr: 2,
              border: 0,
              backgroundColor: 'transparent',
              fontSize: 1,
              cursor: 'pointer',
              '&:focus': {
                outline: 'none',
              },
              '&:hover': {
                backgroundColor: (theme) => theme.colors.muted,
              },
              ...(tabItem.itemKey === selectedKey && {
                borderBottom: (theme) => `2px solid ${theme.colors.primary}`,
              }),
            }}
          >
            {tabItem.label}
          </button>
        );
      })}
    </React.Fragment>
  );
}

function renderTabContent(tabItems: TabItemProps[], selectedKey: string) {
  const tabItem = tabItems.find((tabItem) => tabItem.itemKey === selectedKey);
  return tabItem.children;
}

export const Tabs: React.FunctionComponent = (props) => {
  const tabItems = getTabItems(props);
  const [selectedKey, setSelectedKey] = useState(tabItems[0].itemKey);
  const onTabClick = (item: TabItemProps): void => {
    setSelectedKey(item.itemKey);
  };
  return (
    <React.Fragment>
      <Flex mb={2}>{renderTabItems(tabItems, selectedKey, onTabClick)}</Flex>
      {renderTabContent(tabItems, selectedKey)}
    </React.Fragment>
  );
};
