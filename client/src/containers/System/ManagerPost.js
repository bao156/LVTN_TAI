import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, updatePost, deletePost } from "../../store/actions";
import { Button } from "../../components";
const formatDate = "DD/MM/YYYY";
const ManagerPost = () => {
  const dispatch = useDispatch();
  const { posts = [], loading, error } = useSelector((state) => state.post);
  const [status, setStatus] = useState();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleUpdatePost = (id, data) => {
    dispatch(updatePost(data, id));
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium ">Quản lý tin đăng</h1>
        <select
          onChange={(e) => setStatus(+e.target.value)}
          value={status}
          className="outline-none border p-2 boder-gray-300 rounded-md"
        >
          <option value="0">Lọc theo trạng thái</option>
          <option value="1">Đang hoạt động</option>
          <option value="2">Đã hết hạn</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {JSON.stringify(error)}</p>
      ) : posts.length > 0 ? (
        <table className="w-full table-auto">
          <thead>
            <tr className="flex w-full bg-gray-100">
              <th className="border flex-1 p-2">Mã tin</th>
              <th className="border flex-1 p-2">Ảnh đại diện</th>
              <th className="border flex-1 p-2">Tiêu đề</th>
              <th className="border flex-1 p-2">Giá</th>
              <th className="border flex-1 p-2">Ngày bắt đầu</th>
              <th className="border flex-1 p-2">Ngày hết hạn</th>
              <th className="border flex-1 p-2">Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onUpdate={handleUpdatePost}
                onDelete={handleDeletePost}
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

const PostItem = ({ post, onUpdate, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [postData, setPostData] = useState({ ...post });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "acreage" ||
      name === "price" ||
      name === "image" ||
      name === "created" ||
      name === "expired"
    ) {
      setPostData((prevState) => ({
        ...prevState,
        attributes: {
          ...prevState.attributes,
          [name]: value,
        },
        overviews: {
          ...prevState.overviews,
          [name]: value,
        },
        images: {
          ...prevState.images,
          [name]: value,
        },
      }));
    } else {
      setPostData({ ...postData, [name]: value });
    }
  };

  return (
    <tr className="flex items-center h-16">
      {editMode ? (
        <>
          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <input
              type="text"
              name="code"
              className="border-2 text-center"
              value={postData.overviews.code}
              onChange={handleInputChange}
            />
          </td>

          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <input
              type="text"
              name="images"
              className="border-2 text-center"
              value={postData.images.image}
              onChange={handleInputChange}
            />
          </td>
          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <input
              type="text"
              name="title"
              value={postData.title}
              className="border-2 text-center"
              onChange={handleInputChange}
            />
          </td>
          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <input
              type="text"
              name="price"
              className="border-2 text-center"
              value={postData.attributes.price}
              onChange={handleInputChange}
            />
          </td>
          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <input
              type="text"
              name="created"
              className="border-2 text-center"
              value={postData.overviews.created}
              onChange={handleInputChange}
            />
          </td>
          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <input
              type="text"
              name="expired"
              className="border-2 text-center"
              value={postData.overviews.expired}
              onChange={handleInputChange}
            />
          </td>
        </>
      ) : (
        <>
          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <p> {post.overviews.code}</p>
          </td>
          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <img
              src={JSON.parse(post.images.image)[0] || ""}
              alt="avatar-post"
              className="w-10 h-10 object-cover rounded-md"
            />
          </td>
          <td className="border px-2 flex-1 h-full flex justify-center items-center ">
            <p className="truncate ">{post.title}</p>
          </td>
          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <p> {post.attributes.price}</p>
          </td>
          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <p> {post.overviews.created}</p>
          </td>
          <td className="border px-2 flex-1 h-full flex justify-center items-center">
            <p> {post.overviews.expired}</p>
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
              onUpdate(post.id, postData);
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
              onClick={() => onDelete(post.id)}
            />
          </>
        )}
      </td>
    </tr>
  );
};

export default ManagerPost;
