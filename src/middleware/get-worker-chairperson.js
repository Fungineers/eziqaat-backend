import { roles } from "@/constants";
import db from "@/database";

const getWorkerChairperson = (req, res, next) => {
  const { user } = req;

  if (user.role !== roles.WORKER) {
    next();
  }

  if (!user.area) {
    next();
  }

  const { chairpersonId } = user.area;

  if (!chairpersonId) {
    next();
  }

  db.getUserById({ id: chairpersonId })
    .then((result) => {
      const user = result[0][0];
      if (user) {
        const { areaId, assignedAt, ...rest } = user;
        req.user.area.chairperson = rest;
      } else {
        req.user.area.chairperson = null;
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      next();
    });
};

export default getWorkerChairperson;
