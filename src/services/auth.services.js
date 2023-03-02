const jwt = require("jsonwebtoken");
const { config: { jwtSecret } } = require("../config");
const { loginUser } = require("../controllers/auth.controllers");
const { setErrorResposne } = require('../utils/functions')

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    if (email && password) {
      const response = await loginUser(email, password)
        
      if (response) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + (7*24*60*60),
            id: response.id,
            email: response.email,
          },
          jwtSecret
        );
        res.status(200).json({
          message: "Correct credentials",
          token,
        });
      } else {
        setErrorResposne(res, 'Invalid credentials', 401)
      }
        
        
    } else {
      setErrorResposne(res, 'Missing data')
    }
    
  } catch (error) {
    setErrorResposne(res, error.message)
  }
};

module.exports = {
  login
}