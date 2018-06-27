const userController = require("./userController");

function googleLogin(request, result, tokenId){
  return fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`)
    .then((response) => response.json())
    // .then((data) => {
    //   if (data.aud === process.env.REACT_APP_API_USER) {
    //     return userController.findUserByEmail(data.email, result)
    //   } else {
    //     return "Bad token"
    //   }
    // })
    // .catch((error) => {console.warn("Error server: ", error)})
}

module.exports = {
  googleLogin: googleLogin
}