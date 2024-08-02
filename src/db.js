require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, SSL } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}${
    SSL ? "?ssl=true" : ""
  }`,
  {
    logging: false,
    native: false,
    dialectOptions: {
      ssl: SSL ? true : false,
    },
  }
);

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "./models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((modelDefiner) => modelDefiner(sequelize, DataTypes));

const entries = Object.entries(sequelize.models);
const capsEntries = entries.map(([key, value]) => [
  key[0].toUpperCase() + key.slice(1),
  value,
]);
sequelize.models = Object.fromEntries(capsEntries);

Object.keys(sequelize.models).forEach((modelName) => {
  if ("associate" in sequelize.models[modelName]) {
    sequelize.models[modelName].associate(sequelize.models);
  }
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
