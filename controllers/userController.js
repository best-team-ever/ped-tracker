const db = require("../models/index");
const users = require("../models").users;

async function getAllUsers(request, result){
  return await users
    .findAll({
        include: [{
          model: db.locations,
          attributes: ["name"],
        }]
      })
    .then(row => result.status(200).send(row))
    .catch(
      error => result.status(400).send(error)
    );
}

async function createUser(request, result){
  return await users
    .create({
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      email: request.body.email,
      p2pe_agreement: request.body.p2pe_agreement,
      language: request.body.language,
      role: request.body.role,
      location_id: request.body.location_id
    })
    .then(row => result.status(201).send(row))
    .catch(error => result.status(400).send(error));
}

async function updateUser(request, result){
  return await users
    .findById(request.params.id)
    .then(data => {
      if (!data) {
        return result.status(404).send({
          message: "no user"
        })
      }
      return data
        .update({
          first_name: request.body.first_name || data.first_name,
          last_name: request.body.last_name || data.last_name,
          email: request.body.email || data.email,
          p2pe_agreement: request.body.p2pe_agreement || data.p2pe_agreement,
          language: request.body.language || data.language,
          role: request.body.role || data.role,
          location_id: request.body.location_id || data.location_id
        })
        .then(() => result.status(200).send(data))
        .catch((error) => result.status(400).send(error));
    })
    .catch((error) => result.status(400).send(error));
}

async function findUserById(request, result){
  return await users
    .findById(request.params.id)
    .then(data => {
      if (!data){
        return result.status(404).send({
          message: "user not found"
        })
      }
      return result.status(200).send(data)
    })
    .catch(error => result.status(400).send(error));
}

async function findUserByEmail(request, result){
  return await users
    .findAll({
      where: {
        email: request
      }})
    .then(data => {
      if (!data){
        return result.status(404).send({
          message: "location not found"
        })
      } else if (data[0].dataValues.role !== "admin" && data[0].dataValues.role !== "cashier") {
        return result.status(403).send({
          message: "Not allowed"
        })
      }
      return result.status(200).send(data)
    })
    .catch(error => result.status(400).send(error));
}

module.exports = {
  getAllUsers: getAllUsers,
  createUser: createUser,
  updateUser: updateUser,
  findUserById: findUserById,
  findUserByEmail: findUserByEmail
}
