import getEnv from "@/config/get-env";
import { roles } from "@/constants";
import { createConnection } from "mysql2/promise";

/**
 * A class that handles the db connection, and provides
 * client calls as methods
 */
class DB {
  constructor() {
    this.connection = createConnection({
      host: getEnv("MYSQL_HOST"),
      port: getEnv("MYSQL_PORT"),
      user: getEnv("MYSQL_USER"),
      password: getEnv("MYSQL_PASS"),
      database: getEnv("MYSQL_DB"),
      multipleStatements: true,
    });
  }

  /**
   * Test the database connection
   */
  async connect() {
    const connection = await this.connection;
    const { host, port, user, database } = connection.config;
    connection
      .connect()
      .then(() => {
        console.log(
          `⚡ Connect to DB "${database}" via user "${user}" on ${host}:${port}`
        );
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * A base method for providing db client query call
   * @param {string} sql
   * @param {string[]} values
   * @returns
   */
  async getQuery(sql, values) {
    const connection = await this.connection;
    return connection.query(sql, values);
  }

  /**
   * Client call for creating new user
   * @param {{
   *   firstName: string,
   *   lastName: string,
   *   email: string,
   *   role: string,
   *   phone: string,
   *   cnic: string,
   *   password: string,
   *   emailOTP: string,
   * }} param0
   * @returns
   */
  async createUser({
    firstName,
    lastName,
    email,
    role,
    phone,
    cnic,
    password,
    emailOTP,
  }) {
    const sql = `CALL CREATE_USER(?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      firstName,
      lastName,
      email,
      role,
      phone,
      cnic,
      password,
      emailOTP,
    ];
    return this.getQuery(sql, values);
  }

  async createWorker({
    chairpersonId,
    firstName,
    lastName,
    email,
    phone,
    cnic,
    password,
    emailOTP,
  }) {
    const sql = `CALL CREATE_WORKER(?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      chairpersonId,
      firstName,
      lastName,
      email,
      phone,
      cnic,
      password,
      emailOTP,
    ];
    return this.getQuery(sql, values);
  }

  async verifyCredentials({ credential, password, platform }) {
    const sql = `CALL VERIFY_CREDENTIALS(?, ?, ?)`;
    const values = [credential, password, platform];
    return this.getQuery(sql, values);
  }

  async getUserById({ id }) {
    const sql = `SELECT * FROM user_data WHERE id = ?`;
    const values = [id];
    return this.getQuery(sql, values);
  }

  async changeEmail({ id, email, emailOtp }) {
    const sql = `CALL CHANGE_EMAIL(?, ?, ?)`;
    const values = [id, email, emailOtp];
    return this.getQuery(sql, values);
  }

  async verifyEmail({ id, emailOtp }) {
    const sql = `CALL VERIFY_EMAIL(?, ?)`;
    const values = [id, emailOtp];
    return this.getQuery(sql, values);
  }

  async removeEmail({ id }) {
    const sql = `CALL REMOVE_EMAIL(?)`;
    const values = [id];
    return this.getQuery(sql, values);
  }

  async changePassword({ id, currentPassword, newPassword }) {
    const sql = `CALL CHANGE_PASSWORD(?, ?, ?)`;
    const values = [id, currentPassword, newPassword];
    return this.getQuery(sql, values);
  }

  async resetPassword({ credential, password }) {
    const sql = `CALL RESET_PASSWORD(?, ?)`;
    const values = [credential, password];
    return this.getQuery(sql, values);
  }

  async changePhone({ id, phone }) {
    const sql = `CALL CHANGE_PHONE(?, ?)`;
    const values = [id, phone];
    return this.getQuery(sql, values);
  }

  async createArea({ areaName }) {
    const sql = `CALL CREATE_AREA(?)`;
    const values = [areaName];
    return this.getQuery(sql, values);
  }

  async changeAreaName({ id, areaName }) {
    const sql = `CALL CHANGE_AREA_NAME(?, ?)`;
    const values = [id, areaName];
    return this.getQuery(sql, values);
  }

  async deleteArea({ id }) {
    const sql = `CALL DELETE_AREA(?)`;
    const values = [id];
    return this.getQuery(sql, values);
  }

  async assignAreaToChairperson({ areaId, chairpersonId }) {
    const sql = `CALL ASSIGN_AREA_TO_CHAIRPERSON(?, ?)`;
    const values = [areaId, chairpersonId];
    return this.getQuery(sql, values);
  }

  async unassignAreaFromChairperson({ areaId }) {
    const sql = `CALL UNASSIGN_AREA_FROM_CHAIRPERSON(?)`;
    const values = [areaId];
    return this.getQuery(sql, values);
  }

  async donorDonationRequest({ donorId, areaId, amount, address }) {
    const sql = `CALL DONOR_DONATION_REQUEST(?, ?, ?, ?)`;
    const values = [donorId, areaId, amount, address];
    return this.getQuery(sql, values);
  }

  async approveDonationRequest({ donationId }) {
    const sql = `CALL APPROVE_DONATION_REQUEST(?)`;
    const values = [donationId];
    return this.getQuery(sql, values);
  }

  async addPendingDonation({ donorId, areaId, amount, address }) {
    const sql = `CALL ADD_PENDING_DONATION(?, ?, ?, ?)`;
    const values = [donorId, areaId, amount, address];
    return this.getQuery(sql, values);
  }

  async addPendingDonationUnregistered({ refName, address, phone, amount }) {
    const sql = `CALL ADD_PENDING_DONATION_UNREGISTERED(?, ?, ?, ?)`;
    const values = [refName, address, phone, amount];
    return this.getQuery(sql, values);
  }

  async acceptPendingDonation({ donationId, workerId }) {
    const sql = `CALL ACCEPT_PENDING_DONATION(?, ?)`;
    const values = [donationId, workerId];
    return this.getQuery(sql, values);
  }

  async collectAcceptedDonation({ donationId }) {
    const sql = `CALL COLLECT_ACCEPTED_DONATION(?)`;
    const values = [donationId];
    return this.getQuery(sql, values);
  }

  async addNewCollection({ donorId, areaId, amount, address }) {
    const sql = `CALL ADD_NEW_COLLECTION(?, ?, ?, ?)`;
    const values = [donorId, areaId, amount, address];
    return this.getQuery(sql, values);
  }

  async getChairpersonArea({ id }) {
    const sql = `SELECT * FROM area WHERE chairpersonId = ?`;
    const values = [id];
    return this.getQuery(sql, values);
  }

  async getWorkerArea({ areaId }) {
    const sql = `
      SELECT * 
      FROM area 
      WHERE id = ?
    `;
    const values = [areaId];
    return this.getQuery(sql, values);
  }

  async getActiveWorkersByAreaId({ areaId, search = "" }) {
    const sql = `
      SELECT * 
      FROM user_data 
      WHERE areaId = ? 
      AND active = ? 
      AND role = ?
      AND (
        CONCAT(firstName, " ", lastName) 
          LIKE "%${search}%"
        OR phone LIKE "%${search}%"
        OR cnic LIKE "%${search}%"
        OR email LIKE "%${search}%"
      )
      ORDER BY 
        active DESC, 
        createdAt ASC;
    `;

    const values = [areaId, true, roles.WORKER];
    return this.getQuery(sql, values);
  }

  async getInActiveWorkersByAreaId({ areaId }) {
    const sql = `
      SELECT * FROM user_data 
      WHERE areaId = ? 
      AND active = ? 
      AND role = ?`;

    const values = [areaId, false, roles.WORKER];
    return this.getQuery(sql, values);
  }

  async getWorkerDetails({ workerId }) {
    const sql = `
      
    `;
  }

  async getRequestedDonations({ areaId }) {
    const sql = `
      SELECT * FROM requested_donations 
      WHERE areaId = ? 
      AND active = ?
    `;

    const values = [areaId, true];
    return this.getQuery(sql, values);
  }

  async getAreas() {
    const sql = `
      SELECT * FROM area
      WHERE active = ?
    `;
    const values = [true];
    return this.getQuery(sql, values);
  }

  async getDonorRequests({ donorId }) {
    const sql = `
      SELECT * FROM donor_requests
      WHERE donorId = ?
    `;
    const values = [donorId];
    return this.getQuery(sql, values);
  }

  async getDonorStats({ donorId }) {
    const sql = `
      SELECT COUNT(id) AS collectionCount FROM donation WHERE status = ? AND donorId = ?;
      SELECT SUM(amount) AS totalCashFlow FROM donation WHERE status = ? AND donorId = ?;
      SELECT COUNT(id) AS requestCount FROM donation WHERE status != ? AND donorId = ?;
    `;
    const values = [
      "COLLECTED",
      donorId,
      "COLLECTED",
      donorId,
      "REQUESTED",
      donorId,
    ];
    return this.getQuery(sql, values);
  }

  async getAreaStats({ areaId }) {
    const sql = `
      SELECT COUNT(id) 
      AS collectionCount 
      FROM donation 
      WHERE status = ? 
      AND areaId = ?;
      
      SELECT SUM(amount) 
      AS totalCashFlow 
      FROM donation 
      WHERE status = ? 
      AND areaId = ?;
      
      SELECT COUNT(id) 
      AS requestCount 
      FROM donation 
      WHERE status != ? 
      AND areaId = ?;
    `;
    const values = [
      "COLLECTED",
      areaId,
      "COLLECTED",
      areaId,
      "COLLECTED",
      areaId,
    ];
    return this.getQuery(sql, values);
  }

  async getAreaDailyStats({ areaId }) {
    const todayDate = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);

    const today = todayDate.toISOString().split("T")[0];
    const tomorrow = tomorrowDate.toISOString().split("T")[0];
    console.log(tomorrow);

    const sql = `
      SELECT COUNT(id) 
      AS collectionCount 
      FROM donation 
      WHERE status = ? 
      AND areaId = ?
      AND collectedAt BETWEEN ? AND ?;
      
      SELECT SUM(amount) 
      AS totalCashFlow 
      FROM donation 
      WHERE status = ? 
      AND areaId = ?
      AND collectedAt BETWEEN ? AND ?;
      
      SELECT COUNT(id) 
      AS requestCount 
      FROM donation 
      WHERE status != ? 
      AND areaId = ?
      AND requestedAt BETWEEN ? AND ?;
    `;
    const values = [
      "COLLECTED",
      areaId,
      today,
      tomorrow,
      "COLLECTED",
      areaId,
      today,
      tomorrow,
      "COLLECTED",
      areaId,
      today,
      tomorrow,
    ];
    return this.getQuery(sql, values);
  }

  async getAreaRequestedDonations({ areaId, search }) {
    const sql = `
      SELECT * FROM requested_donations 
      WHERE areaId = ? 
      AND (
        CONCAT(firstName, " ", lastName) 
          LIKE "%${search}%"
        OR phone LIKE "%${search}%"
        OR cnic LIKE "%${search}%"
        OR email LIKE "%${search}%"
      )
      AND active = ?
      ORDER BY createdAt DESC
    `;
    const values = [areaId, true];
    return this.getQuery(sql, values);
  }

  async getAreaRequestStats({ areaId }) {
    const sql = `
      SELECT 
        COUNT(id) AS requestCount, 
        SUM(amount) AS requestTotal 
      FROM requested_donations 
      WHERE areaId = ? 
      AND (
        CONCAT(firstName, " ", lastName) 
          LIKE "%${search}%"
        OR phone LIKE "%${search}%"
        OR cnic LIKE "%${search}%"
        OR email LIKE "%${search}%"
      )
      AND active = ?
    `;
    const values = [areaId, true];
    return this.getQuery(sql, values);
  }

  async getAreaPendingDonations({ areaId, search }) {
    const sql = `
      SELECT * FROM pending_donations 
      WHERE areaId = ? 
      AND (
        CONCAT(firstName, " ", lastName) 
          LIKE "%${search}%"
        OR phone LIKE "%${search}%"
        OR cnic LIKE "%${search}%"
        OR email LIKE "%${search}%"
      )
      AND active = ?
      ORDER BY createdAt DESC
    `;
    const values = [areaId, true];
    return this.getQuery(sql, values);
  }

  async getWorkerAcceptedDonations({ workerId, search }) {
    const sql = `
      SELECT * FROM accepted_donations 
      WHERE workerId = ? 
      AND (
        CONCAT(firstName, " ", lastName) 
          LIKE "%${search}%"
        OR phone LIKE "%${search}%"
        OR cnic LIKE "%${search}%"
        OR email LIKE "%${search}%"
      )
      AND active = ?
      ORDER BY createdAt DESC
    `;
    const values = [workerId, true];
    return this.getQuery(sql, values);
  }

  async getWorkerCollectedDonations({ workerId, search }) {
    const sql = `
      SELECT * FROM collected_donations 
      WHERE workerId = ? 
      AND (
        CONCAT(firstName, " ", lastName) 
          LIKE "%${search}%"
        OR phone LIKE "%${search}%"
        OR cnic LIKE "%${search}%"
        OR email LIKE "%${search}%"
      )
      AND active = ?
      ORDER BY createdAt DESC
    `;
    const values = [workerId, true];
    return this.getQuery(sql, values);
  }

  async getAreaPendingStats({ areaId }) {
    const sql = `
      SELECT 
        COUNT(id) AS pendingCount, 
        SUM(amount) AS pendingTotal 
      FROM pending_donations 
      WHERE areaId = ? 
      AND (
        CONCAT(firstName, " ", lastName) 
          LIKE "%${search}%"
        OR phone LIKE "%${search}%"
        OR cnic LIKE "%${search}%"
        OR email LIKE "%${search}%"
      )
      AND active = ?
    `;
    const values = [areaId, true];
    return this.getQuery(sql, values);
  }

  async getDonationInfo({ donationId }) {
    const sql = `
      SELECT *
      FROM donation_info
      WHERE id = ?
      LIMIT 1
    `;
    const values = [donationId];
    return this.getQuery(sql, values);
  }

  async getWorkerStats({ workerId, areaId }) {
    const sql = `
      SELECT COUNT(id) 
      AS collectionCount 
      FROM donation 
      WHERE status = ? 
      AND workerId = ?;
      
      SELECT SUM(amount) 
      AS totalCashFlow 
      FROM donation 
      WHERE status = ? 
      AND workerId = ?;
      
      SELECT COUNT(id) 
      AS inProgress 
      FROM donation 
      WHERE status != ? 
      AND workerId = ?;

      SELECT COUNT(id) 
      AS pending 
      FROM donation 
      WHERE status = ? 
      AND areaId = ?;
    `;

    const values = [
      "COLLECTED",
      workerId,
      "COLLECTED",
      workerId,
      "COLLECTED",
      workerId,
      "PENDING",
      areaId,
    ];
    return this.getQuery(sql, values);
  }

  async searchUniqueDonor({ search }) {
    const sql = `
      SELECT * 
      FROM user_data
      WHERE (
        LOWER(email) LIKE "%${search}%"
        OR phone LIKE "%${search}%"
        OR cnic LIKE "%${search}%"
      )
      AND role = ?
      LIMIT 1;
    `;
    const values = [roles.DONOR];
    return this.getQuery(sql, values);
  }
}

class DBSingleton {
  static db;
  /**
   * Get the reference to single DB client instance
   * @returns {DB}
   */
  static getDb() {
    if (!this.db) {
      this.db = new DB();
    }
    return this.db;
  }
}

const db = DBSingleton.getDb();

export default db;
