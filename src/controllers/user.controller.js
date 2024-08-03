const userService = require("../service/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (userData) => {
  try {
    const { password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    userData.password = hashedPassword;
    return await userService.createUser(userData);
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const getAllUsers = async () => {
  try {
    return await userService.getAllUsers();
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

const getUserById = async (userId) => {
  try {
    return await userService.getUserById(userId);
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

const updateUser = async (userId, { full_name, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [updated] = await userService.updateUser(userId, {
      full_name,
      password: hashedPassword,
    });
    if (updated === 0) {
      throw new Error("User not found or not updated");
    }
    return await userService.getUserById(userId);
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

const deleteUser = async (userId) => {
  try {
    await userService.deleteUser(userId);
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

const authenticateUser = async (full_name, password) => {
  try {
    const user = await userService.findUserByUsername(full_name);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid username or password");
    }
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return { user, token };
  } catch (error) {
    throw new Error(`Error authenticating user: ${error.message}`);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  authenticateUser,
};
