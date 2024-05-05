const user = require("../models/user_model");

checkUserAuth = async (req,res) =>{
    const {username, password}= req.body;
    const body = req.body;

    if (!body){
        return res.status(400).json({
            success: false,
            error: 'username and password are required!',
        })
    }

    user.findOne({ username: username, password: password })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'User is not authorized',
                });
            } else {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User is authorized',
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Internal server error',
                error: err.message
            });
        });
}

registerUser = async (req, res) => {
    // Check if both username and password are present in the request body
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            success: false,
            message: 'Both username and password are required',
        });
    }

    const data = {
        username: req.body.username,
        password: req.body.password
    };

    try {
        // Inserting the user data into the database
        const newUser = await user.create(data);

        // Sending a success response
        return res.status(200).json({
            success: true,
            id: newUser._id,
            message: 'User is registered',
        });
    } catch (error) {
        // Handling any errors that occur during the operation
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

checkServiceRunning = (req,res)=> {
    res.send('User Service running');
}
module.exports= {
    checkUserAuth,
    checkServiceRunning,
    registerUser
}