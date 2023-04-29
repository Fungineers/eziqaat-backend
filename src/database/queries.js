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
    INSERT INTO user (id, firstName, lastName, email, role, phone, cnic, password, createdAt)
      VALUES (@id, ?, ?, ?, ?, ?, ?, SHA1(UNHEX(SHA1(?))), @createdAt);
    SELECT * FROM userdata
      WHERE id = @id;
  `;
  const params = [firstName, lastName, email, role, phone, cnic, password];
  return { query, params };
};

export const authenticateUser = ({ credential, password, field }) => {
  const query = `
    SELECT 
      id, firstName, lastName, email, role, phone, cnic
      FROM user
      WHERE 
        ${field} = ?
      AND
        password = SHA1(UNHEX(SHA1(?)));
  `;
  const params = [credential, password];
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

export const unassignAreaToChairperson = ({ areaId, chairpersonId }) => {
  const query = `
    SET @removedAt := UTC_TIMESTAMP();
    UPDATE areachairperson 
      SET removedAt = @removedAt
      WHERE areaId = ?
      AND chairpersonId = ?
      AND removedAt is NULL;
    `;
  const params = [areaId, chairpersonId];
  return { query, params };
};

export const getUnassignedAreas = ({ limit, offset }) => {
  const query = `
    SELECT a.* FROM areachairperson AS ac 
      INNER JOIN area AS a 
      ON a.id = ac.areaId 
      WHERE removedAt is NULL
      LIMIT ? OFFSET ?
  `;
  const params = [limit, offset];
  return { query, params };
};

export const getAreasWithChairperson = ({ limit, offset }) => {
  const query = `
    SELECT * FROM areawithchairperson
      WHERE removedAt IS NULL
      ORDER BY areaName ASC
      LIMIT ? OFFSET ?
  `;
  const params = [limit, offset];
  return { query, params };
};

export const addPendingDonation = ({
  amount,
  address,
  donorId,
  chairpersonId,
}) => {
  const query = `
    SET @id = REPLACE(UUID(), "-", "");
    SET @createdAt = UTC_TIMESTAMP();
    SELECT areaId 
      FROM areachairperson 
      WHERE chairpersonId = ? 
      LIMIT 1 
      INTO @areaId;
    INSERT 
      INTO donation (id, amount, address, status, areaId, donorId, createdAt)
      VALUES (@id, ?, ?, "pending", @areaId, ?,  @createdAt);
    SELECT * 
      FROM donation
      WHERE id = @id;
  `;
  const params = [chairpersonId, amount, address, donorId];
  return { query, params };
};
