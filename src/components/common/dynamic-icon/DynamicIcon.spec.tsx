/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Suspense } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DynamicIcon } from './DynamicIcon';
import type { IconPack } from '../../../types';

const MockIcon = ({ size, color, onClick }: any) => (
  <svg data-testid='mock-icon' data-size={size} data-color={color} onClick={onClick} />
);

jest.mock('react-icons/fa', () => ({ FaBeer: MockIcon }));
jest.mock('react-icons/io', () => ({ IoIosAdd: MockIcon }));

class ErrorBoundary extends Component<{ onError: (error: Error) => void; children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true });
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) return <span>error</span>;
    return this.props.children;
  }
}

describe('DynamicIcon', () => {
  it('renders icon with correct size and color', async () => {
    render(
      <Suspense fallback={<span data-testid='fallback' />}>
        <DynamicIcon pack='fa' iconName='FaBeer' size={32} color='red' />
      </Suspense>
    );

    const icon = await screen.findByTestId('mock-icon');
    expect(icon).toHaveAttribute('data-size', '32');
    expect(icon).toHaveAttribute('data-color', 'red');
  });

  it('triggers iconClick when clicked', async () => {
    const onClick = jest.fn();

    render(
      <Suspense fallback={<span data-testid='fallback' />}>
        <DynamicIcon pack='io' iconName='IoIosAdd' iconClick={onClick} />
      </Suspense>
    );

    const icon = await screen.findByTestId('mock-icon');
    fireEvent.click(icon);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('throws for unknown pack', () => {
    // Reduce noise
    jest.spyOn(console, 'error').mockImplementationOnce(() => {});

    expect(() =>
      render(
        <Suspense fallback={<span />}>
          <DynamicIcon pack={'unknown' as IconPack} iconName='X' />
        </Suspense>
      )
    ).toThrow('Unknown icon pack: unknown');

    (console.error as jest.Mock).mockRestore();
  });

  it('throws for missing icon in known pack', async () => {
    // Reduce noise
    jest.spyOn(console, 'error').mockImplementationOnce(() => {});

    // Re-mock a known pack to not include the icon
    jest.doMock('react-icons/fa', () => ({}));

    const { DynamicIcon: BrokenIcon } = await import('./DynamicIcon');

    let caughtError: Error | null = null;

    render(
      <ErrorBoundary onError={(err) => (caughtError = err)}>
        <Suspense fallback={<span data-testid='fallback' />}>
          <BrokenIcon pack='fa' iconName='NonExistentIcon' />
        </Suspense>
      </ErrorBoundary>
    );

    await waitFor(() => {
      expect(caughtError).toBeTruthy();
      expect(caughtError?.message).toMatch('Icon "NonExistentIcon" not found in pack "fa"');
    });
  });
});
