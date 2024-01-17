import Jwt from 'jsonwebtoken';

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (payload) => Jwt.sign(payload, NODE_ENV ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
export default auth;
