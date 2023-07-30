const { roles } = require("../constants");
const db = require("../database");

/**
 * This function takes a user object, typically of roles in
 * ```WORKER``` or ```CHAIRPERSON```, and returns, if any,
 * the assoicated area object, else ```null```
 * @param {object} user The user object
 * @returns {object | null} The area object
 */
const getUserArea = async (user) => {
  const { role } = user;
  if (role === roles.CHAIRPERSON) {
    const { id } = user;
    return db.getChairpersonArea({ id });
  } else if (role === roles.WORKER) {
    const { areaId } = user;
    if (!areaId) {
      return null;
    }
    return await db.getWorkerArea({ areaId });
  } else {
    return null;
  }
};

module.exports = getUserArea;
