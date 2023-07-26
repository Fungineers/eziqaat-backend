import { roles } from "@/constants";
import db from "@/database";

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

export default getUserArea;
