import { Filter, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { resetFilters, setFilter } from '../FilterUsers/filterSlice';
import { ChangeEvent, FC } from 'react';

const FilterSection: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.users.filters);
  const darkMode = useSelector((state: RootState) => state.users.darkMode);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof typeof filters;
    dispatch(setFilter({ key, value: e.target.value }));
  };

  const handleFilterReset = () => {
    dispatch(resetFilters());
  };

  return (
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
  );
};

export default FilterSection;
