
module.exports = {
    createUser : createUser,
    loginUser : loginUser
};

function createUser(req, res, next) {
    let email = req.body.email;
    if(email && email !== '') {
        next();
    } else {
        res.send({"message" : "Required field/s missing."});
    }
}

