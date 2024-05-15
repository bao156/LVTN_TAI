import axiosConfig from '../axios'

export const apiSendMail = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/send-email',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})