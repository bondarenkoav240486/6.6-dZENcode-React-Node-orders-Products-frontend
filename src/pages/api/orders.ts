import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '../../middleware/authMiddleware';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // Ваш код для обробки запитів до замовлень
  res.status(200).json({ message: 'This is a protected route' });
};

export default authMiddleware(handler);