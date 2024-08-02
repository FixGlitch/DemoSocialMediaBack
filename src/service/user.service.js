const { User } = require("../db");
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const getAllUsers = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

const getUserById = async (userId) => {
  try {
    return await User.findByPk(userId);
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

const updateUser = async (userId, { username, password }) => {
  try {
    return await User.update(
      { username, password },
      { where: { user_id: userId } }
    );
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

const deleteUser = async (userId) => {
  try {
    return await User.destroy({ where: { user_id: userId } });
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

const findUserByUsername = async (username) => {
  try {
    return await User.findOne({ where: { username } });
  } catch (error) {
    throw new Error(`Error finding user: ${error.message}`);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUserByUsername,
};
