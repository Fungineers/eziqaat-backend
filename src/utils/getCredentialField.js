import { regexps } from "@/constants";

/**
 * Matches the pattern of credential,
 * and returns the name of field
 * @param {string} credential
 * @returns {"email" | "cnic" | "password" | null}
 */
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
