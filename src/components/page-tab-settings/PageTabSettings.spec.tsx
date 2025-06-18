import { render, screen, fireEvent } from '@testing-library/react';
import PageTabSettings from './PageTabSettings';

jest.mock('../common/dynamic-icon/DynamicIcon', () => ({
  DynamicIcon: () => <span data-testid="mock-icon" />,
}));

const mockDispatch = jest.fn();
jest.mock('../../store/hookes', () => ({
  useAppDispatch: () => mockDispatch,
}));

describe('PageTabSettings', () => {
  const tabId = 'test-tab';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should toggle popover visibility on icon click', () => {
    render(<PageTabSettings id={tabId} />);
    
    const trigger = screen.getByTestId('popover-trigger');
    const popover = screen.getByRole('tooltip');

    expect(popover).toHaveClass('opacity-0', { exact: false });

    fireEvent.click(trigger);
    expect(popover).toHaveClass('opacity-100', { exact: false });

    fireEvent.click(trigger);
    expect(popover).toHaveClass('opacity-0', { exact: false });
  });

  it('should dispatch moveTabToFirstPlace when "Set as first page" is clicked', () => {
    render(<PageTabSettings id={tabId} />);
    fireEvent.click(screen.getByTestId('popover-trigger'));

    fireEvent.click(screen.getByText(/Set as first page/i));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tabs/moveTabToFirstPlace', payload: tabId });
  });

  it('should dispatch removeTab when "Delete" is clicked', () => {
    render(<PageTabSettings id={tabId} />);
    fireEvent.click(screen.getByTestId('popover-trigger'));

    fireEvent.click(screen.getByText(/Delete/i));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tabs/removeTab', payload: tabId });
  });

  it('should close popover when clicking outside', () => {
    render(
      <div>
        <PageTabSettings id={tabId} />
        <button data-testid="outside-button">Outside</button>
      </div>
    );

    const trigger = screen.getByTestId('popover-trigger');
    const popover = screen.getByRole('tooltip');

    fireEvent.click(trigger);
    expect(popover).toHaveClass('opacity-100', { exact: false });

    fireEvent.mouseDown(screen.getByTestId('outside-button'));
    expect(popover).toHaveClass('opacity-0', { exact: false });
  });
});
