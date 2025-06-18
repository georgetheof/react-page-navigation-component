/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderWithStore } from '../../__tests__/test-utils';
import PageNavigation from '../page-navigation/PageNavigation';
import { screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

jest.mock('../common/dynamic-icon/DynamicIcon', () => ({
  DynamicIcon: ({ iconName }: { iconName: string }) => <span data-testid='mock-icon'>{iconName}</span>,
}));

jest.mock('../page-tab/PageTab', () => (props: any) => <div data-testid='mock-page-tab'>{props.label}</div>);

jest.mock('../common/add-fab-button/AddFabButton', () => (props: any) => (
  <button onClick={props.onAddClick} data-testid='mock-add-fab'>
    +
  </button>
));

jest.mock('../common/shortable-item/ShortableItem', () => (props: any) => (
  <div data-testid='mock-sortable-item'>{props.children}</div>
));

describe('PageNavigation', () => {
  it('renders Add Page button', () => {
    renderWithStore(<PageNavigation />, {
      tabs: {
        tabs: [{ id: 'tab-1-id', label: 'Tab 1' }],
        activeTabId: null,
      },
    });

    expect(screen.getByText('Add Page')).toBeInTheDocument();
  });

  it('calls dispatch when Add Page is clicked', async () => {
    const { store } = renderWithStore(<PageNavigation />, {
      tabs: {
        tabs: [{ id: 'tab-1-id', label: 'Tab 1' }],
        activeTabId: null,
      },
    });

    await act(async () => {
      await userEvent.click(screen.getByText('Add Page'));
    });

    const actions = store.getState().tabs.tabs;
    expect(actions.length).toBeGreaterThan(1);
  });

  it('renders SortableItems for existing tabs', () => {
    renderWithStore(<PageNavigation />, {
      tabs: {
        tabs: [
          { id: 'tab-1-id', label: 'Tab 1' },
          { id: 'tab-2-id', label: 'Tab 2' },
        ],
        activeTabId: null,
      },
    });

    const items = screen.getAllByTestId('mock-sortable-item');
    expect(items.length).toBeGreaterThan(1);
  });

  it('renders AddFabButtons between tabs', () => {
    renderWithStore(<PageNavigation />, {
      tabs: {
        tabs: [{ id: 'tab-1-id', label: 'Tab 1', type: 'add-page' }],
        activeTabId: null,
      },
    });

    expect(screen.getAllByTestId('mock-add-fab').length).toBeGreaterThan(0);
  });
});
