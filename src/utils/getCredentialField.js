import { regexps } from "@/constants";

const getCredentialField = (credential) => {
  const field = regexps.email.test(credential)
    ? "email"
    : regexps.cnic.test(credential)
    ? "cnic"
    : regexps.phone.test(credential)
    ? "phone"
    : null;
  return field;
};

export default getCredentialField;
