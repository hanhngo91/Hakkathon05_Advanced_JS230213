const checkIsEmpty = (field) => {
  if (field === undefined || field === null || field === "") {
    return true;
  } else {
    return false;
  }
};

const validateData = (req, res, next) => {
  const { Content, DueDate, Task_Status, AssignedTo } = req.body;
  if (
    checkIsEmpty(Content) ||
    checkIsEmpty(DueDate) ||
    checkIsEmpty(Task_Status) ||
    checkIsEmpty(AssignedTo)
  ) {
    return res.status(500).json({
      message: "Please fill in all fields",
      error: err,
    });
  }
  next();
};

module.exports = validateData;
