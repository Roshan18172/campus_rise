const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourmail@gmail.com",
    pass: "your_app_password",
  },
});

const sendOtpEmail = async (email, otp) => {
  await transporter.sendMail({
    from: '"CampusRise" <yourmail@gmail.com>',
    to: email,
    subject: "CampusRise OTP Verification",
    html: `<h3>Your OTP is: <b>${otp}</b></h3>`,
  });
};

module.exports = sendOtpEmail;
