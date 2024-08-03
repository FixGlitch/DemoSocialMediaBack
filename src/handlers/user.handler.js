const jwt = require("jsonwebtoken");
const userController = require("../controllers/user.controller");

const createUserHandler = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await userController.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAllUsersHandler = async (req, res) => {
  try {
    const users = await userController.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUserByIdHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userController.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateUserHandler = async (req, res) => {
  const { userId } = req.params;
  const userData = req.body;
  try {
    const updatedUser = await userController.updateUser(userId, userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteUserHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    await userController.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginUserHandler = async (req, res) => {
  const { full_name, password } = req.body;
  try {
    const { user, token } = await userController.authenticateUser(full_name, password);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const logoutUserHandler = async (req, res) => {
  res.json({ message: "Logout successful" });
};

const checkAuthHandler = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "Authenticated", userId: decoded.userId });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

const errorHandler = (res, error) => {
  console.error(error);
  res.status(500).json({ message: error.message });
};

module.exports = {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
  loginUserHandler,
  logoutUserHandler,
  checkAuthHandler,
};
