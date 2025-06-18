/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import PageTabSettings from './PageTabSettings';

jest.mock('../common/dynamic-icon/DynamicIcon', () => ({
  DynamicIcon: ({ pack, iconName, size, color }: any) => (
    <div
      data-testid="dynamic-icon"
      data-pack={pack}
      data-icon={iconName}
      data-size={size}
      data-color={color}
    />
  ),
}));

describe('PageTabSettings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders settings trigger icon', () => {
    render(<PageTabSettings />);
    expect(screen.getAllByTestId('dynamic-icon')[0]).toBeInTheDocument();
  });

  it('toggles popover visibility on icon click', () => {
    render(<PageTabSettings />);

    const trigger = screen.getAllByTestId('dynamic-icon')[0];
    const popover = screen.getByRole('tooltip');

    // Initially hidden
    expect(popover).toHaveClass('invisible');

    fireEvent.click(trigger);
    expect(popover).toHaveClass('visible');

    fireEvent.click(trigger);
    expect(popover).toHaveClass('invisible');
  });

  it('closes popover when clicking outside', () => {
    render(
      <>
        <PageTabSettings />
        <div data-testid="outside">Outside</div>
      </>
    );

    const trigger = screen.getAllByTestId('dynamic-icon')[0];
    const popover = screen.getByRole('tooltip');

    // Open the popover
    fireEvent.click(trigger);
    expect(popover).toHaveClass('visible');

    // Click outside
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(popover).toHaveClass('invisible');
  });

  it('renders all popover buttons with corresponding icons', () => {
    render(<PageTabSettings />);

    fireEvent.click(screen.getAllByTestId('dynamic-icon')[0]);

    expect(screen.getByText('Set as first page')).toBeInTheDocument();
    expect(screen.getByText('Rename')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
    expect(screen.getByText('Duplicate')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();

    expect(screen.getAllByTestId('dynamic-icon')).toHaveLength(6);
  });
});
