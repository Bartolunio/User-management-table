import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FC } from 'react';
import EmptyState from '../EmptyState/EmptyState';
import { useDarkMode } from '../DarkMode/DarkModeProvider';

const TableSection: FC = () => {
  const { filteredUsers } = useSelector((state: RootState) => state.users);
  const { darkMode } = useDarkMode();

  return (
    <div className='overflow-x-auto'>
      <table className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <thead>
          <tr
            className={`text-sm ${
              darkMode
                ? 'bg-gray-700 text-gray-300'
                : 'bg-[#f5e7d6] text-[#6f4f28]'
            }`}
          ></tr>
        </thead>
        <tbody
          className={`divide-y ${
            darkMode ? 'divide-gray-700' : 'divide-[#e0b89a]'
          }`}
        >
          {filteredUsers.length > 0 ? (
            filteredUsers.map(({ id, name, username, email, phone }, index) => (
              <tr
                key={id}
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
                <td className='px-6 py-4 text-sm'>{name}</td>
                <td className='px-6 py-4 text-sm'>{username}</td>
                <td className='px-6 py-4 text-sm'>{email}</td>
                <td className='px-6 py-4 text-sm'>{phone}</td>
              </tr>
            ))
          ) : (
            <EmptyState />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableSection;
