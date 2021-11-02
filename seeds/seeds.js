const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const user of userData) {
    await User.bulkCreate({
      ...user,
    });
  }

  for (const post of postData) {
    await Post.bulkCreate({
      ...post,
    });
  }

  for (const comment of commentData) {
    await Comment.bulkCreate({
      ...comment,
    });
  }

  process.exit(0);
};

seedDatabase();
