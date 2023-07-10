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
    const sql = `SELECT * FROM area WHERE id = ?`;
    const values = [areaId];
    return this.getQuery(sql, values);
  }

  async getActiveWorkersByAreaId({ areaId }) {
    const sql = `
      SELECT * FROM user_data 
      WHERE areaId = ? 
      AND active = ? 
      AND role = ?`;

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
