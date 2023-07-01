import { validationResult } from "express-validator";

const validateBody = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

  return next();
};

export default validateBody;
