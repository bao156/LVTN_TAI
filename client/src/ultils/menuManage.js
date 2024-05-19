import icons from './icons'

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin, FaHeart, MdOutlineManageAccounts, MdManageAccounts  } = icons

const menuManage = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <ImPencil2 />,
        isAdmin: 0
    },
    {
        id: 3,
        text: 'Quản lý tin đăng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <MdOutlineLibraryBooks />,
        isAdmin: 1
    },
    {
        id: 4,
        text: 'Quản lý bài đặt',
        path: '/he-thong/quan-ly-bai-dat',
        icon: <MdOutlineLibraryBooks />,
        isAdmin: 1
    },
    {
        id: 5,
        text: 'Quản lý người dùng',
        path: '/he-thong/quan-ly-nguoi-dung',
        icon: <MdOutlineManageAccounts />,
        isAdmin: 1
    },
    {
        id: 6,
        text: 'Thông tin tài khoản',
        path: '/he-thong/thong-tin-tai-khoan',
        icon: <BiUserPin />,
        isAdmin: 0
    },
    {
        id: 7,
        text: 'Yêu Thích',
        path: '/yeu-thich',
        icon: <FaHeart />,
        isAdmin: 0
    },
 ]

export default menuManage