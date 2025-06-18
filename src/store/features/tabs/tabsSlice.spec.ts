import reducer, { setActiveTab, setTabs, addTabBetween, removeTab, type TabsState } from './tabsSlice';
import type { Tab } from '../../../types';

describe('tabsSlice reducer', () => {
  const initialState: TabsState = {
    tabs: [
      { id: '1', label: 'Info', iconPack: 'io', iconName: 'IoIosInformationCircleOutline' },
      { id: '2', label: 'Details', iconPack: 'cg', iconName: 'CgNotes' },
      { id: '3', label: 'Ending', iconPack: 'fa', iconName: 'FaRegCheckCircle' },
    ],
    activeTabId: null,
  };

  it('should return the initial state when passed an empty action', () => {
    expect(reducer(undefined, { type: '' })).toMatchObject({
      tabs: expect.any(Array),
      activeTabId: null,
    });
  });

  it('should handle setActiveTab', () => {
    const nextState = reducer(initialState, setActiveTab('2'));
    expect(nextState.activeTabId).toBe('2');
  });

  it('should handle setTabs', () => {
    const newTabs: Tab[] = [
      { id: 'a', label: 'A' },
      { id: 'b', label: 'B' },
    ];
    const nextState = reducer(initialState, setTabs(newTabs));
    expect(nextState.tabs).toEqual(newTabs);
  });

  it('should handle addTabBetween', () => {
    const prevState = { ...initialState };
    const nextState = reducer(prevState, addTabBetween(0));

    // The new tab should be inserted after index 0
    expect(nextState.tabs.length).toBe(prevState.tabs.length + 1);
    expect(nextState.tabs[1].label).toBe(`Tab ${prevState.tabs.length + 1}`);
  });

  it('should handle removeTab and clear activeTabId if removed', () => {
    // Set activeTabId to '2'
    const stateWithActive = { ...initialState, activeTabId: '2' };
    const nextState = reducer(stateWithActive, removeTab('2'));

    // Tab with id '2' should be removed
    expect(nextState.tabs.find((tab) => tab.id === '2')).toBeUndefined();
    // activeTabId should be cleared
    expect(nextState.activeTabId).toBeNull();
  });

  it('should handle removeTab without affecting activeTabId if different', () => {
    // Set activeTabId to '1'
    const stateWithActive = { ...initialState, activeTabId: '1' };
    const nextState = reducer(stateWithActive, removeTab('2'));

    // Tab with id '2' should be removed
    expect(nextState.tabs.find((tab) => tab.id === '2')).toBeUndefined();
    // activeTabId remains unchanged since removed tab id !== activeTabId
    expect(nextState.activeTabId).toBe('1');
  });
});
