import { useMemo } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import PageTab from '../page-tab/PageTab';
import AddFabButton from '../common/add-fab-button/AddFabButton';
import { useAppDispatch, useAppSelector } from '../../store/hookes';
import type { Tab } from '../../types';
import { addTabBetween, setTabs } from '../../store/features/tabs/tabsSlice';
import SortableItem from '../common/shortable-item/ShortableItem';
import { DynamicIcon } from '../common/dynamic-icon/DynamicIcon';

function PageNavigation() {
  const dispatch = useAppDispatch();
  const { tabs } = useAppSelector((state) => state.tabs);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const displayedElements: Tab[] = useMemo(() => {
    return [...tabs, { id: 'add-new-tab', label: 'Add page', type: 'add-page' } as const]
      .flatMap((tab) => [tab, { id: nanoid(), label: '', type: 'add-fab' } as const])
      .slice(0, -1);
  }, [tabs]);

  function addNewTabToIndex(tabId: number) {
    const tab = displayedElements[tabId];
    const idx = tabs.findIndex((t) => t.id === tab.id);
    dispatch(addTabBetween(idx));
  }

  function appendNewTab() {
    dispatch(addTabBetween(tabs.length - 1));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const [activeId, overId] = [active.id, over?.id];

    if (activeId !== overId) {
      const oldIndex = tabs.findIndex((t) => t.id === activeId);
      const newIndex = tabs.findIndex((t) => t.id === overId);
      const reorderedTabs = setTabs(arrayMove(tabs, oldIndex, newIndex));

      dispatch(reorderedTabs);
    }
  }

  return (
    <section className='flex-1 flex-center bg-white'>
      <div className='bg-white flex items-stretch justify-center flex-col md:flex-row p-2.5'>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={displayedElements} strategy={verticalListSortingStrategy}>
            {displayedElements.map((el, idx) => {
              switch (el.type) {
                case 'add-fab':
                  return (
                    <div
                      key={idx}
                      className='group relative m-auto transition-[height] md:transition-[width] duration-300 ease-in-out w-full md:w-[40px] hover:w-[75px] h-[45px] hover:h-[75px] md:h-auto md:hover:h-auto flex-center'
                    >
                      <div className='absolute w-full border border-dashed border-black m-0 rotate-90 md:rotate-none'></div>
                      <div className='z-1 flex-center invisible group-hover:visible'>
                        <AddFabButton onAddClick={() => addNewTabToIndex(idx - 1)} />
                      </div>
                    </div>
                  );
                case 'add-page':
                  return (
                    <button
                      key={idx}
                      type='button'
                      className='z-1 border border-gray-200 bg-white text-gray-900 hover:bg-gray-100 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center inline-flex items-center gap-1.5 cursor-pointer'
                      onClick={appendNewTab}
                    >
                      <DynamicIcon pack='io' iconName='IoIosAdd' size={20} />
                      Add Page
                    </button>
                  );
                default:
                  return (
                    <SortableItem key={el.id} id={el.id}>
                      <PageTab key={idx} {...el} />
                    </SortableItem>
                  );
              }
            })}
          </SortableContext>
        </DndContext>
      </div>
    </section>
  );
}

export default PageNavigation;
