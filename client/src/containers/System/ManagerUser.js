import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components";
import {
  fetchUsers,
  updateUser,
  deleteUser,
} from "../../store/actions/user.js";
const ManagerUser = () => {
  const dispatch = useDispatch();
  const { users = [], loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUpdateUser = (id, data) => {
    dispatch(updateUser(id, data));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium ">Quản lý người dùng</h1>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {JSON.stringify(error)}</p>
      ) : users.length > 0 ? (
        <table className="w-full table-auto">
          <thead>
            <tr className="flex w-full bg-gray-100">
              <th className="border flex-1 p-2">Họ tên</th>
              <th className="border flex-1 p-2">Số điện thoại</th>
              <th className="border flex-1 p-2">Zalo</th>
              <th className="border flex-1 p-2">Quản trị viên</th>
              <th className="border flex-1 p-2">Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                onUpdate={handleUpdateUser}
                onDelete={handleDeleteUser}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

const UserItem = ({ user, onUpdate, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUserData({ ...userData, [name]: checked });
  };

  return (
    <tr className="flex items-center h-16">
      {editMode ? (
        <>
          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <input
              type="text"
              name="name"
              className="border-2 text-center"
              value={userData.name}
              onChange={handleInputChange}
            />
          </td>

          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <input
              type="text"
              name="phone"
              className="border-2 text-center"
              value={userData.phone}
              onChange={handleInputChange}
            />
          </td>
          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <input
              type="text"
              name="zalo"
              className="border-2 text-center"
              value={userData.zalo}
              onChange={handleInputChange}
            />
          </td>
          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <input
              type="checkbox"
              name="isAdmin"
              className="border-2 text-center"
              checked={userData.isAdmin}
              onChange={handleCheckboxChange}
            />
          </td>
        </>
      ) : (
        <>
          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <p>{user.name}</p>
          </td>
          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <p> {user.phone}</p>
          </td>
          <td className="border px-2 flex-1 h-full flex justify-center items-center ">
            <p> {user.zalo}</p>
          </td>
          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <p>{user.isAdmin ? "Yes" : "No"}</p>
          </td>
        </>
      )}

      <td className="border px-2 flex-1 h-full flex justify-center items-center flex items-center justify-center gap-4">
        {editMode ? (
          <Button
            bgColor="bg-blue-600"
            text="Lưu"
            textColor="text-white"
            onClick={() => {
              onUpdate(user.id, userData);
              setEditMode(false);
            }}
          ></Button>
        ) : (
          <>
            <Button
              text="Sửa"
              bgColor="bg-green-600"
              textColor="text-white"
              onClick={() => setEditMode(true)}
            />
            <Button
              text="Xóa"
              bgColor="bg-red-600"
              textColor="text-white"
              onClick={() => onDelete(user.id)}
            />
          </>
        )}
      </td>
    </tr>
  );
};

export default ManagerUser;
