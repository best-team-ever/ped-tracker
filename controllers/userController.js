const users = require("../models").users;

async function getAllUsers(request, result){
  return await users
    .findAll()
    .then(row => result.status(200).send(row))
    .catch(
      error => result.status(400).send(error)
    );
}

async function createUser(request, result){
  return await users
    .create({
      first_name: request.body.first_name,
      name: request.body.name,
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
          message: "no location"
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
          message: "location not found"
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
  findUserById: findUserById
}
