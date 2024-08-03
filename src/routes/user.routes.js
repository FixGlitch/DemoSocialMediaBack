const express = require("express");
const userRouter = express.Router();
const userHandler = require("../handlers/user.handler");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserPostData:
 *       type: object
 *       properties:
 *         full_name:
 *           type: string
 *           description: The username of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *       required:
 *         - full_name
 *         - password
 */

/**
 * @swagger
 * /sm-backend/user:
 *   post:
 *     summary: Create user
 *     description: Creates a new user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPostData'
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPostData'
 *       500:
 *         description: Internal server error.
 */
userRouter.post("/", userHandler.createUserHandler);

/**
 * @swagger
 * /sm-backend/user:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserPostData'
 *       500:
 *         description: Internal server error.
 */
userRouter.get("/", userHandler.getAllUsersHandler);

/**
 * @swagger
 * /sm-backend/user/{userId}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieves a user by its ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user to retrieve
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPostData'
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.get("/:userId", userHandler.getUserByIdHandler);

/**
 * @swagger
 * /sm-backend/user/{userId}:
 *   put:
 *     summary: Update user
 *     description: Updates an existing user.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPostData'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPostData'
 *       500:
 *         description: Internal server error.
 */
userRouter.put("/:userId", userHandler.updateUserHandler);

/**
 * @swagger
 * /sm-backend/user/{userId}:
 *   delete:
 *     summary: Delete user
 *     description: Deletes an existing user by its ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       500:
 *         description: Internal server error.
 */
userRouter.delete("/:userId", userHandler.deleteUserHandler);

/**
 * @swagger
 * /sm-backend/user/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPostData'
 *     responses:
 *       200:
 *         description: Login successful and token provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for the user.
 *       401:
 *         description: Invalid username or password.
 *       500:
 *         description: Internal server error.
 */
userRouter.post("/login", userHandler.loginUserHandler);

/**
 * @swagger
 * /sm-backend/user/logout:
 *   post:
 *     summary: User logout
 *     description: Logs out a user by invalidating their JWT token.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Logout successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout successful
 *       500:
 *         description: Internal server error.
 */
userRouter.post("/logout", userHandler.logoutUserHandler);

/**
 * @swagger
 * /sm-backend/user/auth-check:
 *   get:
 *     summary: Check authentication
 *     description: Checks if the user is authenticated using JWT.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authenticated
 *       401:
 *         description: Not authenticated.
 *       500:
 *         description: Internal server error.
 */
userRouter.get("/auth-check", userHandler.checkAuthHandler);

module.exports = userRouter;
