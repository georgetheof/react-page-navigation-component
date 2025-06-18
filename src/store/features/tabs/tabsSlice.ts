import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
import { type Tab } from '../../../types';

export interface TabsState {
  tabs: Tab[];
  activeTabId: string | null;
}

const initialState: TabsState = {
  tabs: [
    { id: nanoid(), label: 'Info', iconPack: 'io', iconName: 'IoIosInformationCircleOutline' },
    { id: nanoid(), label: 'Details', iconPack: 'cg', iconName: 'CgNotes' },
    { id: nanoid(), label: 'Ending', iconPack: 'fa', iconName: 'FaRegCheckCircle' },
  ],
  activeTabId: null,
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTabId = action.payload;
    },
    setTabs: (state, action: PayloadAction<Tab[]>) => {
      state.tabs = action.payload;
    },
    addTabBetween: (state, action: PayloadAction<number>) => {
      const newTab: Tab = { id: nanoid(), label: `Tab ${state.tabs.length + 1}` };
      state.tabs.splice(action.payload + 1, 0, newTab);
    },
    removeTab: (state, action: PayloadAction<string>) => {
      state.tabs = state.tabs.filter((tab) => tab.id !== action.payload);
      if (state.activeTabId === action.payload) {
        state.activeTabId = null;
      }
    },
  },
});

export const { setActiveTab, setTabs, addTabBetween, removeTab } = tabsSlice.actions;
export default tabsSlice.reducer;
