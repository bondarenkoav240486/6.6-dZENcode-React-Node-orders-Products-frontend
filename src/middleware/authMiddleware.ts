import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { verifyToken } from '../utils/jwt';

export const authMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.user = decoded;
    return handler(req, res);
  };
};