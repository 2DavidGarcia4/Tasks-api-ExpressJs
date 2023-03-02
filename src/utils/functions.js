const bcrypt = require("bcrypt");

/**
 * 
 * @param {string} plainPassword 
 * @returns
 */
const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, 10);
};

/**
 * 
 * @param {string} plainPassword 
 * @param {string} hashPass 
 * @returns 
 */
const comparePassword = (plainPassword, hashPass) => {
  return bcrypt.compareSync(plainPassword, hashPass);
};

const uuid = () => {
  let arr = []
  arr[8] = '-', arr[13] = '-', arr[18] = '-', arr[23] = '-'
  
  for(let i=0; i<36; i++){
    let el = arr[i], random = (Math.floor(Math.random()*16)+1)
    if(!el) arr[i] = random.toString(17)
  }

  return arr.join('')
}

/**
 * 
 * @param {import("express").Response} res 
 * @param {any} message 
 * @param {number} status 
 * @param {{}} fields 
 */
const setErrorResposne = (res, message, status=400, fields=undefined) => {
  if(fields){
    res.status(status).json({
      status,
      message: message,
      fields
    })

  }else{
    res.status(status).json({
      status,
      message: message,
    })
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  uuid,
  setErrorResposne
}