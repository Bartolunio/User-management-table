import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/userSlice";
import { RootState } from "../redux/store";
import { ChangeEvent, FC } from "react";

const Filter: FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.users.filters);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-purple-700">
      <input
        className="bg-green-500"
        type="text"
        name="name"
        placeholder="Filter by name"
        value={filters.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="username"
        placeholder="Filter by username"
        value={filters.username}
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        placeholder="Filter by email"
        value={filters.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Filter by phone"
        value={filters.phone}
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
