import { verify } from 'jsonwebtoken';
import config from 'config';

export default async (req, res, next) => {
  const token = await req.header('x-auth-token');

  // CHECK FOR TOKEN
  if (!token) return res.status(401).send('No token, access denied!');

  try {
    // VERIFY TOKEN
    const decoded = await verify(token, config.get('JWT_KEY'));

    // CHECK TOKEN IS VERIFIED OR NOT
    if (!decoded) return res.status(401).send('Token is not valid!');

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Invalid signature!');
  }
};
