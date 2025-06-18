import type { Key } from 'react';
import type { IconPack, Tab } from '../../types';
import { DynamicIcon } from '../common/dynamic-icon/DynamicIcon';
import { useAppDispatch, useAppSelector } from '../../store/hookes';
import { setActiveTab } from '../../store/features/tabs/tabsSlice';
import PageTabSettings from '../page-tab-settings/PageTabSettings';

interface PageTabProps extends Tab {
  key?: Key;
  iconPack?: IconPack;
  iconName?: string;
  cursorClass?: string;
  withSettings?: boolean;
}

function PageTab({
  id,
  label,
  iconPack = 'ci',
  iconName = 'CiViewList',
  withSettings = true,
}: PageTabProps) {
  const dispatch = useAppDispatch();
  const { activeTabId } = useAppSelector((state) => state.tabs);

  function onTabClick() {
    dispatch(setActiveTab(id));
  }

  return (
    <button
      type='button'
      className={
        (activeTabId === id ? ' border border-gray-200 bg-white text-gray-900 cursor-default ' : ' bg-gray-100 text-gray-500 cursor-pointer ') +
        ' z-1 relative hover:bg-gray-100 focus:bg-white focus:ring-1 focus:outline-none focus:ring-black-100 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center inline-flex items-center gap-1.5'
      }
      onClick={onTabClick}
    >
      <DynamicIcon pack={iconPack} iconName={iconName} size={20} color={activeTabId === id ? 'orange' : ''} />
      {label}
      {withSettings && (
        <span className={activeTabId === id ? 'flex' : 'hidden' + ' cursor-pointer'}>
          <PageTabSettings />
        </span>
      )}
    </button>
  );
}

export default PageTab;
