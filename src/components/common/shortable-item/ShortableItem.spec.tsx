import { render, screen } from '@testing-library/react';
import type { UniqueIdentifier } from '@dnd-kit/core';
import SortableItem from './ShortableItem';

jest.mock('@dnd-kit/sortable', () => ({
  useSortable: jest.fn(() => ({
    attributes: { 'data-testid': 'sortable-attributes' },
    listeners: { onPointerDown: jest.fn() },
    setNodeRef: jest.fn(),
    transform: { x: 10, y: 20 },
    transition: 'transform 200ms ease',
  })),
}));

jest.mock('@dnd-kit/utilities', () => ({
  CSS: {
    Transform: {
      toString: jest.fn(() => 'translate(10px, 20px)'),
    },
  },
}));

describe('SortableItem', () => {
  it('renders children and applies sortable props', () => {
    render(
      <SortableItem id={'item-1' as UniqueIdentifier}>
        <div data-testid='child'>Child Content</div>
      </SortableItem>
    );

    const wrapper = screen.getByTestId('child').parentElement!;
    expect(wrapper).toHaveStyle('transform: translate(10px, 20px)');
    expect(wrapper).toHaveStyle('transition: transform 200ms ease');
    expect(wrapper).toHaveAttribute('data-testid', 'sortable-attributes');
  });
});
