import { DynamicIcon } from '../dynamic-icon/DynamicIcon';

interface AddFabButtonProps {
  size?: number;
  onAddClick: () => void;
}

function AddFabButton({ onAddClick, size = 16 }: AddFabButtonProps) {
  return (
    <button
      data-testid='add-fab-button'
      type='button'
      className='cursor-pointer text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-full text-sm p-0.5 text-center inline-flex items-center gap-1 dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200'
      onClick={onAddClick}
    >
      <DynamicIcon pack='io' iconName='IoIosAdd' size={size} />
    </button>
  );
}

export default AddFabButton;
