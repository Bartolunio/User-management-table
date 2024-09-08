import { Provider } from 'react-redux';
import UserTable from './components/UserTable';
import { DarkModeProvider } from './components/DarkMode/DarkModeProvider';
import store from './redux/store';
import { FC } from 'react';

const App: FC = () => {
  return (
    <DarkModeProvider>
      <Provider store={store}>
        <UserTable />
      </Provider>
    </DarkModeProvider>
  );
};

export default App;
