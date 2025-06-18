/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddFabButton from './AddFabButton';

jest.mock('../dynamic-icon/DynamicIcon.tsx', () => ({
  DynamicIcon: ({ pack, iconName, size = 24 }: any) => (
    <div data-testid='dynamic-icon-mock' data-pack={pack} data-iconname={iconName} data-size={size} />
  ),
}));

describe('AddFabButton', () => {
  let mockClick: jest.Mock;

  beforeEach(() => {
    mockClick = jest.fn();
  });

  it('should render', () => {
    render(<AddFabButton onAddClick={mockClick} />);
    expect(screen.getByTestId('add-fab-button')).toBeInTheDocument();
  });

  it('renders the button with dynamic icon', () => {
    render(<AddFabButton onAddClick={mockClick} />);

    const icon = screen.getByTestId('dynamic-icon-mock');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-size', '16');
  });

    it('renders the button with dynamic icon with correct icon pack and default size', () => {
    render(<AddFabButton onAddClick={mockClick} />);

    const icon = screen.getByTestId('dynamic-icon-mock');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-pack', 'io');
    expect(icon).toHaveAttribute('data-iconname', 'IoIosAdd');
    expect(icon).toHaveAttribute('data-size', '16');
  });

  it('renders the dynamic icon with a custom size when provided', () => {
    render(<AddFabButton onAddClick={mockClick} size={20} />);

    const icon = screen.getByTestId('dynamic-icon-mock');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-size', '20');
  });

  it('calls onAddClick when clicked', async () => {
    render(<AddFabButton onAddClick={mockClick} />);

    const button = screen.getByRole('button');
    await act(async () => {
      await userEvent.click(button);
    });

    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
