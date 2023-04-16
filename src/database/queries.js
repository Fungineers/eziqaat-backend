export const createUser = ({
  firstName,
  lastName,
  email,
  role,
  phone,
  cnic,
  password,
}) => {
  const query = `
    SET @id := REPLACE(UUID(), "-", "");
    SET @createdAt := UTC_TIMESTAMP();
    SET @active := FALSE;
    INSERT INTO user (id, firstName, lastName, email, role, phone, cnic, password, active, createdAt)
      VALUES (@id, ?, ?, ?, ?, ?, ?, ?, @active, @createdAt);
    SELECT * FROM userdata
      WHERE id = @id;
  `;
  const params = [firstName, lastName, email, role, phone, cnic, password];
  return { query, params };
};

export const authenticateUser = ({ email, password }) => {
  const query = `
    SELECT 
      id, firstName, lastName, email, role, phone, cnic, active
      FROM user
      WHERE 
        email = ?
      AND
        password = SHA1(UNHEX(SHA1(?)));
  `;
  const params = [email, password];
  return { query, params };
};

export const getUserById = ({ id }) => {
  const query = `
    SELECT * 
      FROM userdata 
      WHERE id = ?
  `;
  const params = [id];
  return { query, params };
};

export const createArea = ({ name }) => {
  const query = `
    SET @id := REPLACE(UUID(), "-", "");
    SET @createdAt := UTC_TIMESTAMP();
    INSERT INTO area(id, name, createdAt)
      VALUES(@id, ?, @createdAt);
    SELECT 
      @id AS id,
      ? AS name,
      @createdAt AS createdAt;
  `;
  const params = [name, name];
  return { query, params };
};

export const updateArea = ({ id, name }) => {
  const query = `
    UPDATE area 
      SET name = ? 
      WHERE id = ?; 
    SELECT * 
      FROM area 
      WHERE id = ?;`;
  const params = [name, id, id];
  return { query, params };
};

export const deleteArea = ({ id }) => {
  const query = `
    DELETE FROM area
      WHERE id = ?
  `;
  const params = [id];
  return { query, params };
};

export const getAreas = ({ limit, offset }) => {
  const query = `
    SELECT * FROM area
      ORDER BY name ASC
      LIMIT ? OFFSET ?;
  `;
  const params = [limit, offset];
  return { query, params };
};

export const getAreaById = ({ id }) => {
  const query = `
    SELECT * FROM area
      WHERE id = ?;
  `;
  const params = [id];
  return { query, params };
};

export const assignAreaToChairperson = ({ areaId, chairpersonId }) => {
  const query = `
    SET @id := REPLACE(UUID(), "-", "");
    SET @createdAt := UTC_TIMESTAMP();
    INSERT INTO areachairperson (id, areaId, chairpersonId, createdAt)
      VALUES(@id, ?, ?, @createdAt);
    SELECT * FROM areawithchairperson
      WHERE id = @id;
  `;
  const params = [areaId, chairpersonId];
  return { query, params };
};
