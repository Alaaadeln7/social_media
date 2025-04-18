import nodemailer from "nodemailer";

// Generate a 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP verification email
export const sendVerificationEmail = async (email, otpCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  console.log(process.env.EMAIL, process.env.PASSWORD);
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verify Your Email",
    text: `Your OTP code is: ${otpCode}`,
  };

  await transporter.sendMail(mailOptions);
};
