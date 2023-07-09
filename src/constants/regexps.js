const regexps = {
  phone: /\+92((30|31|32|33|34)\d{1}|355|364)\d{7}/,
  email: /^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,20}$/,
  cnic: /^([0-9]{5})([0-9]{7})([0-9]{1})+/,
  emailOtp: /^[0-9]{4}$/,
  areaName: /^([a-zA-Z\u0080-\u00FF]+(?:\. |-| |\'))*[a-zA-Z\u0080-\u00FF]*$/,
};

export default regexps;
