// const nodemailer = require('nodemailer')
// const dotenv = require('dotenv');
// dotenv.config()
// var inlineBase64 = require('nodemailer-plugin-inline-base64');

// const sendEmailCreateOrder = async (phone) => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 25,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: process.env.MAIL_ACCOUNT, // generated ethereal user
//       pass: process.env.MAIL_PASSWORD, // generated ethereal password
//     },
//   });
//   transporter.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));

 

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from:phone , // sender address
//     to: process.env.MAIL_ACCOUNT, // list of receivers
//     subject: "Bạn đã đặt hàng tại shop Laptop và Phụ kiện", // Subject line
//     text: "Hello world?", // plain text body
//     html: `<div><b>Bạn đã đặt hàng thành công tại shop Laptop và Phụ kiện</b></div> `,
//     attachments: attachImage,
//   });
// }

// module.exports = {
//   sendEmailCreateOrder
// }