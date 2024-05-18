import icons from './icons'

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin, FaHeart } = icons

const menuManage = [
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
        id: 2,
        text: 'Quản lý bài đặt',
        path: '/he-thong/quan-ly-bai-dat',
        icon: <MdOutlineLibraryBooks />
    },
    {
        id: 4,
        text: 'Thông tin tài khoản',
        path: '/he-thong/thong-tin-tai-khoan',
        icon: <BiUserPin />
    },
    {
        id: 3,
        text: 'Yêu Thích',
        path: '/yeu-thich',
        icon: <FaHeart />
    },
]

export default menuManage