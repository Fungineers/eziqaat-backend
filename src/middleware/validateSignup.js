import { regexps } from "@/constants";

const validateSignup = (req, res, next) => {
  const { firstName, lastName, email, cnic, phone } = req.body;
  const errors = {};
  if (!firstName) {
    errors.firstName = "First name is required";
  }
  if (!lastName) {
    errors.lastName = "Last name is required";
  }
  if (!!email && !regexps.email.test(email)) {
    errors.email = "Email is not valid";
  }
  if (!phone) {
    errors.phone = "Phone is required";
  } else if (!regexps.phone.test(phone)) {
    errors.phone = "Invalid phone";
  }
  if (!cnic) {
    errors.cnic = "CNIC is required";
  } else if (!regexps.cnic.test(cnic)) {
    errors.cnic = "Invalid CNIC";
  }
  const isValid = !Object.keys(errors).length;
  if (isValid) {
    next();
  } else {
    res.status(400).json({
      message: "Couldn't create user",
      errors,
    });
  }
};

export default validateSignup;
