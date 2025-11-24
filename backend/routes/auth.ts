import { Router } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', async (req: any, res: any) => {
  const emailExist = await User.findOne({ username: req.body.username });
  if (emailExist) return res.status(400).send('Username already exists');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = User.from({
    username: req.body.username,
    password: hashedPassword,
  });

  try {
    const saved = await user.save();
    res.send({ user: saved._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

/* auth routes */
router.post('/login', async (req: any, res: any) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send('User not found');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header('Authorization', token).json({ token });
});

export default router;
