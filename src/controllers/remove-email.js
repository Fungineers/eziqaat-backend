import db from "@/database";

const removeEmail = (req, res) => {
  const { id } = req.user;

  db.removeEmail({ id }).then((results) => {
    const { affectedRows } = results[0];
    if (affectedRows === 0) {
      return res.status(403).json({
        message: "Email already unset",
      });
    }
    res.status(200).json({ message: "Email removed" });
  });
};

export default removeEmail;
