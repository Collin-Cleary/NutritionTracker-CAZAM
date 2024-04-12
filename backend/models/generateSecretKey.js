const crypto = require('crypto');

// Function to generate a random string of specified length
function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') 
    .slice(0, length); 
}

// Generate a random secret key of length 32 
const secretKey = generateRandomString(32);

console.log('Generated Secret Key:', secretKey);
