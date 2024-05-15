import React from 'react'
import icons from '../../ultils/icons'



const { FaFacebook, CiTwitter, FaYoutube } = icons
const Footer = () => {
    return (
        <div className='w-full flex flex-row bg-white text-black z-10 shadow-lg'>
            <div className='w-full flex flex-col items-center justify-center mt-4 mb-4 gap-4'>
                <p className='text-lg font-semibold'>CÔNG TY TNHH LBKCORP</p>
                <p>Tổng đài CSKH: 0335350913</p>
                <p>Copyright © 2015 - 2024 Phongtro123.com</p>
                <p>Email: tai127589@gmail.com</p>
                <p>Địa chỉ: LD - 02.06, Toà nhà Lexington Residence, Số 67 Mai Chí Thọ, Phường An Phú, Quận 2, Tp. Hồ Chí Minh</p>
                <p>Giấy phép đăng ký kinh doanh số 0313588502 do Sở kế hoạch và Đầu tư thành phố Hồ Chí Minh cấp ngày 24 tháng 12 năm 2015.</p>
                <div className='flex justify-center items-center gap-3'>
                    <FaFacebook className='size-16 ' color='blue' rounded-max />
                    <CiTwitter className='size-16' />
                    <FaYoutube className='size-16' color='red' />
                </div>
            </div>
        </div>
    )
}

export default Footer