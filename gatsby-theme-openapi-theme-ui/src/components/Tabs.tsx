/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

interface TabItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  key: string;
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

function renderTabItems(tabItems: TabItemProps[]) {
  return (
    <React.Fragment>
      {tabItems.map((tabItem) => {
        return (
          <button
            type="button"
            sx={{
              p: 2,
              mr: 2,
              border: 0,
              background: 'none',
              fontSize: 1,
              cursor: 'pointer',
              borderBottom: (theme) => `2px solid ${theme.colors.primary}`,
            }}
          >
            {tabItem.label}
          </button>
        );
      })}
    </React.Fragment>
  );
}

export const Tabs: React.FunctionComponent = (props) => {
  const tabItems = getTabItems(props);
  return (
    <div
      sx={{
        display: 'flex',
        mb: 2,
      }}
    >
      {renderTabItems(tabItems)}
    </div>
  );
};
