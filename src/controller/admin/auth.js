const User = require('../../models/user');
const jwt = require("jsonwebtoken"); //json web token used to make tokens via private key further same key used to identify the user 

exports.signup = (req, res) => {

    User.findOne({ email: req.body.email })
        .exec((err, user) => {        //callback doesn't work without err as the parameter 
            if (user) return res.status(400).json({
                message: 'User exists'
            })

            const {
                firstName,
                lastName,
                email,
                password,
            } = req.body;

            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                role: "admin",
                userName: Math.random().toString()
            });

            _user.save((error, data) => {
                if (error) {
                    console.log(error);
                    return res.status(400).json({
                        message: "something went wrong"
                    });
                }
                if (data) {
                    return res.status(201).json({
                        message: `admin created sucessfully`
                    })
                };

            });
        });
};

exports.signin = (req, res) => {

    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ message: error });

            if (user) {
                if (user.authenticate(req.body.password) && user.role === "admin") {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.status(200).json({
                        token,
                        user: {
                            _id, firstName, lastName, email, role, fullName
                        }
                    })
                } else {
                    res.status(400).json({ message: 'Invalid Password' })
                }
            }

            else {
                return res.status(400).json({ message: "something went wrong" })
            }
        });

};