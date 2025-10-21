import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import * as authConfig from '../../config/auth.cjs';
const authConfig = authConfigCjs.default || authConfigCjs;

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token does not exist.' });
  }

  const [, token] = authHeader.split(' ');

  try {

    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();

  } catch (err) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};