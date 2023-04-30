export const createUser = ({
  firstName,
  lastName,
  email,
  role,
  phone,
  cnic,
  password,
}) => {
  const sql = `
    SET @id := REPLACE(UUID(), "-", "");
    SET @createdAt := UTC_TIMESTAMP();
    INSERT INTO user (id, firstName, lastName, email, role, phone, cnic, password, createdAt)
      VALUES (@id, ?, ?, ?, ?, ?, ?, SHA1(UNHEX(SHA1(?))), @createdAt);
    SELECT * FROM userdata
      WHERE id = @id;
  `;
  const params = [firstName, lastName, email, role, phone, cnic, password];
  return { sql, params };
};

export const createWorker = ({
  firstName,
  lastName,
  email,
  role,
  phone,
  cnic,
  password,
  chairpersonId,
}) => {
  const sql = `
    START TRANSACTION;
    SELECT areaId 
      FROM areachairperson
      WHERE chairpersonId = ?
      AND removedAt IS NULL
      LIMIT 1
      INTO @areaId;
    SET @id := REPLACE(UUID(), "-", "");
    SET @createdAt := UTC_TIMESTAMP();
    INSERT INTO user (id, firstName, lastName, email, role, phone, cnic, password, createdAt)
      VALUES (@id, ?, ?, ?, ?, ?, ?, SHA1(UNHEX(SHA1(?))), @createdAt);
    SET @areaworkerId := REPLACE(UUID(), "-", "");
    SET @createdAt := UTC_TIMESTAMP();
    INSERT INTO areaworker (id, areaId, workerId, createdAt)
      VALUES(@areaworkerId, @areaId, @id, @createdAt);
    SELECT * FROM userdata
      WHERE id = @id;
  `;
  const params = [
    chairpersonId,
    firstName,
    lastName,
    email,
    role,
    phone,
    cnic,
    password,
  ];
  return { sql, params };
};

export const updatePassword = ({ id, password }) => {
  const sql = `
    UPDATE user
      SET password = SHA1(UNHEX(SHA1(?)))
      WHERE id = ?;
  `;
  const params = [password, id];
  return { sql, params };
};

export const resetPassword = ({ credential, password, field }) => {
  const sql = `
    UPDATE user
      SET password = SHA1(UNHEX(SHA1(?)))
      WHERE ${field} = ?;
  `;
  const params = [password, credential];
  return { sql, params };
};

export const authenticateUser = ({ credential, password, field }) => {
  const sql = `
    SELECT 
      id, firstName, lastName, email, role, phone, cnic
      FROM user
      WHERE 
        ${field} = ?
      AND
        password = SHA1(UNHEX(SHA1(?)));
  `;
  const params = [credential, password];
  return { sql, params };
};

export const getUserById = ({ id }) => {
  const sql = `
    SELECT * 
      FROM userdata 
      WHERE id = ?
  `;
  const params = [id];
  return { sql, params };
};

export const createArea = ({ name }) => {
  const sql = `
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
  return { sql, params };
};

export const updateArea = ({ id, name }) => {
  const sql = `
    UPDATE area 
      SET name = ? 
      WHERE id = ?; 
    SELECT * 
      FROM area 
      WHERE id = ?;`;
  const params = [name, id, id];
  return { sql, params };
};

export const deleteArea = ({ id }) => {
  const sql = `
    DELETE FROM area
      WHERE id = ?
  `;
  const params = [id];
  return { sql, params };
};

export const getAreas = ({ limit, offset }) => {
  const sql = `
    SELECT * FROM area
      ORDER BY name ASC
      LIMIT ? OFFSET ?;
  `;
  const params = [limit, offset];
  return { sql, params };
};

export const getAreaById = ({ id }) => {
  const sql = `
    SELECT * FROM area
      WHERE id = ?;
  `;
  const params = [id];
  return { sql, params };
};

export const assignAreaToChairperson = ({ areaId, chairpersonId }) => {
  const sql = `
    SET @id := REPLACE(UUID(), "-", "");
    SET @createdAt := UTC_TIMESTAMP();
    INSERT INTO areachairperson (id, areaId, chairpersonId, createdAt)
      VALUES(@id, ?, ?, @createdAt);
    SELECT * FROM areawithchairperson
      WHERE id = @id;
  `;
  const params = [areaId, chairpersonId];
  return { sql, params };
};

export const unassignAreaToChairperson = ({ areaId, chairpersonId }) => {
  const sql = `
    SET @removedAt := UTC_TIMESTAMP();
    UPDATE areachairperson 
      SET removedAt = @removedAt
      WHERE areaId = ?
      AND chairpersonId = ?
      AND removedAt is NULL;
    `;
  const params = [areaId, chairpersonId];
  return { sql, params };
};

export const getUnassignedAreas = ({ limit, offset }) => {
  const sql = `
    SELECT a.* FROM areachairperson AS ac 
      INNER JOIN area AS a 
      ON a.id = ac.areaId 
      WHERE removedAt is NULL
      LIMIT ? OFFSET ?
  `;
  const params = [limit, offset];
  return { sql, params };
};

export const getAreasWithChairperson = ({ limit, offset }) => {
  const sql = `
    SELECT * FROM areawithchairperson
      WHERE removedAt IS NULL
      ORDER BY areaName ASC
      LIMIT ? OFFSET ?
  `;
  const params = [limit, offset];
  return { sql, params };
};

export const getWorkersByChairperson = ({ chairpersonId }) => {
  const sql = `
  SELECT areaId 
    FROM areachairperson 
    WHERE chairpersonId = ? 
    AND removedAt IS NULL 
    LIMIT 1 
    INTO @areaId;
  SELECT w.*
    FROM userdata AS w
    INNER JOIN areaworker AS aw
    ON aw.workerId = w.id
    WHERE aw.areaId = @areaId;
  `;
  const params = [chairpersonId];
  return { sql, params };
};

export const addPendingDonation = ({
  amount,
  address,
  donorId,
  chairpersonId,
}) => {
  const sql = `
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
  return { sql, params };
};

export const requestDonation = ({ areaId, amount, address, donorId }) => {
  const sql = `
    SET @id = REPLACE(UUID(), "-", "");
    SET @createdAt = UTC_TIMESTAMP();
    INSERT 
      INTO donation (id, amount, address, status, areaId, donorId, createdAt)
      VALUES (@id, ?, ?, "REQUESTED", ?, ?,  @createdAt);
    SELECT * 
      FROM donation
      WHERE id = @id;
  `;
  const params = [amount, address, areaId, donorId];
  return { sql, params };
};

export const approveDonation = ({ donationId, chairpersonId }) => {
  const sql = `
    SELECT areaId
      FROM donation
      WHERE id = ?
      AND status = "REQUESTED"
      LIMIT 1
      INTO @areaId;
    SELECT TRUE
      FROM areachairperson
      WHERE areaId = @areaId
      AND chairpersonId = ?
      AND removedAt IS NULL
      LIMIT 1
      INTO @isAdmin;
    UPDATE donation
      SET status = "PENDING"
      WHERE id = ?
      AND @isAdmin = TRUE;
  `;
  const params = [donationId, chairpersonId, donationId];
  return { sql, params };
};
