let express = require('express');
let log4js = require("log4js");
let usersService = require('../services/users.service');

const logger = log4js.getLogger("Users Controller");

module.exports = {
    createUser : createUser,
    updateUser : updateUser,
    getUserDetails : getUserDetails,
    listUsers : listUsers
};

function createUser(req, res) {
  let userDetails = req.body;
  logger.debug("Inside createUser ",userDetails);
  usersService.createUser(userDetails, (err, result) => {
    if(err) {
      logger.error("Create User : "+err);
      res.status(500).send(err);
    } else {
      logger.debug("Success create User : "+result);
      res.status(200).send(result);
    }
  });
}

function updateUser(req, res) {
  let userId = req.params.userId;
  let userDetails = req.body;
  logger.debug("Inside updateUser ",userDetails);
  usersService.updateUser(userId, userDetails, (err, result) => {
    if(err) {
      logger.error("Update User : ",err);
      res.status(500).send(err);
    } else {
      logger.debug("Success update User : ",result);
      res.status(200).send(result);
    }
  });
}

function getUserDetails(req, res) {
  let userId = req.params.userId;
  logger.info("Inside get user details : ",userId);
  usersService.getUserDetails(userId, (err, result) => {
    if(err) {
      logger.error("fetch User : ",err);
      res.status(500).send(err);
    } else {
      logger.info("Success fetching User : ",result);
      res.status(200).send(result);
    }
  });
}

function listUsers(req, res) {
  logger.debug("Inside List Users");
  usersService.listUsers((err, result) => {
    if(err) {
      logger.error("List Users : ",err);
      res.status(500).send(err);
    } else {
      logger.debug("Success List Users : "+result.length);
      res.status(200).send(result);
    }
  });
}