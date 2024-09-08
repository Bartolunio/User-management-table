import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, Search } from 'lucide-react';
import EmptyState from './EmptyState/EmptyState';
import { useDarkMode } from './DarkMode/DarkModeProvider';
import ThemeToggleButton from './DarkMode/DarkModeContext';
import { fetchUsers, resetFilters, setFilter } from '../redux/userSlice';
import { AppDispatch, RootState } from '../redux/store';

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredUsers, filters } = useSelector(
    (state: RootState) => state.users
  );
  const { darkMode } = useDarkMode();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof typeof filters;
    dispatch(setFilter({ key, value: e.target.value }));
  };

  const handleFilterReset = () => {
    dispatch(resetFilters());
  };

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

      <div
        className={`p-4 flex items-center space-x-4 border-b ${
          darkMode ? 'border-gray-700' : 'border-[#e0b89a]'
        }`}
      >
        <button
          onClick={handleFilterReset}
          className={`p-2 ${
            darkMode
              ? 'bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400'
              : 'bg-gradient-to-r from-[#a86f4d] to-[#d4a373] hover:from-[#8d5b3d] hover:to-[#b88e70]'
          } text-white rounded-full transition-all duration-200 shadow-lg hover:shadow-xl`}
        >
          <Filter className='w-5 h-5' />
        </button>
        {Object.entries(filters).map(([key, value]) => (
          <div key={key} className='flex-1'>
            <div className='relative'>
              <input
                type='text'
                name={key}
                placeholder={`Filter by ${key}`}
                value={value}
                onChange={handleFilterChange}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border-2 ${
                  darkMode
                    ? 'border-gray-700 bg-gray-800 text-gray-300 placeholder-gray-500'
                    : 'border-[#d4a373] bg-white text-[#6f4f28] placeholder-[#a86f4d]'
                } focus:ring-2 ${
                  darkMode
                    ? 'focus:ring-gray-600 focus:border-gray-600'
                    : 'focus:ring-[#a86f4d] focus:border-[#a86f4d]'
                } focus:outline-none transition-all duration-200`}
              />
              <Search
                className={`absolute left-3 top-2.5 w-5 h-5 ${
                  darkMode ? 'text-gray-400' : 'text-[#a86f4d]'
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className='overflow-x-auto'>
        <table className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <thead>
            <tr
              className={`text-sm ${
                darkMode
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-[#f5e7d6] text-[#6f4f28]'
              }`}
            >
              <th className='px-6 py-3 text-left'>NAME</th>
              <th className='px-6 py-3 text-left'>USERNAME</th>
              <th className='px-6 py-3 text-left'>EMAIL</th>
              <th className='px-6 py-3 text-left'>PHONE</th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              darkMode ? 'divide-gray-700' : 'divide-[#e0b89a]'
            }`}
          >
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`transition-all duration-300 ${
                    index % 2 === 0
                      ? darkMode
                        ? 'bg-gray-900'
                        : 'bg-[#f5f5f5]'
                      : darkMode
                      ? 'bg-gray-800'
                      : 'bg-white'
                  } ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-[#e0b89a]'}`}
                >
                  <td className='px-6 py-4 text-sm'>{user.name}</td>
                  <td className='px-6 py-4 text-sm'>{user.username}</td>
                  <td className='px-6 py-4 text-sm'>{user.email}</td>
                  <td className='px-6 py-4 text-sm'>{user.phone}</td>
                </tr>
              ))
            ) : (
              <EmptyState />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
