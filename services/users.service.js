let log4js = require("log4js");
let usersDao = require('../dao/users.dao');
const logger = log4js.getLogger("Users Service");
logger.debug("Users Service Initiated");

module.exports = {
    createUser : createUser,
    updateUser : updateUser,
    getUserDetails : getUserDetails,
    listUsers : listUsers
};

async function createUser(userDetails, callback) {
  logger.info('Initiated create User ',userDetails);
  let newUserDetails = await usersDao.insertOne(userDetails);
  if(newUserDetails && newUserDetails._id) {
    logger.debug('User created successfully : '+newUserDetails._id);
    callback(null, newUserDetails);
  } else {
    logger.error('Failed to create user : ',newUserDetails);
    callback(newUserDetails, null);
  }
}

async function updateUser(userId, userDetails, callback) {
  logger.info('Initiated update User ',userId);
  let updateUserDetails = { $set : userDetails };
  let newUserDetails = await usersDao.findOneAndUpdate({ _id : userId }, updateUserDetails);
  if(newUserDetails && newUserDetails._id) {
    logger.debug('User updated successfully : '+newUserDetails._id);
    callback(null, newUserDetails);
  } else {
    logger.error('Failed to update user : ',newUserDetails);
    callback(newUserDetails, null);
  }
}

async function getUserDetails(userId, callback) {
  logger.info('Initiated get User details : ',userId);
  let userDetails = await usersDao.findOne({ _id : userId });
  if(userDetails && userDetails._id) {
    logger.info('User fetched successfully : '+userDetails._id);
    callback(null, userDetails);
  } else {
    logger.error('Failed to fetch user details : ',userDetails);
    callback(userDetails, null);
  }
}

async function listUsers(callback) {
  logger.debug('Initiated List all Users');
  let allUsers = await usersDao.find({});
  if(allUsers && allUsers.length > -1) {
    logger.debug('User list fetched successfully : '+allUsers.length);
    callback(null, allUsers);
  } else {
    logger.error('Failed to fetch all users : ');
    logger.error(allUsers);
    callback(allUsers, null);
  }
}
