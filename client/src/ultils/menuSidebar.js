import icons from './icons'

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin,MdOutlineManageAccounts } = icons

const memuSidebar = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <ImPencil2 />,
        isAdmin: 0
    },
    {
        id: 2,
        text: 'Quản lý tin đăng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <MdOutlineLibraryBooks />,
        isAdmin: 1
    },
    {
        id: 3,
        text: 'Quản lý bài đặt',
        path: '/he-thong/quan-ly-bai-dat',
        icon: <MdOutlineManageAccounts />,
        isAdmin: 1
    },
    {
        id: 6,
        text: 'Quản lý người dùng',
        path: '/he-thong/quan-ly-nguoi-dung',
        icon: <MdOutlineManageAccounts />,
        isAdmin: 1
    },
    {
        id: 4,
        text: 'Sửa thông tin cá nhân',
        path: '/he-thong/thong-tin-tai-khoan',
        icon: <BiUserPin />,
        isAdmin: 0
    },
    {
        id: 5,
        text: 'Liên hệ',
        path: '/lien-he',
        icon: <BiUserPin />,
        isAdmin: 0
    }
]
export default memuSidebar