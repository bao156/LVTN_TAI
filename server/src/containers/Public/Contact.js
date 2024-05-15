import React, { useCallback, useState } from 'react'
import { InputForm, Button } from '../../components'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { path } from '../../ultils/constant'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
    const navigate = useNavigate()
    const { isLoggedIn } = useSelector(state => state.auth)
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } })
    }, [])
    const [payload, setPayload] = useState({
        name: '',
        phone: '',
        content: ''
    })
    // const handleSubmit = () => {
    //     Swal.fire(`Cảm ơn ${payload.name ? payload.name : 'bạn'}`, 'Phản hồi của bạn đã được chúng tôi ghi nhận', 'success').then(() => {
    //         setPayload({
    //             name: '',
    //             phone: '',
    //             content: ''
    //         })

    //     })
    // }
    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                Swal.fire(`Cảm ơn ${payload.name ? payload.name : 'bạn'}`, 'Phản hồi của bạn đã được chúng tôi ghi nhận', 'success').then(() => {
                    setPayload({
                        name: '',
                        phone: '',
                        content: ''
                    });
                });
            } else {
                Swal.fire('Có lỗi xảy ra', 'Vui lòng thử lại sau 1', 'error');
            }
        } catch (error) {
            Swal.fire('Có lỗi xảy ra', 'Vui lòng thử lại sau', 'error');
        }
    };

    return (
        <div className='w-full flex justify-center'>
            {!isLoggedIn && <div className=' w-full flex flex-col gap-4' >

                <h3 className='text-2xl text-red-500'>Bạn phải đăng nhập để liên hệ với chúng tôi!</h3>
                <Button
                    text={'Đăng nhập'}
                    textColor='text-white'
                    bgColor='bg-[#3961fb]'
                    onClick={() => navigate('/login')}
                />

            </div>}
            {isLoggedIn && <div className='w-full'>
                <h1 className='text-2xl font-semibold mb-6'>Liên hệ với chúng tôi</h1>
                <div className='flex gap-4'>
                    <div className='flex-1 flex flex-col gap-4 h-fit bg-red-500 rounded-3xl p-4 text-white bg-gradient-to-br from-sky-500 to-indigo-500'>
                        <h4 className='font-medium'>Thông tin liên hệ</h4>
                        <span>Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn chúng tôi</span>
                        <span>Điện thoại : 0335350913</span>
                        <span>Email : tai127589@gmail.com</span>
                        <span>Zalo : 033535013</span>
                        <span>Địa chỉ : LE-4.07, Tòa nhà Lexington Residence, số 67 Mai Chí Thọ, Phường An Phú, Quận 2, Hồ Chí Minh</span>
                    </div>
                    <div className='flex-1 bg-white shadow-md rounded-md p-4 mb-6'>
                        <h4 className='font-medium text-lg mb-4 '>Liên hệ trực tuyến</h4>
                        <div className='flex flex-col gap-4 '>
                            <InputForm
                                label='HỌ VÀ TÊN CỦA BẠN'
                                value={payload.name}
                                setValue={setPayload}
                                keyPayload='name'
                            />
                            <InputForm
                                label='SỐ ĐIỆN THOẠI'
                                value={payload.phone}
                                setValue={setPayload}
                                keyPayload='phone'
                            />

                            <div>
                                <label htmlFor='desc'>NỘI DUNG MÔ TẢ</label>
                                <textarea
                                    className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full'
                                    value={payload.content}
                                    onChange={e => setPayload(prev => ({ ...prev, content: e.target.value }))}
                                    name='content'
                                    id='desc'
                                    cols="30"
                                    rows='3'></textarea>

                            </div>
                            <Button
                                text='GỬI LIÊN HỆ'
                                bgColor='bg-blue-500'
                                textColor='text-white'
                                fullWidth
                                onClick={handleSubmit}
                            />
                        </div>

                    </div>
                </div>
            </div>}
        </div>

    )
}

export default Contact