import transporter from "../config/nodemailer.js";


const sendOtpMail = async (email, otp, name) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your Account OTP",
        html: `
            <div style="font-family:sans-serif;padding:20px">
                <h2>Hello ${name}</h2>
                <p>Your verification OTP is:</p>
                <h1 style="color:blue">${otp}</h1>
                <p>This OTP is valid for 10 minutes.</p>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
};

export default sendOtpMail;