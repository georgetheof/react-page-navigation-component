/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import PageTab from './PageTab';
import { setActiveTab } from '../../store/features/tabs/tabsSlice';

jest.mock('../common/dynamic-icon/DynamicIcon', () => ({
  DynamicIcon: ({ pack, iconName, size, color }: any) => (
    <div data-testid='dynamic-icon' data-pack={pack} data-icon={iconName} data-size={size} data-color={color} />
  ),
}));

jest.mock('../page-tab-settings/PageTabSettings', () => () => <div data-testid='page-tab-settings'>Settings</div>);

const mockDispatch = jest.fn();
jest.mock('../../store/hookes', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (fn: any) =>
    fn({
      tabs: {
        activeTabId: 'tab-1',
      },
    }),
}));

jest.mock('../../store/features/tabs/tabsSlice', () => ({
  setActiveTab: jest.fn((id) => ({ type: 'tabs/setActiveTab', payload: id })),
}));

describe('PageTab', () => {
  it('renders label and icon', () => {
    render(<PageTab id='tab-1' label='Tab 1' />);

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByTestId('dynamic-icon')).toBeInTheDocument();
    expect(screen.getByTestId('dynamic-icon')).toHaveAttribute('data-color', 'orange');
  });

  it('shows settings if active', () => {
    render(<PageTab id='tab-1' label='Tab 1' withSettings />);

    expect(screen.getByTestId('page-tab-settings')).toBeInTheDocument();
  });

  it('dispatches setActiveTab when clicked and not active', () => {
    render(<PageTab id='tab-2' label='Tab 2' />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockDispatch).toHaveBeenCalledWith(setActiveTab('tab-2'));
  });

  it('does NOT dispatch setActiveTab when already active', () => {
    render(<PageTab id='tab-1' label='Tab 1' />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockDispatch).toHaveBeenCalledWith(setActiveTab('tab-1'));
  });
});
