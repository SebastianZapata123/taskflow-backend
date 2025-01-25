//JWT
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

module.exports = { JWT_EXPIRES, JWT_SECRET };
