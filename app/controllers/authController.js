const authDataSchema = require('../model/AuthSchema');

exports.register = async (req, res) => {
    const { phoneNo, password } = req.body;
    console.log("req.body:", req.body)

    const newUser = new authDataSchema({
        phoneNo,
        password,
    });

    console.log("newUser :", newUser)
    try {
        console.log("1")
        const savedUser = await newUser.save();
        console.log("savedUser:", savedUser)
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
        console.log("error", error)
    }
};

exports.login = async (req, res) => {
    try {
        const { phoneNo, password } = req.body;
        // console.log("req.body:", req.body);

        // console.log("phoneNo:", phoneNo);
        // console.log("password:", password);

        const user = await authDataSchema.findOne({ password });
        // console.log("user:::;", user)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let redirectUrl = '/login'; // Default redirect URL
        if (password === user.password) {
            redirectUrl = '/user-profile';
            res.json({ message: 'Logged in successfully', redirectUrl, user }); // Second response
        } else {
            // Password is incorrect.
            res.status(401).json({ message: 'Invalid credentials' }); // Third response
        }

    } catch (error) {
        console.error("Error:", error);
        let errorMsg = ""
        if (error.response && error.response.status === 404) {
            errorMsg = "User not found"
            return res.status(404).json({ message: 'User not found', errorMsg });
        } else if (error.response && error.response.status === 401) {
            errorMsg = "Invalid credentials"
            return res.status(401).json({ message: 'Invalid credentials', errorMsg });
        } else if (error.code === 'ENOTFOUND') {
            errorMsg = "Network error: Server not found"
            return res.status(500).json({ message: 'Network error: Server not found', errorMsg });
        } else if (error.code === 'ECONNABORTED') {
            errorMsg = "Network error: Request timeout"
            return res.status(500).json({ message: 'Network error: Request timeout', errorMsg });
        } else {
            errorMsg = "An error occurred"
            return res.status(500).json({ message: 'An error occurred', errorMsg });
        }
    }
};


// router.get('/users', async (req, res) => {
// exports.users = async (req, res) => {
//     try {
//         const users = await authDataSchema.find(); // Assuming you want to retrieve all users
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: 'An error occurred' });
//         console.error("Error:", error);
//     }
// };
