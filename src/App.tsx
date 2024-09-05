import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import UserTable from "./components/UserTable";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>User Management</h1>
        <UserTable />
      </div>
    </Provider>
  );
};

export default App;
