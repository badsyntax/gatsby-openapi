/** @jsx jsx */
import React, { useState } from 'react';
import { Flex, jsx } from 'theme-ui';

const DEFAULT_TAB_ITEM_VARIANT = 'default';

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

function getTabItems(children: React.ReactNode): TabItemProps[] {
  const items: TabItemProps[] = [];

  if (children) {
    React.Children.forEach<React.ReactChild>(
      children as React.ReactChild,
      (child: React.ReactChild) => {
        if (child) {
          if (isTabItem(child)) {
            items.push(child.props);
          } else {
            console.warn(
              'The children of a Tab component must be of type TabItem to be rendered.'
            );
          }
        }
      }
    );
  }

  return items;
}

function renderTabItems(
  tabItems: TabItemProps[],
  selectedKey: string,
  onTabClick: (item: TabItemProps) => void,
  variant?: 'default' | 'pill'
) {
  return (
    <React.Fragment>
      {tabItems.map((tabItem) => {
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

interface TabsProps {
  variant?: 'default' | 'pill';
}

export const Tabs: React.FunctionComponent<TabsProps> = (props) => {
  const tabItems = getTabItems(props.children);
  const [selectedKey, setSelectedKey] = useState(tabItems[0].itemKey);
  const onTabClick = (item: TabItemProps): void => {
    setSelectedKey(item.itemKey);
  };
  const variant = props.variant || DEFAULT_TAB_ITEM_VARIANT;
  return (
    <React.Fragment>
      <Flex sx={{ variant: `tabs.${variant}.container` }}>
        {renderTabItems(tabItems, selectedKey, onTabClick, variant)}
      </Flex>
      {renderTabContent(tabItems, selectedKey)}
    </React.Fragment>
  );
};
