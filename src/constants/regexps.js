const regexps = {
  phone: /\+92((30|31|32|33|34)\d{1}|355|364)\d{7}/g,
  email: /^\S+@\S+\.\S+$/g,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,20}$/g,
};

export default regexps;
