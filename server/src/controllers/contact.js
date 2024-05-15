// import * as contactService from '../services/emailService'

// export const sendMailController = async (req, res) => {
//     try {
//         const response = await contactService.transporter()
//         return res.status(200).json(response)

//     } catch (error) {
//         return res.status(500).json({
//             err: -1,
//             msg: 'Failed at contact controller: ' + error
//         })
//     }
// }