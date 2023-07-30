const db = require("../database");
const { sendRequestOtpEmail } = require("../email");
const { generateRandomOTP } = require("../utils");

module.exports.getEmailOtp = (req, res) => {
  const { id, email } = req.user;
  const emailOtp = generateRandomOTP();
  db.requestOtp({ id, emailOtp })
    .then((result) => {
      const { affectedRows } = result[0];
      console.log(result[0]);
      if (affectedRows === 0) {
        return res.status(400).json({ message: "User not found" });
      }
      sendRequestOtpEmail({ to: email, context: { otp: emailOtp } });
      res.status(200).json({ message: "OTP sent successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: err.sqlMessage });
    });
};
