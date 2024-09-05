import { useDispatch } from 'react-redux';
import UserTable from './components/UserTable';
import Filter from './components/Filter';
import { FC, useEffect } from 'react';
import { fetchUsers } from './redux/userSlice';

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <Filter />
      <UserTable />
    </div>
  );
};

export default App;
