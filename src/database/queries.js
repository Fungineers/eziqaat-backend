export const createUser = ({
  firstName,
  lastName,
  email,
  role,
  phone,
  cnic,
  password,
}) => {
  const query = `CALL createUser(?, ?, ?, ?, ?, ?, ?)`;
  const params = [firstName, lastName, email, role, phone, cnic, password];
  return { query, params };
};

export const authenticateUser = ({ email, password }) => {
  const query = `CALL authenticateUser(?, ?)`;
  const params = [email, password];
  return { query, params };
};

export const getUserById = ({ id }) => {
  const query = `SELECT * FROM userdata WHERE id = ?`;
  const params = [id];
  return { query, params };
};

export const createArea = ({ name }) => {
  const query = `CALL createArea(?)`;
  const params = [name];
  return { query, params };
};
