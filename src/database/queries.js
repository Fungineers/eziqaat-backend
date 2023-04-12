/**
 * @interface
 * @param {{
 *  firstName: string;
 *  lastName: string;
 *  email: string;
 *  role: string;
 *  phone: string;
 *  cnic: string;
 *  password: string;
 * }} params
 * @returns {{
 *  query: string;
 *  params: any[]
 * }}
 */
export const createUser = (params) => {
  const { firstName, lastName, email, role, phone, cnic, password } = params;
  return {
    query: `
      CALL createUser(?, ?, ?, ?, ?, ?, ?, @id, @active, @createdAt); 
      SELECT 
        @id AS id, 
        @active as active, 
        @createdAt AS createdAt;
    `,
    params: [
      firstName,
      lastName,
      email,
      role,
      phone,
      cnic,
      password,
      "@id",
      "@active",
      "@createdAt",
    ],
  };
};
