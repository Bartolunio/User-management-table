import { FC } from 'react';
import { Frown } from 'lucide-react';
import './animations.css';
import { useDarkMode } from '../DarkMode/DarkModeProvider';

const EmptyState: FC = () => {
  const { darkMode } = useDarkMode();

  return (
    <tr>
      <td
        colSpan={4}
        className={`px-6 py-24 text-center ${
          darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'
        }`}
      >
        <div
          className={`flex flex-col items-center justify-center ${
            darkMode ? 'text-gray-200' : 'text-gray-900'
          }`}
        >
          <Frown
            className={`w-16 h-16 mb-4 ${
              darkMode ? 'text-gray-400' : 'text-[#d4a373]'
            } bounce`}
          />
          <p className='text-xl font-medium'>No results</p>
        </div>
      </td>
    </tr>
  );
};

export default EmptyState;
