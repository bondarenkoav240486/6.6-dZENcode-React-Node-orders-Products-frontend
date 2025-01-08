import { NextApiRequest, NextApiResponse } from 'next';
import { generateToken } from '../../../utils/jwt';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Перевірка користувача (це лише приклад, використовуйте свою логіку)
    if (username === 'admin' && password === 'password') {
      const token = generateToken({ username });
      return res.status(200).json({ token });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}