import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchUsers, filterUsers } from "../store/userSlice";
import { User } from "../types/User";

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredUsers, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const [filters, setFilters] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange =
    (field: keyof typeof filters) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFilters = { ...filters, [field]: e.target.value };
      setFilters(newFilters);
      dispatch(filterUsers(newFilters));
    };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {["Name", "Username", "Email", "Phone"].map((header) => (
                    <th
                      key={header}
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                      <input
                        type="text"
                        placeholder={`Search ${header.toLowerCase()}...`}
                        value={
                          filters[header.toLowerCase() as keyof typeof filters]
                        }
                        onChange={handleFilterChange(
                          header.toLowerCase() as keyof typeof filters
                        )}
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user: User) => (
                  <tr key={user.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.name}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.username}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.email}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.phone}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
