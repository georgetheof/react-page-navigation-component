import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tabsReducer from '../store/features/tabs/tabsSlice';
import { render } from '@testing-library/react';
import type { RootState } from '../store/store';

export function renderWithStore(ui: React.ReactElement, preloadedState: RootState = { tabs: { tabs: [], activeTabId: null } }) {
  const store = configureStore({
    reducer: { tabs: tabsReducer },
    preloadedState,
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
