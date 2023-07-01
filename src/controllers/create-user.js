import { roles } from "@/constants";
import db from "@/database";
import { generateRandomString } from "@/utils";

export const authorizeCreateUser = (req, res, next) => {
  const { user } = req;
  if (user) {
    const { role: creatorRole } = user;
    const { role: userRole } = req.body;
    if (
      (creatorRole === roles.GENERAL_SECRETARY &&
        [roles.CHAIRPERSON, roles.OFFICE_SECRETARY].includes(userRole)) ||
      (creatorRole === roles.CHAIRPERSON && userRole === roles.WORKER)
    ) {
      next();
    } else {
      return res.status(401).json({ message: "Access Denied" });
    }
  } else {
    return res.status(401).json({ message: "Access Denied" });
  }
};

const createUser = (req, res) => {
  const { firstName, lastName, email, role, phone, cnic } = req.body;

  const password = generateRandomString();

  console.log(password);

  db.createUser({ firstName, lastName, email, role, phone, cnic, password })
    .then((result) => {
      try {
        const user = result[0][0][0];
        res.status(200).json({
          message: "User created sucessfully",
          user,
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({
          message: "Something went wrong",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        message: error.sqlMessage,
      });
    });
};

export default createUser;
