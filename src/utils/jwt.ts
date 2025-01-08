import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Використовуйте секретний ключ з конфігурації

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, secretKey);
    if (typeof decoded === 'object') {
      return decoded as JwtPayload;
    }
    return null;
  } catch (error) {
    return null;
  }
};