import icons from './icons'

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin,MdOutlineManageAccounts } = icons

const memuSidebar = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <ImPencil2 />
    },
    {
        id: 2,
        text: 'Quản lý tin đăng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <MdOutlineLibraryBooks />
    },
    {
        id: 6,
        text: 'Quản lý người dùng',
        path: '/he-thong/quan-ly-nguoi-dung',
        icon: <MdOutlineManageAccounts />
    },
    {
        id: 4,
        text: 'Sửa thông tin cá nhân',
        path: '/he-thong/thong-tin-tai-khoan',
        icon: <BiUserPin />
    },
    {
        id: 5,
        text: 'Liên hệ',
        path: '/lien-he',
        icon: <BiUserPin />
    }
]
export default memuSidebar