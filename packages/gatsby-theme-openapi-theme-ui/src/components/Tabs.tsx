/** @jsx jsx */
import React, { useState } from 'react';
import { Flex, jsx } from 'theme-ui';

const DEFAULT_TAB_ITEM_VARIANT = 'default';

interface TabItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  itemKey: string;
  variant?: 'default' | 'pill';
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

  if (props.children) {
    React.Children.map(props.children, (child: React.ReactChild) => {
      if (isTabItem(child)) {
        items.push(child.props);
      } else {
        console.warn(
          'The children of a Tab component must be of type TabItem to be rendered.'
        );
      }
    });
  }

  return items;
}

function renderTabItems(
  tabItems: TabItemProps[],
  selectedKey: string,
  onTabClick: (item: TabItemProps) => void
) {
  return (
    <React.Fragment>
      {tabItems.map((tabItem) => {
        const variant = tabItem.variant || DEFAULT_TAB_ITEM_VARIANT;
        return (
          <button
            type="button"
            onClick={() => onTabClick(tabItem)}
            key={`button-${tabItem.itemKey}`}
            sx={{
              variant: `tabs.${variant}.item`,
            }}
            className={tabItem.itemKey === selectedKey ? 'active' : undefined}
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
  return tabItem ? tabItem.children : null;
}

export const Tabs: React.FunctionComponent = (props) => {
  const tabItems = getTabItems(props);
  const [selectedKey, setSelectedKey] = useState(tabItems[0].itemKey);
  const onTabClick = (item: TabItemProps): void => {
    setSelectedKey(item.itemKey);
  };
  return (
    <React.Fragment>
      <Flex mb={3}>{renderTabItems(tabItems, selectedKey, onTabClick)}</Flex>
      {renderTabContent(tabItems, selectedKey)}
    </React.Fragment>
  );
};
