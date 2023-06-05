const sequelize = require("../config/connection");
const { User } = require("../models");
const userData = require("./userData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log("\n----- DATABASE SEEDED -----\n");
  } catch (err) {
    console.log("\n----- DATABASE SEEDING ERROR -----\n");
    console.log(err);
  } finally {
    sequelize.close();
  }
};

seedDatabase();
