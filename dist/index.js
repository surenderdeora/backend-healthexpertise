/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),
/* 2 */
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),
/* 3 */
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),
/* 4 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const express = __webpack_require__(2);
const authController = __webpack_require__(5);
const router = express.Router();

// Route to register a new user
router.post('/register', authController.register);

// Route to log in
router.post('/login', authController.login);

// router.get('/user', authController.users)
// Other authentication routes...

module.exports = router;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const authDataSchema = __webpack_require__(6);

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


/***/ }),
/* 6 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const mongoose = __webpack_require__(7);

const AuthSchema = new mongoose.Schema({
  phoneNo: Number,
  password: String,
});

const AuthModel = mongoose.model('auth', AuthSchema);
module.exports = AuthModel;


/***/ }),
/* 7 */
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const mongoose = __webpack_require__(7)

const DB = "mongodb+srv://mlm22:mlmpassword22@cluster0.9xk2w8h.mongodb.net/mlm_app?retryWrites=true&w=majority"

exports.connectdatabase = () => {
    mongoose.connect(DB)
        .then(() => { console.log("MongoDb Connected...") })
        .catch((error) => { console.log("Error:", error) })
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
(__webpack_require__(1).config)(); // Load environment variables from .env file
const express = __webpack_require__(2);
const app = express();
const cors = __webpack_require__(3)
const port = process.env.PORT || 8888; // Use 8888 as default port if PORT is not defined in environment

// require route
const authRoutes = __webpack_require__(4);

// connect database
(__webpack_require__(8).connectdatabase)();

console.log(port);

// config express body parser
app.use(express.json());
app.use(cors());    

app.get('/', (req, res) => {
    res.send(`${process.env.NODE_ENV} server is running`);
});

// Use authentication routes
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(` Server is running at http://localhost:${port}`);
});

})();

/******/ })()
;