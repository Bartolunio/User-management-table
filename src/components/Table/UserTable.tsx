import { FC, useEffect } from 'react';
import FilterSection from './FilterSection';
import TableSection from './TableSection';
import { useDarkMode } from '../DarkMode/DarkModeProvider';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../FilterUsers/filterSlice';
import ThemeToggleButton from '../DarkMode/DarkModeContext';

const UserTable: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div
      className={`w-full rounded-lg p-8 ${
        darkMode ? 'bg-gray-900 text-gray-200' : 'bg-[#f5f5f5] text-gray-900'
      }`}
    >
      <div
        className={`p-4 bg-gradient-to-r ${
          darkMode ? 'from-gray-700 to-gray-600' : 'from-[#d4a373] to-[#a86f4d]'
        } rounded-t-lg`}
      >
        <div className='flex items-center gap-4 font-semibold text-sm text-center'>
          <div className='flex-1'>NAME</div>
          <div className='flex-1'>USERNAME</div>
          <div className='flex-1'>EMAIL</div>
          <div className='flex-1'>PHONE</div>
          <ThemeToggleButton />
        </div>
      </div>
      <FilterSection />
      <TableSection />
    </div>
  );
};

export default UserTable;
