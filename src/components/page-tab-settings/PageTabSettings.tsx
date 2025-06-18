import { useState, useRef, useEffect } from 'react';
import { DynamicIcon } from '../common/dynamic-icon/DynamicIcon';
import type { Tab } from '../../types';
import { useAppDispatch } from '../../store/hookes';
import { moveTabToFirstPlace, removeTab } from '../../store/features/tabs/tabsSlice';

function PageTabSettings({ id }: Pick<Tab, 'id'>) {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as unknown as Node)) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='inline-block' ref={popoverRef}>
      <span
        data-testid='popover-trigger'
        data-popover-target='popover-click'
        data-popover-trigger='click'
        className='cursor-pointer'
        onClick={() => setVisible((prev) => !prev)}
      >
        <DynamicIcon pack='bs' iconName='BsThreeDotsVertical' size={14} />
      </span>

      <div
        data-popover
        id='popover-click'
        role='tooltip'
        className={`absolute left-0 top-[-245px] z-10 w-64 text-sm bg-white cursor-default border border-gray-200 rounded-lg shadow-md transition-opacity duration-200 
        ${visible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        {/* Header */}
        <div className='text-left px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg'>
          <h3 className='font-semibold text-gray-900'>Settings</h3>
        </div>

        {/* Body */}
        <ul className='py-1'>
          <li
            className='w-full flex items-center justify-start gap-1.5 px-3 py-2 cursor-pointer hover:bg-gray-50'
            onClick={() => dispatch(moveTabToFirstPlace(id))}
          >
            <DynamicIcon pack='io' iconName='IoIosFlag' color='blue' size={18} /> Set as first page
          </li>

          <li className='w-full flex items-center justify-start gap-1.5 px-3 py-2 cursor-pointer hover:bg-gray-50'>
            <DynamicIcon pack='lu' iconName='LuPenLine' size={18} color='gray' /> Rename
          </li>

          <li className='w-full flex items-center justify-start gap-1.5 px-3 py-2 cursor-pointer hover:bg-gray-50'>
            <DynamicIcon pack='lu' iconName='LuClipboard' size={18} color='gray' /> Copy
          </li>

          <li className='w-full flex items-center justify-start gap-1.5 px-3 py-2 cursor-pointer hover:bg-gray-50'>
            <DynamicIcon pack='pi' iconName='PiCopyLight' size={18} color='gray' /> Duplicate
          </li>

          <hr className='text-gray-200 mx-3 my-1' />

          <li
            className='w-full flex items-center justify-start gap-1.5 px-3 py-2  cursor-pointer text-red-600 hover:bg-gray-50'
            onClick={() => dispatch(removeTab(id))}
          >
            <DynamicIcon pack='lu' iconName='LuTrash2' size={18} color='red' /> Delete
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PageTabSettings;
