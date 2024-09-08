import { ChangeEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import { setFilter } from '../../redux/userSlice';
import { RootState } from '../../redux/store';

const Filter: FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.users.filters);

  const handleInputChange =
    (key: keyof typeof filters) => (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setFilter({ key, value: e.target.value }));
    };

  const filterFields = [
    { key: 'name', placeholder: 'Filter by name', type: 'text' },
    { key: 'username', placeholder: 'Filter by username', type: 'text' },
    { key: 'email', placeholder: 'Filter by email', type: 'email' },
    { key: 'phone', placeholder: 'Filter by phone', type: 'text' },
  ];

  return (
    <div className='grid grid-cols-4 gap-4 mb-6 w-full max-w-4xl mx-auto'>
      {filterFields.map(({ key, placeholder, type }) => (
        <div key={key} className='relative'>
          <input
            type={type}
            name={key}
            placeholder={placeholder}
            value={filters[key]}
            onChange={handleInputChange(key)}
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
          />
          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500'>
            <Search className='w-5 h-5' />
          </span>
        </div>
      ))}
    </div>
  );
};

export default Filter;
