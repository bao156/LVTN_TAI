import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getPostsReservations,
  savePostReservation,
  deleteFavoritePostsByPostId,
} from "../../services/postReservation";
import Button from "@mui/material/Button";

const ManagerPostReservation = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("0");
  const [isFetched, setIsFetched] = useState(false);
  useEffect(() => {
    const fetchData = () => {
      if (posts?.length === 0) {
        getPostsReservations().then((posts) => {
          setPosts(posts.data);
        });
      }
    };
    fetchData();
  }, []);

  const handleSelectDropdown = (value) => {
    setStatus(value);
  };
  const handleApproving = async (userId, postId) => {
    let isConfirmed = false;
    let isDenied = false;
    await Swal.fire({
      title: "Bạn có chắc muốn duyệt bài đăng không?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        isConfirmed = true;
      } else if (result.isDenied) {
        isDenied = true;
      }
    });
    if (isConfirmed) {
      await savePostReservation({ userId, postId, isApproved: true });
      await Swal.fire("Đã duyệt thành công!", "", "success");
    }
    if (isDenied) {
      await deleteFavoritePostsByPostId({ postId, userId });
      await Swal.fire("Đã hủy thành công!", "", "success");
    }
    const reservation = await getPostsReservations();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium ">Quản lý bài đặt</h1>
        <select
          onChange={(e) => handleSelectDropdown(e.target.value)}
          value={status}
          className="outline-none border p-2 boder-gray-300 rounded-md"
        >
          <option value="0">Chưa duyệt</option>
          <option value="1">Đã duyệt</option>
          <option value="2">Tất cả</option>
        </select>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="flex w-full bg-gray-100">
            <th className="border flex-1 p-2">Mã tin</th>
            <th className="border flex-1 p-2">Tiêu đề</th>
            <th className="border flex-1 p-2">Người đặt</th>
            <th className="border flex-1 p-2">Trạng thái</th>
            <th className="border flex-1 p-2"></th>
          </tr>
        </thead>
        <tbody>
          {posts?.length > 0 &&
            posts
              .filter((post) => {
                if (status !== "2") {
                  return post.isApproved === Number(status);
                } else return post;
              })
              .map((item) => {
                return (
                  <tr
                    className="flex items-center h-16"
                    key={item.id}
                    style={{ height: "110px" }}
                  >
                    <td className="border px-2 flex-1 h-full flex justify-center items-center">
                      {item?.post?.id}{" "}
                    </td>
                    <td className="border px-2 flex-1 h-full flex justify-center items-center">
                      {item?.post?.title}
                    </td>
                    <td className="border px-2 flex-1 h-full flex justify-center items-center">
                      {item?.user?.name}
                    </td>
                    <td className="border px-2 flex-1 h-full flex justify-center items-center">
                      {item?.isApproved == 1 ? "Đã duyệt" : "Chưa Duyệt"}
                    </td>
                    <td className="border px-2 flex-1 h-full flex justify-center items-center flex items-center justify-center gap-4">
                      <button
                        disabled={item?.isApproved == 1}
                        style={{
                          backgroundColor:
                            item?.isApproved == 1 ? "gray" : "rgb(22 163 74)",
                          padding: "10px",
                          borderRadius: "5px",
                          color: "white",
                        }}
                        onClick={async () => {
                          handleApproving(item?.user?.id, item?.post?.id);
                        }}
                      >
                        Duyệt Bài
                      </button>
                      <Button></Button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerPostReservation;
